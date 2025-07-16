'use client';
import React from 'react';
import { Suggestions } from './Suggestions';
import { useChatContext } from '@copilotkit/react-ui';
import { useCopilotProfessionalContext } from '../useReadable';
import { useCopilotActions } from '../useActions';
import { INSTRUCTIONS } from '../useReadable';

export const AiBody: React.FC = () => {
  const { open, setOpen } = useChatContext();
  
  // Initialize professional context and actions
  useCopilotProfessionalContext();
  useCopilotActions();

  return (
    <>
      {open && (
        <div
          id="ai-body"
          className="z-50 blurrr h-screen overflow-hidden sticky top-0 w-full slideInLeft animated"
        >
          <Suggestions />
        </div>
      )}
    </>
  );
};

export default AiBody; 