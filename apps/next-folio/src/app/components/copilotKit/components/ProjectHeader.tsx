'use client';
import React from 'react';
import { Project } from './shared/poster.interface';
import { MdCode } from 'react-icons/md';

interface ProjectHeaderProps {
  project: Project;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project }) => {
  return (
    <div className="space-y-2">
      {/* Project Title */}
      <h3 className="text-white font-medium text-lg">
        {project.name}
      </h3>

    </div>
  );
}; 