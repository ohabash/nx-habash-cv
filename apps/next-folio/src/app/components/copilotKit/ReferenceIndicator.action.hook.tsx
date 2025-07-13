'use client';
import { useCopilotAction, useCopilotAdditionalInstructions } from "@copilotkit/react-core";
import { allData } from '@/data';
import { ReferenceIndicator } from './ReferenceIndicator';

export const ReferenceIndicatorActions = () => {
  const {
    experience,
    skills,
    questions,
    rules,
    education,
    contactInfo,
    expectations,
  } = allData;



  // Instruct AI to always call referencePortfolioData before sharing any portfolio information
  useCopilotAdditionalInstructions({
    instructions: `
      CRITICAL WORKFLOW: When asked about Omar's portfolio information (skills, experience, education, contact, expectations, questions, or rules), follow this exact sequence:
      
      1. FIRST: Execute the 'referencePortfolioData' action with the appropriate dataType parameter
      2. SECOND: After the action completes successfully, provide a natural response with the requested information
      
      Examples:
      - User asks "how can i reach you" → Execute referencePortfolioData("contact") → Then share contact information naturally
      - User asks about skills → Execute referencePortfolioData("skills") → Then discuss Omar's technical skills
      
      Do NOT show the raw function call to the user. Execute it, then respond naturally.
    `,
  }, []);

  // Dynamic data reference action
  useCopilotAction({
    name: 'referencePortfolioData',
    description: 'MUST call this action before sharing any portfolio information (skills, experience, education, contact, expectations, questions, rules). This shows the user which data source is being referenced.',
    parameters: [
      {
        name: 'dataType',
        type: 'string',
        description: 'The type of portfolio data being referenced',
        enum: ['skills', 'experience', 'education', 'contact', 'expectations', 'questions', 'rules'],
        required: true,
      },
    ],
    handler: async ({ dataType }) => {
      console.log(`🔍 Referencing ${dataType} data`);
      // Return a success message that the AI can use
      return `Successfully referenced ${dataType} data. You may now proceed to share the ${dataType} information.`;
    },
    render: ({ args }) => <ReferenceIndicator dataType={args.dataType || 'portfolio'} />,
  });
   
  return {};
};