'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MdSend, MdEmail } from 'react-icons/md';
import { useCopilotChat } from "@copilotkit/react-core";
import { Role, TextMessage } from "@copilotkit/runtime-client-gql";

const sig = `[ SendMessage ] ::: `;

/**
 * SendMessage Component
 * 
 * Purpose: Triggers the business card action to display contact information
 * 
 * Updated behavior:
 * - Sends a message to show the business card with contact details
 * - No longer extracts form data or triggers contact form
 * - Simplified to just request contact information display
 */

interface SendMessageProps {
  buttonText?: string;
  iconType?: 'send' | 'email';
  fullWidth?: boolean;
  requestInfo: string; // Context for logging - no longer used for data extraction
  className?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const SendMessage = ({
  buttonText = 'Contact Me',
  iconType = 'email',
  fullWidth = true,
  requestInfo,
  className = '',
  onSuccess,
  onError
}: SendMessageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { appendMessage } = useCopilotChat();

  const handleClick = async () => {
    console.log(sig, `📞 ${buttonText} button clicked`);
    console.log(sig, `Requesting contact information`);
    
    setIsLoading(true);
    
    try {
      // Send message to trigger contact request
      const message = "Start a Contact Request. Use what you know about me as args";
      
      console.log(sig, '💬 Triggering contact request:', message);
      
      // Send message to chat using CopilotKit
      appendMessage(
        new TextMessage({
          content: message,
          role: Role.User,
        })
      );
      
      console.log(sig, '✅ Contact request sent successfully');
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Call success callback
      onSuccess?.();
      
    } catch (err) {
      console.error(sig, '❌ Error requesting contact:', err);
      const errorMsg = err instanceof Error ? err.message : 'Failed to start contact request';
      onError?.(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const Icon = iconType === 'send' ? MdSend : MdEmail;

  return (
    <div className={className}>
      <motion.button
        onClick={handleClick}
        disabled={isLoading}
        className={`${fullWidth ? 'w-full' : ''} py-4 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 ${
          isLoading
            ? 'bg-blue/30 text-blue cursor-not-allowed border border-blue/30'
            : 'bg-gradient-to-r from-blue/20 to-accent3/20 hover:from-blue/30 hover:to-accent3/30 text-white border border-blue/30 hover:border-accent3/50 backdrop-blur-sm'
        }`}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue border-t-transparent"></div>
            <span>Getting info...</span>
          </>
        ) : (
          <>
            <Icon className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
            <span>{buttonText}</span>
          </>
        )}
      </motion.button>
    </div>
  );
}; 