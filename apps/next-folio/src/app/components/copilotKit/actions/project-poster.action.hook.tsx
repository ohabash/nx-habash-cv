'use client';
import { useCallback } from 'react';
import { useCopilotAction } from '@copilotkit/react-core';
import { ProjectPoster } from '../components/ProjectPoster';
import { allData } from '@/data';
import { StaticImageData } from 'next/image';
import { Project } from '@/data/data-experience';

const sig = `[ useProjectPosterAction ] ::: `;

// Map of common aliases to actual project names
const PROJECT_ALIASES: Record<string, string> = {
  'dash': 'Microsoft Business Central ERP Dashboard',
  'dash.fornida': 'Microsoft Business Central ERP Dashboard',
  'fornida dash': 'Microsoft Business Central ERP Dashboard',
  'dash fornida': 'Microsoft Business Central ERP Dashboard',
  'erp dashboard': 'Microsoft Business Central ERP Dashboard',
  'business central': 'Microsoft Business Central ERP Dashboard',
  'scalable backend': 'Scalable Backend Infrastructure',
  'backend infrastructure': 'Scalable Backend Infrastructure',
  'enterprise auth': 'Enterprise Authentication & RBAC',
  'enterprise authentication': 'Enterprise Authentication & RBAC',
  'pulse event': 'Pulse Event Orchestration Platform',
  'pulse platform': 'Pulse Event Orchestration Platform',
  'bigcommerce stores': 'Launched 20 BigCommerce Stores in 6 Months',
  'bigcommerce migration': 'Launched 20 BigCommerce Stores in 6 Months',
  'magento monorepo': 'Magento Monorepo',
  'magento mono': 'Magento Monorepo',
} as const;

interface ProjectWithCompany extends Project {
  company?: string;
  companyLogo?: StaticImageData;
}

// Helper function to get all available projects
const getAllProjects = (): ProjectWithCompany[] => {
  return (allData.projects || []) as ProjectWithCompany[];
};

// Helper function to get a random project
const getRandomProject = () => {
  const projects = getAllProjects();
  const randomIndex = Math.floor(Math.random() * projects.length);
  return projects[randomIndex] || null;
};

// Helper function to get a featured project
const getFeaturedProject = () => {
  const projects = getAllProjects();
  // Prioritize projects with images, links, and longer descriptions
  return projects
    .sort((a, b) => {
      if (!a || !b) return 0;
      const scoreA = ((a.images?.length || 0) > 0 ? 2 : 0) + (a.link ? 2 : 0) + (a.desc?.length > 100 ? 1 : 0) + (a.companyLogo ? 1 : 0);
      const scoreB = ((b.images?.length || 0) > 0 ? 2 : 0) + (b.link ? 2 : 0) + (b.desc?.length > 100 ? 1 : 0) + (b.companyLogo ? 1 : 0);
      return scoreB - scoreA;
    })[0] || null;
};

/**
 * Custom hook that provides a CopilotKit action to display project details in a poster format
 * 
 * Features:
 * - Displays project name and description
 * - Shows key technologies used
 * - Includes project poster image if available
 * - Links to project URL if available
 * - Supports both expanded and collapsed views
 * 
 * @param defaultDetailsMode - Whether to show expanded view by default
 * @returns The registered CopilotKit action
 */
export const useProjectPosterAction = (defaultDetailsMode = false) => {
  // Helper function to resolve project name including aliases
  const resolveProjectName = (input?: string): { name: string; logo?: string | StaticImageData } | null => {
    // If no input is provided, get a featured or random project
    if (!input) {
      const featured = getFeaturedProject();
      if (featured && featured.name) {
        console.log(sig, `📊 Selected featured project: "${featured.name}"`);
        return { name: featured.name, logo: featured.companyLogo };
      }
      const random = getRandomProject();
      if (random && random.name) {
        console.log(sig, `📊 Selected random project: "${random.name}"`);
        return { name: random.name, logo: random.companyLogo };
      }
      return null;
    }

    // Check direct aliases first
    const normalized = input.toLowerCase().trim();
    if (PROJECT_ALIASES[normalized]) {
      const name = PROJECT_ALIASES[normalized];
      const project = getAllProjects().find(p => p && p.name === name);
      return project ? { name, logo: project.companyLogo } : { name };
    }

    // Helper for normalization
    const normalizeText = (text: string): string => 
      text.toLowerCase().replace(/[^a-z0-9]/g, '').trim();

    const normalizedInput = normalizeText(input);
    
    // Find in projects
    const project = getAllProjects()
      .find(p => {
        if (!p || !p.name) return false;
        
        // Check various matching criteria
        const checks = [
          // Exact matches (case-insensitive)
          p.name.toLowerCase() === input.toLowerCase(),
          // Normalized exact matches
          normalizeText(p.name) === normalizedInput,
          // URL matches
          p.link && normalizeText(p.link) === normalizedInput,
          p.link && normalizeText(p.link.split('//')[1]?.split('/')[0] || '') === normalizedInput,
          // Partial matches (only check if no exact match found)
          p.name.toLowerCase().includes(normalized),
          p.desc?.toLowerCase().includes(normalized),
          // Keywords match
          p.keywords?.toLowerCase().includes(normalized),
          // Company match (for projects from specific companies)
          p.company?.toLowerCase() === normalized || p.company?.toLowerCase().includes(normalized)
        ];
        
        return checks.some(Boolean);
      });

    // If no direct match found, try fuzzy matching
    if (!project) {
      const projects = getAllProjects();
      // Find projects with similar names using basic fuzzy matching
      const matches = projects.filter(p => {
        if (!p || !p.name) return false;
        const words = input.toLowerCase().split(/\W+/);
        const projectWords = p.name.toLowerCase().split(/\W+/);
        return words.some(word => 
          word.length > 3 && // Only match significant words
          projectWords.some(pWord => 
            pWord.includes(word) || 
            word.includes(pWord)
          )
        );
      });
      
      if (matches.length > 0) {
        // Sort by relevance (more matching words = higher relevance)
        const bestMatch = matches.sort((a, b) => {
          const aScore = a.name.toLowerCase().split(/\W+/).filter(w => 
            input.toLowerCase().includes(w) || 
            input.toLowerCase().split(/\W+/).some(iw => w.includes(iw))
          ).length;
          const bScore = b.name.toLowerCase().split(/\W+/).filter(w => 
            input.toLowerCase().includes(w) || 
            input.toLowerCase().split(/\W+/).some(iw => w.includes(iw))
          ).length;
          return bScore - aScore;
        })[0];
        
        return bestMatch ? { name: bestMatch.name, logo: bestMatch.companyLogo } : null;
      }
    }

    return project ? { name: project.name, logo: project.companyLogo } : null;
  };

  const action = useCopilotAction({
    name: 'showProjectPoster',
    description: 'Shows a detailed poster view of a specific project. You can reference projects by their name, URL, or common aliases. If no project is specified, a featured project will be shown.',
    parameters: [
      {
        name: 'projectName',
        type: 'string',
        description: 'The name or reference to the project. Can be the project name, URL, or common aliases. If not provided, a featured project will be shown.',
        required: false,
      },
      {
        name: 'detailsMode',
        type: 'boolean',
        description: 'Whether to show the expanded view with full details',
        required: false,
        default: defaultDetailsMode,
      }
    ],
    handler: async ({ projectName, detailsMode = defaultDetailsMode }) => {
      const resolved = resolveProjectName(projectName);
      if (!resolved) {
        console.error(sig, projectName ? `Project "${projectName}" not found in portfolio data.` : 'No projects available.');
      } else if (resolved.name !== projectName) {
        console.log(sig, projectName ? `📊 Resolved "${projectName}" to "${resolved.name}"` : `📊 Selected project: "${resolved.name}"`);
      }

      return undefined;
    },
    render: ({ args }) => {
      const resolved = resolveProjectName(args.projectName as string | undefined);
      if (!resolved) {
        return (
          <div className="p-4 bg-red/10 border border-red/30 rounded-xl max-w-lg mx-auto">
            <p className="text-red text-sm">
              {args.projectName ? 
                `Project "${args.projectName}" not found in portfolio data.` : 
                'No projects available to display.'}
            </p>
          </div>
        );
      }

      return (
        <ProjectPoster 
          projectName={resolved.name}
          companyLogo={resolved.logo}
          defaultDetailsMode={false}
        />
      );
    },
  });

  return action;
}; 