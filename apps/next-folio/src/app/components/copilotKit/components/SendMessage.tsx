'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MdSend, MdEmail } from 'react-icons/md';
import { useCopilotChat } from "@copilotkit/react-core";
import { Role, TextMessage } from "@copilotkit/runtime-client-gql";

const sig = `[ SendMessage ] ::: `;

interface SendMessageProps {
  buttonText?: string;
  iconType?: 'send' | 'email';
  fullWidth?: boolean;
  requestInfo: string;
  className?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const SendMessage = ({
  buttonText = 'Send Message',
  iconType = 'send',
  fullWidth = true,
  requestInfo,
  className = '',
  onSuccess,
  onError
}: SendMessageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { appendMessage } = useCopilotChat();

  // Extract potential form data from requestInfo
  const extractFormData = (info: string) => {
    const formData: any = {};
    
    // Extract email patterns
    const emailMatch = info.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
    if (emailMatch) {
      formData.email = emailMatch[1];
    }
    
    // Extract phone patterns
    const phoneMatch = info.match(/(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\+\d{1,3}[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/);
    if (phoneMatch) {
      formData.phone = phoneMatch[1];
    }
    
    // Extract name patterns (I'm [Name], My name is [Name])
    const nameMatch = info.match(/(?:I'm|My name is|I am)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i);
    if (nameMatch) {
      formData.name = nameMatch[1];
    }
    
    // Extract company patterns (I work at [Company], I'm from [Company])
    const companyMatch = info.match(/(?:I work at|I'm from|I'm with|at|from)\s+([A-Z][a-zA-Z0-9\s&,.'-]+?)(?:\s+and|\s*[.,]|\s*$)/i);
    if (companyMatch) {
      formData.company = companyMatch[1].trim();
    }
    
    // Use the entire requestInfo as initial message if it's meaningful
    if (info && !info.includes('Business card contact request') && info.length > 10) {
      formData.message = info;
    }
    
    return formData;
  };

  const handleClick = async () => {
    console.log(sig, `📧 ${buttonText} button clicked`);
    console.log(sig, `Request info: ${requestInfo}`);
    
    setIsLoading(true);
    
    try {
      // Extract form data from request info
      const formData = extractFormData(requestInfo);
      console.log(sig, '📝 Extracted form data:', formData);
      
      // Build structured message for contact form with clear parameter extraction
      let message = "Show me the contact form";
      
      // Add extracted data in a structured format for easy parameter extraction
      const parameterData: string[] = [];
      if (formData.name) parameterData.push(`[NAME: ${formData.name}]`);
      if (formData.email) parameterData.push(`[EMAIL: ${formData.email}]`);
      if (formData.phone) parameterData.push(`[PHONE: ${formData.phone}]`);
      if (formData.company) parameterData.push(`[COMPANY: ${formData.company}]`);
      if (formData.message) parameterData.push(`[MESSAGE: ${formData.message}]`);
      
      if (parameterData.length > 0) {
        message += ` with pre-filled data: ${parameterData.join(' ')}`;
      }
      
      console.log(sig, '💬 Structured message for contact form action:', message);
      
      // Send message to chat using CopilotKit
      appendMessage(
        new TextMessage({
          content: message,
          role: Role.User,
        })
      );
      
      console.log(sig, '✅ Message sent successfully to chat');
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Call success callback
      onSuccess?.();
      
    } catch (err) {
      console.error(sig, '❌ Error sending message:', err);
      const errorMsg = err instanceof Error ? err.message : 'Failed to send message';
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
            <span>Processing...</span>
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