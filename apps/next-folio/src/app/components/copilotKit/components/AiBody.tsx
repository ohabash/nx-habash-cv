'use client';
import React from 'react';
import { useChatContext } from '@copilotkit/react-ui';


export const AiBody: React.FC = () => {
  const { open, setOpen } = useChatContext();
  const active = false;
  
  // Initialize professional context and actions
  // useCopilotProfessionalContext();
  // useCopilotActions();

  return (
    <>
      {(open && active) && (
        <div
          id="ai-body"
          className="z-50 blurrr h-screen overflow-hidden sticky top-0 w-full slideInLeft animated"
        >
          {/* <Suggestions /> */}
        </div>
      )}
    </>
  );
};

export default AiBody; 