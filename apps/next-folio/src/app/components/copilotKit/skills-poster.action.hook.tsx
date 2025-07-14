'use client';
import { useCopilotAction, useCopilotAdditionalInstructions } from "@copilotkit/react-core";
import { SkillsPoster } from './components/SkillsPoster';

const sig = `[ useSkillsPosterAction ] ::: `;

interface UseSkillsPosterActionProps {
  detailsMode?: boolean;
}

export const useSkillsPosterAction = ({ detailsMode = true }: UseSkillsPosterActionProps = {}) => {
  // Instructions for when to showcase single skill
  useCopilotAdditionalInstructions({
    instructions: `
      🎯 SKILLS POSTER ACTION - SINGLE SKILL CONTEXT:
      
      Use the 'showSkillsPoster' action when the user asks about a specific single skill, technology, or wants detailed information about one particular skill. This includes:
      
      SINGLE SKILL CONTEXT TRIGGERS:
      - "tell me about React"
      - "do you know Angular?"
      - "have you used Tailwind?"
      - "what's your MongoDB experience?"
      - "how experienced are you with TypeScript?"
      - "show me your JavaScript skills"
      - "tell me about your experience with [specific technology]"
      - "how long have you used [technology]?"
      - "what can you do with [technology]?"
      - "describe your [technology] expertise"
      - "show me [technology] details"
      
      PARAMETERS:
      - skillName: string - The exact name of the skill to display detailed information for
      
      🚨 CRITICAL: When using the 'showSkillsPoster' action, DO NOT generate any additional text response. The action renders a complete UI component that answers the user's question.
      
      OMAR'S AVAILABLE SKILLS (use these exact names):
      OpenAI, JavaScript, Angular, React, Tailwind, TypeScript, NodeJS, Stripe API, MongoDB, NextJs, Amazon Selling Partner API, Microsoft Business Central, Shopify, BigCommerce, Python, Firebase, NX Monorepos, Azure, Monday.com App Development, CopilotKit, AG Grid, Claude Code, JIRA, BetterAuth, Cursor IDE
      
      EXAMPLES:
      ✅ "tell me about React" → showSkillsPoster("React")
      ✅ "do you know Angular?" → showSkillsPoster("Angular")
      ✅ "have you used Tailwind?" → showSkillsPoster("Tailwind")
      ✅ "what's your MongoDB experience?" → showSkillsPoster("MongoDB")
      ✅ "how experienced are you with TypeScript?" → showSkillsPoster("TypeScript")
      ✅ "show me your JavaScript skills" → showSkillsPoster("JavaScript")
      ❌ "do you know COBOL" → (skill not found, will show error)
      
      The poster will display:
      - Skill icon and header
      - Featured badge for pinned skills
      - Poster image for featured skills
      - Detailed description and experience
      - Action button to view documentation
      - Collapsible details view
    `,
  }, []);

  useCopilotAction({
    name: 'showSkillsPoster',
    description: 'Display detailed information about a single technical skill with poster, descriptions, and action buttons. Use for questions about specific skills, technologies, or detailed expertise inquiries.',
    parameters: [
      {
        name: 'skillName',
        type: 'string',
        description: 'The exact name of the skill to display detailed information for (e.g., "React", "JavaScript", "MongoDB"). Must match one of Omar\'s available skills.',
        required: true,
      },
    ],
    handler: async ({ skillName }) => {
      console.log(sig, `🎯 Displaying skill poster for: ${skillName}`);
      
      // Return undefined to prevent additional text response - only render component
      return undefined;
    },
    render: ({ args }) => {
      if (!args?.skillName) {
        return (
          <div className="p-4 bg-purple/10 border border-purple/30 rounded-xl max-w-lg mx-auto">
            <p className="text-purple text-sm">No skill name provided.</p>
          </div>
        );
      }

      const skillName = args.skillName;
      
      // Use the SkillsPoster component
      return <SkillsPoster skillName={skillName} defaultDetailsMode={detailsMode} />;
    },
  });

  return {};
};

