import React from 'react';
import { MdCode } from 'react-icons/md';
import { Skill } from '@/data/data-skills';

interface SkillHeaderProps {
  skill: Skill;
}

export const SkillHeader: React.FC<SkillHeaderProps> = ({ skill }) => {
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