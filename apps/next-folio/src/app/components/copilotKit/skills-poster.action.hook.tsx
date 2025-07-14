'use client';
import { useCopilotAction, useCopilotAdditionalInstructions, useCopilotChat } from "@copilotkit/react-core";
import { useChatContext } from "@copilotkit/react-ui";
import { Role, TextMessage } from "@copilotkit/runtime-client-gql";
import { allData } from '@/data';
import { MdOpenInNew, MdStars, MdCode, MdTimer, MdExpandMore } from 'react-icons/md';
import { Skill } from '@/data/data-skills';
import React, { useState, useEffect } from 'react';

const sig = `[ useSkillsPosterAction ] ::: `;

// Header Section Component
const SkillHeader = ({ skill }: { skill: Skill }) => {
  return (
    <div className="relative z-10 flex items-start gap-4">
      {/* Skill Icon */}
      <div className="flex-shrink-0 w-16 h-16 bg-blue/20 rounded-xl flex items-center justify-center border border-blue/30">
        {skill.icon ? (
          <img 
            src={skill.icon} 
            alt={`${skill.name} icon`}
            className={`${skill.iconClass || 'w-10 h-10'} object-contain`}
          />
        ) : (
          <MdCode className="text-blue text-2xl" />
        )}
      </div>

      {/* Title and Badge */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2_">
          <h3 className="text-white font-bold text-xl truncate">{skill.name}</h3>
          {/* Featured badge is shown in pinned header for featured skills */}
        </div>
        <p className="text-white/60 text-sm font-medium">
          {skill.pinned ? "Featured Technical Skill" : "Technical Skill"}
        </p>
      </div>
    </div>
  );
};

// Skill Preview Component for Multiple Skills Context
const SkillPreview = ({ skill }: { skill: Skill }) => {
  const handleClick = () => {
    // Create a custom event to communicate with parent
    const event = new CustomEvent('skillPreviewClick', { 
      detail: { skillName: skill.name },
      bubbles: true 
    });
    document.dispatchEvent(event);
  };

  return (
    <div 
      className="flex items-center gap-3 p-4 bg-darker/80 backdrop-blur-md border border-subtle rounded-lg hover:border-blue/40 transition-all duration-200 cursor-pointer group"
      onClick={handleClick}
    >
      {/* Skill Icon */}
      <div className="flex-shrink-0 w-12 h-12 bg-blue/20 rounded-lg flex items-center justify-center border border-blue/30 group-hover:bg-blue/30 transition-colors duration-200">
        {skill.icon ? (
          <img 
            src={skill.icon} 
            alt={`${skill.name} icon`}
            className={`${skill.iconClass || 'w-8 h-8'} object-contain`}
          />
        ) : (
          <MdCode className="text-blue text-lg" />
        )}
      </div>

      {/* Skill Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-white font-semibold text-sm truncate group-hover:text-blue transition-colors duration-200">{skill.name}</h4>
          {/* {skill.pinned && (
            <div className="flex items-center gap-1 px-2 py-0.5 bg-yellow/20 border border-yellow/30 rounded-full">
              <MdStars className="text-yellow text-xs" />
              <span className="text-yellow text-xs font-medium">Featured</span>
            </div>
          )} */}
        </div>
        <p className="text-white/60 text-xs line-clamp-2 leading-5 group-hover:text-white/80 transition-colors duration-200">{skill.desc}</p>
      </div>

      {/* Click indicator */}
      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <MdExpandMore className="text-blue text-lg rotate-[-90deg]" />
      </div>
    </div>
  );
};

// Main Skill Showcase Component that can use React hooks
const SkillShowcaseComponent = ({ skillName, isMultipleContext, defaultDetailsMode }: { 
  skillName: string; 
  isMultipleContext: boolean; 
  defaultDetailsMode: boolean; 
}) => {
  const [detailsMode, setDetailsMode] = useState(defaultDetailsMode);
  const chatContext = useChatContext();
  const { appendMessage } = useCopilotChat();

  // Listen for skill preview clicks to send automatic messages
  useEffect(() => {
    const handleSkillPreviewClick = (event: CustomEvent) => {
      const { skillName: clickedSkillName } = event.detail;
      console.log(sig, `🖱️ Skill preview clicked: ${clickedSkillName}`);
      
      // Send message programmatically using CopilotKit chat context
      const messageToSend = `Tell me more about ${clickedSkillName}`;
      
              try {
          
          console.log(sig, `✅ Sending message via useCopilotChat: "${messageToSend}"`);
          appendMessage(
            new TextMessage({
              content: messageToSend,
              role: Role.User,
            })
          );
        } catch (error) {
          console.error(sig, `Error sending message:`, error);
        }
    };

    document.addEventListener('skillPreviewClick', handleSkillPreviewClick as EventListener);
    
    return () => {
      document.removeEventListener('skillPreviewClick', handleSkillPreviewClick as EventListener);
    };
  }, [chatContext]);

  // Handle multiple skills context
  if (isMultipleContext) {
    const pinnedSkills = allData.skills.filter(s => s.pinned).slice(0, 6);
    const displaySkills = pinnedSkills.length > 0 ? pinnedSkills : allData.skills.slice(0, 3);
    
    return (
      <div className="flex flex-col gap-3 max-w-lg mx-auto">
        <div className="text-center mb-2 mt-6">
          <h3 className="text-white font-bold text-lg">Omar's Technical Skills</h3>
          <p className="text-white/60 text-sm">Featured technologies and expertise</p>
        </div>
        {displaySkills.map((skill, index) => (
          <SkillPreview key={skill.name} skill={skill} />
        ))}
        <div className="text-center mt-2">
          <p className="text-white/40 text-xs">
            Showing {displaySkills.length} of {allData.skills.length} total skills
          </p>
        </div>
      </div>
    );
  }

  // Single skill context - find the specific skill
  const skill = allData.skills.find(s => 
    s.name.toLowerCase() === skillName.toLowerCase()
  ) as Skill;

  if (!skill) {
    return (
      <div className="p-4 bg-red/10 border border-red/30 rounded-xl">
        <p className="text-red text-sm">Skill "{skillName}" not found in portfolio data.</p>
      </div>
    );
  }

  const handleViewDocs = () => {
    console.log(sig, `📚 Opening documentation for ${skill.name}: ${skill.url}`);
    window.open(skill.url, '_blank', 'noopener,noreferrer');
  };

  const handleReadMore = () => {
    setDetailsMode(true);
  };

  const handleShowLess = () => {
    setDetailsMode(false);
  };

  // Dynamic background colors based on skill characteristics
  const getSkillClasses = () => {
    if (skill.pinned) {
      return {
        gradient: 'bg-gradient-to-br from-yellow/15 via-darkBlue/10 to-transparent',
        primaryOrb: 'bg-yellow/5',
        secondaryOrb: 'bg-blue/5'
      };
    }
    if (skill.name.toLowerCase().includes('react') || skill.name.toLowerCase().includes('next')) {
      return {
        gradient: 'bg-gradient-to-br from-blue/15 via-darkBlue/10 to-transparent',
        primaryOrb: 'bg-blue/5',
        secondaryOrb: 'bg-green/5'
      };
    }
    if (skill.name.toLowerCase().includes('node') || skill.name.toLowerCase().includes('javascript')) {
      return {
        gradient: 'bg-gradient-to-br from-green/15 via-darkBlue/10 to-transparent',
        primaryOrb: 'bg-green/5',
        secondaryOrb: 'bg-blue/5'
      };
    }
    return {
      gradient: 'bg-gradient-to-br from-blue/15 via-darkBlue/10 to-transparent',
      primaryOrb: 'bg-blue/5',
      secondaryOrb: 'bg-yellow/5'
    };
  };

  const bgClasses = getSkillClasses();

  return (
    <div className="flex flex-col gap-4 p-6 bg-darker backdrop-blur-md border-[2px] border-darkBlue/30 rounded-xl relative overflow-hidden max-w-lg mx-auto">
      {/* Dynamic gradient background based on skill */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 ${bgClasses.gradient}`} />
        <div
          className={`absolute top-0 right-0 w-32 h-32 ${bgClasses.primaryOrb} rounded-full blur-xl transform translate-x-16 -translate-y-16`}
        />
        <div
          className={`absolute bottom-0 left-0 w-24 h-24 ${bgClasses.secondaryOrb} rounded-full blur-lg transform -translate-x-12 translate-y-12`}
        />
      </div>

      {/* Pinned Header with Poster (only for featured skills and in details mode) */}
      {skill.pinned && detailsMode && (
        <div className="relative z-10 -mx-6 -mt-6 mb-2 h-64 overflow-hidden rounded-t-xl bg-gradient-to-r from-yellow/10 via-darkBlue/5 to-yellow/10">
          {skill.poster && (
            <>
              <img
                src={skill.poster}
                alt={`${skill.name} poster`}
                className="w-full h-full object-cover opacity-100"
                onError={(e) => {
                  // Hide just the image on error, keep the header
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-darker/60 via-darker/0 to-darker/60" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-darker" />
            </>
          )}
          {/* Featured badge overlay - always shown for pinned skills */}
          <div className="absolute top-3 right-3 flex items-center gap-1 font-mono font-black uppercase text-xs">
            <MdStars className="text-accent2 text-sm" />
            <span className="text-accent2 text-sm font-bold">Featured</span>
          </div>
          <div className="absolute bottom-3 left-0 w-full h-full flex items-end mb-3 ml-3 justify-start">
              <SkillHeader skill={skill} />
          </div>
        </div>
      )}

      {/* Header Section */}
      {(!skill.pinned || !detailsMode) && <SkillHeader skill={skill} />}

      {/* Show Less Link (only in expanded mode) */}
      {detailsMode && (
        <div className="relative z-10 flex justify-end">
          <button
            onClick={handleShowLess}
            className="text-white/60 hover:text-white/80 text-xs font-medium transition-colors duration-200 underline underline-offset-2 hover:underline-offset-4"
          >
            show less
          </button>
        </div>
      )}

      {/* Conditionally render details based on detailsMode */}
      {detailsMode ? (
        <>
          {/* Description Sections */}
          <div className="relative z-10 space-y-4">
            {/* Primary Description */}
            <div className="bg-dark/50 border border-subtle/30 rounded-lg p-4">
              <h4 className="text-white/90 font-medium text-sm mb-2 flex items-center gap-2">
                <MdTimer className="text-blue text-sm" />
                Overview & Experience
              </h4>
              <p className="text-white/80 text-sm leading-relaxed">
                {skill.desc}
              </p>
            </div>

            {/* Detailed Experience */}
            {skill.desc2 && skill.desc2 !== 'defaultCopy' && (
              <div className="bg-blue/10 border border-blue/20 rounded-lg p-4">
                <h4 className="text-blue/90 font-medium text-sm mb-2">
                  Personal Experience
                </h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  {skill.desc2}
                </p>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="relative z-10">
            <button
              onClick={handleViewDocs}
              className="w-full bg-blue hover:bg-blue/90 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              <MdOpenInNew className="text-lg group-hover:scale-110 transition-transform duration-200" />
              View Documentation
            </button>
          </div>

          {/* Footer */}
          <div className="relative z-10 text-center">
            <p className="text-white/40 text-xs">
              Part of Omar's {allData.skills.length} technical skills
            </p>
          </div>
        </>
      ) : (
        <>
          {/* Read More Button (collapsed mode) */}
          <div className="relative z-10">
            <button
              onClick={handleReadMore}
              className="w-full bg-blue/20 hover:bg-blue/30 border border-blue/30 hover:border-blue/40 text-blue font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              <MdExpandMore className="text-lg group-hover:scale-110 transition-transform duration-200" />
              Read More
            </button>
          </div>
        </>
      )}

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue/5 via-transparent to-darkBlue/10 pointer-events-none rounded-xl" />

      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue/20 via-transparent to-blue/20 rounded-xl blur opacity-30 pointer-events-none" />
    </div>
  );
};

interface UseSkillsPosterActionProps {
  detailsMode: boolean;
}

export const useSkillsPosterAction = ({ detailsMode: defaultDetailsMode }: UseSkillsPosterActionProps) => {

  // Instructions for when to showcase skills
  useCopilotAdditionalInstructions({
    instructions: `
      🎯 PRIORITY SKILL DETECTION & CONTEXT RULES - EXECUTE FIRST:
      
      ALWAYS CHECK SKILLS FIRST: Before using any other action (especially 'dataNotFound' or 'referencePortfolioData'), ALWAYS check if the user is asking about technical skills, expertise, competencies, or portfolio highlights that exist in Omar's skills data. ANY mention of "skills", "technologies", "expertise", "portfolio", "top", "featured", "highlighted", or specific technology names should trigger skill showcase.
      
      🚨 CRITICAL: When using the 'showcaseSkill' action, DO NOT generate any additional text response. The action renders a complete UI component that answers the user's question. Simply execute the action and let the rendered component be the full response.
      
      🔍 AUTOMATIC CONTEXT DETECTION - CRITICAL:
      Analyze the user's question to determine if they're asking about:
      
      SINGLE SKILL CONTEXT (detailsMode: true - EXPANDED VIEW):
      - "tell me about React" 
      - "do you know Angular?"
      - "have you used Tailwind?"
      - "what's your MongoDB experience?"
      - "how experienced are you with TypeScript?"
      - "show me your JavaScript skills"
      → Use showcaseSkill with specific skill name, renders EXPANDED with full details
      
      MULTIPLE SKILLS CONTEXT (detailsMode: false - COLLAPSED OVERVIEW):
      - "what technologies do you know?"
      - "list your programming skills"
      - "show me your frontend technologies"
      - "what frameworks have you used?"
      - "tell me about your tech stack"
      - "what are your top skills?"
      - "show me your featured skills"
      - "what skills are highlighted in your portfolio?"
      - "what are your main technical skills?"
      - "what are your core competencies?"
      - "questions about my skills"
      - "portfolio skills"
      - "my technical expertise"
      - "your skill set"
      - "featured technologies"
      → Use showcaseSkill with "multiple" to show overview of relevant skills
      
      OMAR'S AVAILABLE SKILLS (check against these EXACT names):
      OpenAI, JavaScript, Angular, React, Tailwind, TypeScript, NodeJS, Stripe API, MongoDB, NextJs, Amazon Selling Partner API, Microsoft Business Central, Shopify, BigCommerce, Python, Firebase, NX Monorepos, Azure, Monday.com App Development, CopilotKit, AG Grid, Claude Code, JIRA, BetterAuth, Cursor IDE
      
      🔍 SKILL QUESTION PATTERNS TO DETECT:
      - "do you know [technology]?" 
      - "have you used [technology]?"
      - "experience with [technology]"
      - "familiar with [technology]"
      - "tell me about [technology]"
      - "what's your [technology] experience?"
      - "how long have you used [technology]?"
      - "top skills"
      - "featured skills"
      - "highlighted skills"
      - "main skills"
      - "core skills"
      - "portfolio skills"
      - "technical skills"
      - "skill set"
      - "expertise"
      - "competencies"
      - "questions about [skills/technologies]"
      - "ask about [skills/technologies]"
      
      🚨 CRITICAL WORKFLOW:
      1. ANALYZE user intent: Single specific skill vs multiple skills overview
      2. CHECK if mentioned technology is in Omar's skills list above
      3. IF SINGLE SKILL: Use 'showcaseSkill' with exact skill name
      4. IF MULTIPLE SKILLS: Use 'showcaseSkill' with "multiple" or relevant category
      5. IF NO SKILLS FOUND: Use 'dataNotFound' action
      
      EXAMPLES:
      ✅ "have you used Tailwind" → showcaseSkill("Tailwind") - EXPANDED view
      ✅ "tell me about React" → showcaseSkill("React") - EXPANDED view
      ✅ "what frontend technologies do you know?" → showcaseSkill("frontend") - COLLAPSED overview
      ✅ "list your skills" → showcaseSkill("multiple") - COLLAPSED overview
      ✅ "what are your top skills?" → showcaseSkill("multiple") - COLLAPSED overview
      ✅ "questions about my skills" → showcaseSkill("multiple") - COLLAPSED overview
      ✅ "what skills are highlighted in your portfolio?" → showcaseSkill("multiple") - COLLAPSED overview
      ✅ "show me your featured technical skills" → showcaseSkill("multiple") - COLLAPSED overview
      ❌ "do you know COBOL" → dataNotFound (not in skills list)
      
      CONTEXT-AWARE RENDERING: The component automatically sets detailsMode based on whether it's showing single skill (expanded) or multiple skills (collapsed overview).
    `,
  }, []);

  useCopilotAction({
    name: 'showcaseSkill',
    description: 'PRIORITY ACTION: Context-aware skill showcase for Omar\'s portfolio. Automatically detects if user wants single skill details (expanded view) or multiple skills overview (collapsed view). Use for ANY skill-related questions including: single skill queries like "tell me about React", multiple skill queries like "what technologies do you know", portfolio questions like "what are your top skills", and questions about expertise/competencies. This should be the FIRST action considered for ANY mention of skills, technologies, expertise, portfolio highlights, or specific tech names.',
    parameters: [
      {
        name: 'skillName',
        type: 'string',
        description: 'For single skill: exact skill name (e.g., "React", "JavaScript", "MongoDB"). For multiple skills: use "multiple", "frontend", "backend", "top", "featured", "highlighted", "portfolio", "expertise", "competencies", or relevant category based on user intent.',
        required: true,
      },
    ],
    handler: async ({ skillName }) => {
      console.log(sig, `🎯 Showcasing skill context: ${skillName}`);
      
      // Check if this is a multiple skills request
      const isMultipleSkillsContext = ['multiple', 'frontend', 'backend', 'technologies', 'skills', 'stack', 'all', 'top', 'featured', 'highlighted', 'portfolio', 'expertise', 'competencies', 'main', 'core'].some(keyword => 
        skillName.toLowerCase().includes(keyword)
      );
      
      if (isMultipleSkillsContext) {
        console.log(sig, `📋 Multiple skills context detected: ${skillName}`);
        // Return undefined to prevent additional text response - only render component
        return undefined;
      }
      
      // Single skill context - find the specific skill
      const skill = allData.skills.find(s => 
        s.name.toLowerCase() === skillName.toLowerCase()
      );
      
      if (!skill) {
        console.log(sig, `❌ Skill not found: ${skillName}`);
        return `Skill "${skillName}" not found in portfolio data.`;
      }
      
      console.log(sig, `✅ Found single skill: ${skill.name}`);
      // Return undefined to prevent additional text response - only render component
      // Alternative approaches if undefined doesn't work:
      // return null;
      // return void 0;
      // Don't return anything (implicit undefined)
      return undefined;
    },
    render: ({ args }) => {
      if (!args?.skillName) {
        return (
          <div className="p-4 bg-purple/10 border border-purple/30 rounded-xl">
            <p className="text-purple text-sm">No skill name provided.</p>
          </div>
        );
      }

      const skillName = args.skillName;

      // Check if this is a multiple skills request
      const isMultipleSkillsContext = ['multiple', 'frontend', 'backend', 'technologies', 'skills', 'stack', 'all', 'top', 'featured', 'highlighted', 'portfolio', 'expertise', 'competencies', 'main', 'core'].some(keyword => 
        skillName.toLowerCase().includes(keyword)
      );

      // Automatically set detailsMode based on context (CopilotKit best practice)
      // Single skill = expanded view (true), Multiple skills = collapsed overview (false)
      const contextBasedDetailsMode = !isMultipleSkillsContext;

      // Use the SkillShowcaseComponent with proper React hooks
      return (
        <SkillShowcaseComponent 
          skillName={skillName}
          isMultipleContext={isMultipleSkillsContext}
          defaultDetailsMode={contextBasedDetailsMode}
        />
      );
    },
  });

  return {};
};

