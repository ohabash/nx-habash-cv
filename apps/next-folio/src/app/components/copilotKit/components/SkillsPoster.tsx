'use client';
import React, { useState } from 'react';
import { allData } from '@/data';
import { MdOpenInNew, MdStars, MdTimer, MdExpandMore } from 'react-icons/md';
import { Skill } from '@/data/data-skills';
import { SkillHeader } from './SkillHeader';

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