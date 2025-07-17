'use client';
import React, { ReactNode } from 'react';
import { MdStars, MdOpenInNew } from 'react-icons/md';

interface PosterLayoutProps {
  title: string;
  isPinned?: boolean;
  detailsMode?: boolean;
  headerContent: ReactNode;
  mainContent: ReactNode;
  footerContent?: ReactNode;
  poster?: string;
  link?: string;
  linkType?: 'skill' | 'project';
  colorScheme?: {
    gradient: string;
    primaryOrb: string;
    secondaryOrb: string;
  };
}

export const PosterLayout: React.FC<PosterLayoutProps> = ({
  title,
  isPinned = false,
  detailsMode = true,
  headerContent,
  mainContent,
  footerContent,
  poster,
  link,
  linkType = 'project',
  colorScheme = {
    gradient: 'bg-gradient-to-br from-blue/15 via-darkBlue/10 to-transparent',
    primaryOrb: 'bg-blue/5',
    secondaryOrb: 'bg-yellow/5'
  }
}) => {
  // Helper function to check if link is valid
  const isValidLink = (url?: string): boolean => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const getLinkText = () => {
    return linkType === 'skill' ? 'View Documentation' : 'View Project';
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-darker backdrop-blur-md border-[2px] border-darkBlue/30 rounded-xl relative overflow-hidden max-w-lg mx-auto">
      {/* Dynamic gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 ${colorScheme.gradient}`} />
        <div
          className={`absolute top-0 right-0 w-32 h-32 ${colorScheme.primaryOrb} rounded-full blur-xl transform translate-x-16 -translate-y-16`}
        />
        <div
          className={`absolute bottom-0 left-0 w-24 h-24 ${colorScheme.secondaryOrb} rounded-full blur-lg transform -translate-x-12 translate-y-12`}
        />
      </div>

      {/* Pinned Header with Poster */}
      {detailsMode && poster && (
        <div className="relative z-10 -mx-6 -mt-6 mb-2 h-64 overflow-hidden rounded-t-xl bg-gradient-to-r from-yellow/10 via-darkBlue/5 to-yellow/10">
          <img
            src={poster}
            alt={`${title} poster`}
            className="w-full h-full object-cover opacity-100"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-darker/60 via-darker/0 to-darker/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-darker" />

          {/* Featured badge overlay for pinned items */}
          {isPinned && (
            <div className="absolute top-3 right-3 flex items-center gap-1 font-mono font-black uppercase text-xs">
              <MdStars className="text-accent2 text-sm" />
              <span className="text-accent2 text-sm font-bold">Featured</span>
            </div>
          )}

          {/* Link badge if available and valid */}
          {isValidLink(link) && (
            <div className="absolute top-3 left-3 z-10">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 bg-subtle/50 backdrop-blur-sm hover:bg-subtle/80 hover:text-blue hover:text-blue-light px-3 text-white/80 rounded-md text-[0.7rem] py-0 font-medium transition-all duration-200 border border-blue/30"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(link, '_blank', 'noopener,noreferrer');
                }}
              >
                <MdOpenInNew className="text-sm" />
                {getLinkText()}
              </a>
            </div>
          )}

          <div className="absolute bottom-3 left-0 w-full h-full flex items-end mb-3 ml-3 justify-start">
            {headerContent}
          </div>
        </div>
      )}

      {/* Header Section when no poster or in collapsed mode */}
      {(!detailsMode || !poster) && headerContent}

      {/* Main Content */}
      <div className="relative z-10">{mainContent}</div>

      {/* Footer Content */}
      {footerContent && <div className="relative z-10">{footerContent}</div>}

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue/5 via-transparent to-darkBlue/10 pointer-events-none rounded-xl" />

      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue/20 via-transparent to-blue/20 rounded-xl blur opacity-30 pointer-events-none" />
    </div>
  );
}; 