'use client';
import React, { useState } from 'react';
import { allData } from '@/data';
import { MdExpandMore, MdTimer, MdOpenInNew, MdCode, MdWork } from 'react-icons/md';
import { StaticImageData } from 'next/image';
import Image from 'next/image';
import { useCopilotChat } from "@copilotkit/react-core";
import { TextMessage, Role } from "@copilotkit/runtime-client-gql";
import { PosterLayout } from './shared/PosterLayout';
import { TimelineItem } from '@/data/data-experience';

const sig = `[ ExperiencePoster ] ::: `;

interface ExperiencePosterProps {
  companyName: string;
  companyLogo?: string | StaticImageData;
  defaultDetailsMode?: boolean;
}

export const ExperiencePoster: React.FC<ExperiencePosterProps> = ({
  companyName,
  companyLogo,
  defaultDetailsMode = false
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultDetailsMode);
  const { appendMessage } = useCopilotChat();

  // Find the experience data
  const experience = allData.experience.find(exp => exp.company === companyName);

  if (!experience) {
    return (
      <div className="p-4 bg-red/10 border border-red/30 rounded-xl max-w-lg mx-auto">
        <p className="text-red text-sm">Experience not found for company: {companyName}</p>
      </div>
    );
  }

  const handleProjectClick = (projectName: string) => {
    // First show the project poster
    appendMessage(
      new TextMessage({
        content: `showProjectPoster("${projectName}")`,
        role: Role.User,
      })
    );
    
    // Then ask for more details
    setTimeout(() => {
      appendMessage(
        new TextMessage({
          content: `Tell me more about the project "${projectName}"`,
          role: Role.User,
        })
      );
    }, 100);
  };

  // Header content for the poster
  const headerContent = (
    <div className="flex items-center gap-4">
      {/* Company Logo */}
      {companyLogo && (
        <div className="w-12 h-12 relative flex-shrink-0">
          <Image
            src={companyLogo}
            alt={`${companyName} logo`}
            className="object-contain"
            fill
          />
        </div>
      )}
      
      {/* Company and Role Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-bold text-white mb-1">{experience.company}</h3>
        <p className="text-white/60 text-sm">{experience.title}</p>
      </div>
    </div>
  );

  // Main content for the poster
  const mainContent = (
    <>
      {/* Duration and Location */}
      <div className="flex items-center gap-4 mt-4 text-sm text-white/60">
        <div className="flex items-center gap-1">
          <MdTimer className="text-blue" />
          <span>{experience.date}</span>
        </div>
      </div>

      {/* Description */}
      <p className="mt-4 text-white/80 text-sm leading-relaxed">
        {experience.description}
      </p>

      {/* Projects Section */}
      <div className="mt-6">
        <h4 className="text-white font-semibold mb-3">Key Projects</h4>
        <div className="grid gap-2">
          {experience.projects?.map((project, index) => (
            <button
              key={index}
              onClick={() => handleProjectClick(project.name)}
              className="flex items-start gap-3 p-3 bg-darker/50 rounded-lg hover:bg-darker/70 transition-colors text-left group"
            >
              <div className="flex-1 min-w-0">
                <h5 className="text-white font-medium text-sm mb-1 group-hover:text-blue transition-colors">
                  {project.name}
                </h5>
                <p className="text-white/60 text-xs line-clamp-2">
                  {project.desc}
                </p>
              </div>
              <MdOpenInNew className="text-blue/60 group-hover:text-blue transition-colors mt-1" />
            </button>
          ))}
        </div>
      </div>

      {/* Expand/Collapse Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 flex items-center gap-1 text-blue text-sm hover:text-blue-light transition-colors"
      >
        <MdExpandMore
          className={`transform transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
        {isExpanded ? 'Show Less' : 'Show More'}
      </button>
    </>
  );

  return (
    <PosterLayout
      title={experience.company}
      headerContent={headerContent}
      mainContent={mainContent}
      detailsMode={isExpanded}
      colorScheme={{
        gradient: 'bg-gradient-to-br from-purple/20 to-blue/20',
        primaryOrb: 'bg-purple/10',
        secondaryOrb: 'bg-blue/10'
      }}
    />
  );
}; 