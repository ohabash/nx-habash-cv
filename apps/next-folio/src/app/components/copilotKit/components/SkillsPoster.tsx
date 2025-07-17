'use client';
import React, { useState } from 'react';
import { allData } from '@/data';
import { MdOpenInNew, MdTimer, MdExpandMore } from 'react-icons/md';
import { Skill } from '@/data/data-skills';
import { SkillHeader } from './SkillHeader';
import { PosterLayout } from './shared/PosterLayout';

const sig = `[ SkillsPoster ] ::: `;

interface SkillsPosterProps {
  skillName: string;
  defaultDetailsMode?: boolean;
}

export const SkillsPoster: React.FC<SkillsPosterProps> = ({ 
  skillName, 
  defaultDetailsMode = true 
}) => {
  const [detailsMode, setDetailsMode] = useState(defaultDetailsMode);

  // Find the specific skill
  const skill = allData.skills.find(s => 
    s.name.toLowerCase() === skillName.toLowerCase()
  ) as Skill;

  if (!skill) {
    return (
      <div className="p-4 bg-red/10 border border-red/30 rounded-xl max-w-lg mx-auto">
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

  const mainContent = detailsMode ? (
    <>
      {/* Show Less Link */}
      <div className="relative z-10 flex justify-end">
        <button
          onClick={handleShowLess}
          className="text-white/60 hover:text-white/80 text-xs font-medium transition-colors duration-200 underline underline-offset-2 hover:underline-offset-4"
        >
          show less
        </button>
      </div>

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
  );

  const footerContent = detailsMode ? (
    <div className="text-center">
      <p className="text-white/40 text-xs">
        Part of Omar's {allData.skills.length} technical skills
      </p>
    </div>
  ) : null;

  return (
    <PosterLayout
      title={skill.name}
      isPinned={skill.pinned}
      detailsMode={detailsMode}
      headerContent={<SkillHeader skill={skill} />}
      mainContent={mainContent}
      footerContent={footerContent}
      poster={skill.poster}
      link={skill.url}
      linkType="skill"
      colorScheme={getSkillClasses()}
    />
  );
}; 