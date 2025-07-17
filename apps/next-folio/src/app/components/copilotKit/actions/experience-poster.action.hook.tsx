'use client';
import { useCopilotAction, useCopilotAdditionalInstructions } from "@copilotkit/react-core";
import { allData } from '@/data';
import { ExperiencePoster } from '../../copilotKit/components/ExperiencePoster';
import { StaticImageData } from 'next/image';
import { TimelineItem } from '@/data/data-experience';

const sig = `[ useExperiencePosterAction ] ::: `;

// Map of common aliases to actual company names
const COMPANY_ALIASES: Record<string, string> = {
  'ms': 'Microsoft',
  'msft': 'Microsoft',
  'bc': 'Microsoft Business Central',
  'amzn': 'Amazon',
  'aws': 'Amazon Web Services',
  'foodready': 'FoodReady.ai',
  'fr': 'FoodReady.ai',
  'sp': 'SUCCESS Partners',
  'success': 'SUCCESS Partners',
} as const;

// Helper function to get all available experiences
const getAllExperiences = (): TimelineItem[] => {
  return allData.experience || [];
};

// Helper function to get a featured experience
const getFeaturedExperience = () => {
  const experiences = getAllExperiences();
  // Prioritize experiences with logos, projects, and longer descriptions
  return experiences
    .sort((a, b) => {
      if (!a || !b) return 0;
      const scoreA = (a.logo ? 2 : 0) + ((a.projects?.length || 0) > 2 ? 2 : 0) + (a.description?.length > 100 ? 1 : 0);
      const scoreB = (b.logo ? 2 : 0) + ((b.projects?.length || 0) > 2 ? 2 : 0) + (b.description?.length > 100 ? 1 : 0);
      return scoreB - scoreA;
    })[0] || null;
};

/**
 * Custom hook that provides a CopilotKit action to display experience details in a poster format
 * 
 * Features:
 * - Displays company name and role
 * - Shows duration and location
 * - Lists key projects with click-to-inquire functionality
 * - Includes company logo if available
 * - Supports both expanded and collapsed views
 * 
 * @param defaultDetailsMode - Whether to show expanded view by default
 * @returns The registered CopilotKit action
 */
export const useExperiencePosterAction = (defaultDetailsMode = false) => {
  // Instructions for when to showcase experience
  useCopilotAdditionalInstructions({
    instructions: `
      🎯 EXPERIENCE POSTER ACTION - SINGLE EXPERIENCE CONTEXT:
      
      Use the 'showExperiencePoster' action when the user asks about specific work experience or company. This includes:
      
      SINGLE EXPERIENCE CONTEXT TRIGGERS:
      - "tell me about your Microsoft experience"
      - "what did you do at Amazon?"
      - "what was your role at [company]?"
      - "describe your work at [company]"
      - "what projects did you work on at [company]?"
      - "show me your experience at [company]"
      - "what was it like working at [company]?"
      
      PARAMETERS:
      - companyName: string - The name of the company to display experience for
      - detailsMode: boolean - Whether to show expanded details view
      
      🚨 CRITICAL: When using the 'showExperiencePoster' action, DO NOT generate any additional text response. The action renders a complete UI component that answers the user's question.
      
      OMAR'S EXPERIENCE (use these exact names):
      FoodReady.ai, Microsoft, Amazon, Fornida, Monday.com, Freelance, SUCCESS Partners
      
      EXAMPLES:
      ✅ "tell me about Microsoft" → showExperiencePoster("Microsoft")
      ✅ "what did you do at Amazon?" → showExperiencePoster("Amazon")
      ✅ "describe your work at Monday.com" → showExperiencePoster("Monday.com")
      ✅ "show me your experience at FoodReady" → showExperiencePoster("FoodReady")
      ✅ "what was your position at SUCCESS Partners?" → showExperiencePoster("SUCCESS Partners")
      ❌ "what did you do at Google" → (company not found, will show error)
    `,
  }, []);

  // Helper function to resolve company name including aliases
  const resolveCompanyName = (input?: string): { name: string; logo?: StaticImageData } | null => {
    // If no input is provided, get a featured experience
    if (!input) {
      const featured = getFeaturedExperience();
      if (featured && featured.company) {
        console.log(sig, `📊 Selected featured experience: "${featured.company}"`);
        return { name: featured.company, logo: featured.logo };
      }
      return null;
    }

    // Check direct aliases first
    const normalized = input.toLowerCase().trim();
    if (COMPANY_ALIASES[normalized]) {
      const name = COMPANY_ALIASES[normalized];
      const experience = getAllExperiences().find(e => e && e.company === name);
      return experience ? { name, logo: experience.logo } : { name };
    }

    // Helper for normalization
    const normalizeText = (text: string): string => 
      text.toLowerCase().replace(/[^a-z0-9]/g, '').trim();

    const normalizedInput = normalizeText(input);
    
    // Find in experiences
    const experience = getAllExperiences()
      .find(e => {
        if (!e || !e.company) return false;
        
        // Check various matching criteria
        const checks = [
          normalizeText(e.company) === normalizedInput,
          e.company.toLowerCase().includes(normalized),
          e.description?.toLowerCase().includes(normalized)
        ];
        
        return checks.some(Boolean);
      });

    return experience ? { name: experience.company, logo: experience.logo } : null;
  };

  const action = useCopilotAction({
    name: 'showExperiencePoster',
    description: 'Shows a detailed poster view of experience at a specific company. You can reference companies by their name or common aliases. If no company is specified, a featured experience will be shown.',
    parameters: [
      {
        name: 'companyName',
        type: 'string',
        description: 'The name or reference to the company. Can be the company name or common aliases. If not provided, a featured experience will be shown.',
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
    handler: async ({ companyName, detailsMode = defaultDetailsMode }) => {
      const resolved = resolveCompanyName(companyName);
      if (!resolved) {
        console.error(sig, companyName ? `Company "${companyName}" not found in experience data.` : 'No experiences available.');
      } else if (resolved.name !== companyName) {
        console.log(sig, companyName ? `📊 Resolved "${companyName}" to "${resolved.name}"` : `📊 Selected experience: "${resolved.name}"`);
      }

      return undefined;
    },
    render: ({ args }) => {
      const resolved = resolveCompanyName(args.companyName as string | undefined);
      if (!resolved) {
        return (
          <div className="p-4 bg-red/10 border border-red/30 rounded-xl max-w-lg mx-auto">
            <p className="text-red text-sm">
              {args.companyName ? 
                `Company "${args.companyName}" not found in experience data.` : 
                'No experiences available to display.'}
            </p>
          </div>
        );
      }

      return (
        <ExperiencePoster 
          companyName={resolved.name}
          companyLogo={resolved.logo}
          defaultDetailsMode={args.detailsMode ?? defaultDetailsMode}
        />
      );
    },
  });

  return action;
}; 