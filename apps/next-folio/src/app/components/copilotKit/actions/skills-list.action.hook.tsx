'use client';
import { useCopilotAction, useCopilotAdditionalInstructions } from "@copilotkit/react-core";
import { SkillsList } from '../components/SkillsList';

const sig = `[ useSkillsListAction ] ::: `;

export const useSkillsListAction = () => {
  // Instructions for when to showcase multiple skills
  useCopilotAdditionalInstructions({
    instructions: `
      🎯 SKILLS LIST ACTION - MULTIPLE SKILLS CONTEXT:
      
      Use the 'showSkillsList' action when the user asks about multiple skills, technologies, or wants an overview of skills. This includes:
      
      MULTIPLE SKILLS CONTEXT TRIGGERS:
      - "what technologies do you know?"
      - "list your programming skills"
      - "show me your frontend technologies"
      - "what frameworks have you used?"
      - "tell me about your tech stack"
      - "what are your top skills?"
      - "show me your featured skills"
      - "what skills are highlighted in your portfolio?"
      - "what are your main technical skills?"
      - "what are your core competencies?"
      - "questions about my skills"
      - "portfolio skills"
      - "my technical expertise"
      - "your skill set"
      - "featured technologies"
      - "backend technologies"
      - "frontend technologies"
      - "programming languages"
      - "frameworks"
      - "libraries"
      
      PARAMETERS:
      - skillNames: string[] - Array of skill names to filter/display. Can be:
        - Specific skill names: ["React", "JavaScript", "MongoDB"]
        - Categories: ["frontend", "backend", "featured", "top"]
        - Empty array [] for default display (featured/pinned skills)
      
      🚨 CRITICAL: When using the 'showSkillsList' action, DO NOT generate any additional text response. The action renders a complete UI component that answers the user's question.
      
      OMAR'S AVAILABLE SKILLS (use these exact names for filtering):
      OpenAI, JavaScript, Angular, React, Tailwind, TypeScript, NodeJS, Stripe API, MongoDB, NextJs, Amazon Selling Partner API, Microsoft Business Central, Shopify, BigCommerce, Python, Firebase, NX Monorepos, Azure, Monday.com App Development, CopilotKit, AG Grid, Claude Code, JIRA, BetterAuth, Cursor IDE
      
      EXAMPLES:
      ✅ "what frontend technologies do you know?" → showSkillsList(["React", "Angular", "Tailwind", "TypeScript"])
      ✅ "list your skills" → showSkillsList([])
      ✅ "what are your top skills?" → showSkillsList([])
      ✅ "show me your JavaScript-related skills" → showSkillsList(["JavaScript", "React", "NodeJS", "NextJs"])
      ✅ "what backend technologies do you use?" → showSkillsList(["NodeJS", "MongoDB", "Firebase", "Azure"])
    `,
  }, []);

  useCopilotAction({
    name: 'showSkillsList',
    description: 'Display a list of multiple technical skills with overview and clickable previews. Use for questions about multiple skills, technologies, expertise overview, or portfolio highlights. Supports filtering by skill names or categories.',
    parameters: [
      {
        name: 'skillNames',
        type: 'string[]',
        description: 'Array of skill names to display. Can be specific skill names like ["React", "JavaScript", "MongoDB"], categories like ["frontend", "backend"], or empty array [] for default featured skills display.',
        required: true,
      },
    ],
    handler: async ({ skillNames }) => {
      console.log(sig, `📋 Displaying skills list with filter: ${skillNames?.join(', ') || 'default'}`);
      
      // Return undefined to prevent additional text response - only render component
      return undefined;
    },
    render: ({ args }) => {
      if (!args?.skillNames) {
        return (
          <div className="p-4 bg-purple/10 border border-purple/30 rounded-xl max-w-lg mx-auto">
            <p className="text-purple text-sm">No skill names provided.</p>
          </div>
        );
      }

      const skillNames = args.skillNames;
      
      // Use the SkillsList component
      return <SkillsList skillNames={skillNames} />;
    },
  });

  return {};
}; 