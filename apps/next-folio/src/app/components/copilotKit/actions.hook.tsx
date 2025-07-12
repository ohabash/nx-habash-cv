'use client';
import { useCopilotAction } from "@copilotkit/react-core";
import { allData } from '@/data';

export const useCopilotActions = () => {
  const {
    experience,
    skills,
    questions,
    rules,
    education,
    contactInfo,
    expectations,
  } = allData;
  useCopilotAction({
    name: 'Check Skills',
    description: 'Check if the user has the skills to do the job',
    parameters: [
      {
        name: 'skill',
        type: 'string',
        description: 'Skill to check if the user has',
      },
    ],
    render: ({ status, args }) => {
      console.log(`🚀 => useCopilotActions => status:`, status)
      if (status === 'executing') {
        return <div>Loading Skill {args.skill}...</div>;
      }

      if (status === 'complete') {
        return (
          <div className="custom-ui-container">
            <h3>Custom Response</h3>
            <pre>{JSON.stringify(args.skill, null, 2)}</pre>
            <button onClick={() => console.log('Custom action!')}>
              Click me
            </button>
          </div>
        );
      }

      return <></>;
    },
  });
  return {};
};