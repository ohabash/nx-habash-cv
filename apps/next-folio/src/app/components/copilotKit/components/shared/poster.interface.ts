export interface Project {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
  pinned?: boolean;
  poster?: string;
  details?: string[];
}

export interface PosterColorScheme {
  gradient: string;
  primaryOrb: string;
  secondaryOrb: string;
}

export interface PosterLayoutProps {
  title: string;
  isPinned?: boolean;
  detailsMode?: boolean;
  headerContent: React.ReactNode;
  mainContent: React.ReactNode;
  footerContent?: React.ReactNode;
  poster?: string;
  colorScheme?: PosterColorScheme;
} 