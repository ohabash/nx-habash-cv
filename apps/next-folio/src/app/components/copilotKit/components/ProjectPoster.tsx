'use client';
import React, { useState } from 'react';
import { allData } from '@/data';
import { MdExpandMore, MdTimer, MdOpenInNew, MdCode } from 'react-icons/md';
import { ProjectHeader } from './ProjectHeader';
import { PosterLayout } from './shared/PosterLayout';
import { Project } from './shared/poster.interface';
import { Project as ExperienceProject } from '@/data/data-experience';
import { StaticImageData } from 'next/image';
import Image from 'next/image';
import { useCopilotChat } from "@copilotkit/react-core";
import { TextMessage, Role } from "@copilotkit/runtime-client-gql";

const sig = `[ ProjectPoster ] ::: `;

export interface ProjectPosterProps {
  projectName: string;
  companyLogo?: string | StaticImageData;
  defaultDetailsMode?: boolean;
}

export const ProjectPoster: React.FC<ProjectPosterProps> = ({ 
  projectName, 
  companyLogo,
  defaultDetailsMode = true 
}) => {
  const [detailsMode, setDetailsMode] = useState(defaultDetailsMode);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllTechs, setShowAllTechs] = useState(false);
  const { appendMessage } = useCopilotChat();

  if (!projectName) {
    return (
      <div className="p-4 bg-red/10 border border-red/30 rounded-xl max-w-lg mx-auto">
        <p className="text-red text-sm">No project name provided.</p>
      </div>
    );
  }

  // Normalize the project name for comparison
  const normalizeProjectName = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '') // Remove special characters
      .trim();
  };

  const normalizedSearchName = normalizeProjectName(projectName);

  // Find the specific project and map it to our Project interface
  const experienceProject = allData.experience
    .flatMap(exp => exp.projects || [])
    .find(p => {
      if (!p || !p.name) return false;
      
      // Try exact match first
      if (p.name.toLowerCase() === projectName.toLowerCase()) return true;
      
      // Try normalized match
      if (normalizeProjectName(p.name) === normalizedSearchName) return true;
      
      // Try matching by URL
      if (p.link && normalizeProjectName(p.link) === normalizedSearchName) return true;
      
      // Try matching domain name if it's a URL
      if (p.link) {
        const domain = p.link.toLowerCase().replace(/^https?:\/\//, '').split('/')[0];
        if (normalizedSearchName === normalizeProjectName(domain)) return true;
      }
      
      return false;
    });

  if (!experienceProject) {
    return (
      <div className="p-4 bg-red/10 border border-red/30 rounded-xl max-w-lg mx-auto">
        <p className="text-red text-sm">Project "{projectName}" not found in portfolio data.</p>
      </div>
    );
  }

  // Map the experience project data to our Project interface
  const project: Project = {
    name: experienceProject.name,
    description: experienceProject.desc,
    technologies: experienceProject.keywords.split(', '),
    poster: experienceProject.poster,
    // Split the description into bullet points for details
    details: experienceProject.desc.split('. ').filter(Boolean),
    pinned: false, // We can add this to the data later if needed
    url: experienceProject.link // Add the link from experience data
  };

  const handleViewProject = () => {
    if (project.url) {
      console.log(sig, `🌐 Opening project URL: ${project.url}`);
      window.open(project.url, '_blank', 'noopener,noreferrer');
    } else if (project.github) {
      console.log(sig, `💻 Opening GitHub URL: ${project.github}`);
      window.open(project.github, '_blank', 'noopener,noreferrer');
    }
  };

  const handleReadMore = () => {
    setDetailsMode(true);
  };

  const handleShowLess = () => {
    setDetailsMode(false);
  };

  const handleTechClick = (tech: string) => {
    appendMessage(
      new TextMessage({
        content: `Tell me more about ${tech}`,
        role: Role.User,
      })
    );
  };

  // Dynamic background colors based on project characteristics
  const getProjectClasses = () => {
    if (project.pinned) {
      return {
        gradient: 'bg-gradient-to-br from-yellow/15 via-darkBlue/10 to-transparent',
        primaryOrb: 'bg-yellow/5',
        secondaryOrb: 'bg-blue/5'
      };
    }
    // Add more color schemes based on project types if needed
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

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 m-3 my-4">
        {(showAllTechs ? project.technologies : project.technologies.slice(0, 3)).map((tech, index) => (
          <button
            key={index}
            onClick={() => handleTechClick(tech)}
            className="flex items-center gap-1 bg-blue/20 px-2 py-1 rounded-md hover:bg-blue/30 transition-colors"
          >
            <MdCode className="text-blue text-sm" />
            <span className="text-blue text-xs font-medium">{tech}</span>
          </button>
        ))}
        {!showAllTechs && project.technologies.length > 3 && (
          <button 
            onClick={() => setShowAllTechs(true)}
            className="bg-blue/20 px-2 py-1 rounded-md hover:bg-blue/30 transition-colors"
          >
            <span className="text-blue text-xs font-medium">
              +{project.technologies.length - 3} more
            </span>
          </button>
        )}
      </div>

      {/* Description Sections */}
      <div className="relative z-10 space-y-4">
        {/* Project Description */}
        <div className="bg-dark/50 border border-subtle/30 rounded-lg p-4">
          <h4 className="text-white/90 font-medium text-sm mb-2 flex items-center gap-2">
            <MdTimer className="text-blue text-sm" />
            Project Overview
          </h4>
          <p className="text-white/80 text-sm leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Additional Details */}
        {project.details && project.details.length > 0 && (
          <div className="bg-blue/10 border border-blue/20 rounded-lg p-4">
            <h4 className="text-blue/90 font-medium text-sm mb-2">
              Key Features
            </h4>
            <ul className="text-white/80 text-sm leading-relaxed list-disc list-inside space-y-1">
              {project.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
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
        Part of Omar's {allData.experience.flatMap(exp => exp.projects || []).length} featured projects
      </p>
    </div>
  ) : null;

  return (
    <PosterLayout
      title={project.name}
      isPinned={project.pinned}
      detailsMode={detailsMode}
      headerContent={
        <div className="flex items-center gap-4">
          {companyLogo && (
            <div className="flex-shrink-0 w-16 h-16 bg-blue/20 rounded-xl flex items-center justify-center border border-blue/30">
              {typeof companyLogo === 'string' ? (
                <img 
                  src={companyLogo} 
                  alt={`${project.name} company logo`}
                  className="w-10 h-10 object-contain"
                />
              ) : (
                <Image 
                  src={companyLogo}
                  alt={`${project.name} company logo`}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              )}
            </div>
          )}
          <ProjectHeader project={project} />
        </div>
      }
      mainContent={mainContent}
      footerContent={footerContent}
      poster={project.poster}
      link={project.url}
      linkType="project"
      colorScheme={getProjectClasses()}
    />
  );
}; 