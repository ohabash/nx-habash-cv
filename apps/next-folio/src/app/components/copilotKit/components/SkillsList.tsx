'use client';
import React, { useEffect } from 'react';
import { useCopilotChat } from "@copilotkit/react-core";
import { useChatContext } from "@copilotkit/react-ui";
import { Role, TextMessage } from "@copilotkit/runtime-client-gql";
import { allData } from '@/data';
import { MdCode, MdExpandMore } from 'react-icons/md';
import { Skill } from '@/data/data-skills';

const sig = `[ SkillsList ] ::: `;

// Skill Preview Component for Skills List
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

interface SkillsListProps {
  skillNames?: string[];
}

export const SkillsList: React.FC<SkillsListProps> = ({ skillNames }) => {
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
  }, [appendMessage]);

  // Determine which skills to display
  const getDisplaySkills = (): Skill[] => {
    if (skillNames && skillNames.length > 0) {
      // Filter skills based on provided skill names
      return allData.skills.filter(skill => 
        skillNames.some(name => skill.name.toLowerCase().includes(name.toLowerCase()))
      );
    }
    
    // Default: show pinned skills or first few skills
    const pinnedSkills = allData.skills.filter(s => s.pinned).slice(0, 6);
    return pinnedSkills.length > 0 ? pinnedSkills : allData.skills.slice(0, 6);
  };

  const displaySkills = getDisplaySkills();

  if (displaySkills.length === 0) {
    return (
      <div className="p-4 bg-red/10 border border-red/30 rounded-xl max-w-lg mx-auto">
        <p className="text-red text-sm">No skills found matching the provided criteria.</p>
      </div>
    );
  }

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
}; 