'use client';
import { useCopilotAction, useCopilotAdditionalInstructions } from "@copilotkit/react-core";
import { allData } from '@/data';
import { MdEmail, MdInfoOutline } from 'react-icons/md';
import { sendContactNotification } from '@/services/email.service';
import { useState } from 'react';

const sig = `[ useIdontKnowAction ] ::: `;
export const useIdontKnowAction = () => {

  // Add specific instructions for when to use the dataNotFound action
  useCopilotAdditionalInstructions({
    instructions: `
      CRITICAL: When asked about information NOT available in the portfolio data, you MUST use the 'dataNotFound' action.
      
      ⚠️ BUT FIRST - MANDATORY CHECKS:
      1. 🔍 CHECK SKILLS: Is this asking about a technical skill? Use 'showcaseSkill' action if so
         - Skills include: Tailwind, React, Angular, JavaScript, TypeScript, MongoDB, NodeJS, etc.
         - Question patterns: "do you know...", "have you used...", "experience with...", "tell me about [tech]"
      
      2. 🔍 CHECK QUESTIONS DATA: Can this be answered from the questions data?
         - Education, leadership, project management, personality, working from home, hobbies, career goals
         - Example: "what do you do for fun" → Answer from hobbies_and_personality section
      
      ⚠️ ONLY use 'dataNotFound' for information that is GENUINELY not available after checking:
      - Skills data (technical expertise)  
      - Questions data (prepared answers)
      - Experience, education, contact, expectations data
      
      This includes:
      - Personal family information (mom's name, dad's name, siblings, etc.)
      - Personal preferences not in the data (favorite color, food preferences, etc.)
      - Private details not in the professional portfolio
      - Any information that would require personal knowledge beyond the provided data
      
      WORKFLOW for missing information:
      1. FIRST: Check if it's a skill question → Use 'showcaseSkill' action
      2. SECOND: Check if it's answerable from questions data → Answer directly
      3. ONLY THEN: If truly not available, use 'dataNotFound' action
      4. Execute the 'dataNotFound' action with the requestedInfo parameter
      5. Do NOT give generic redirect responses - use the action instead
      6. CRITICAL: After executing this action, provide NO additional text response. The action result IS the complete response.
      
      Examples:
      - "have you used Tailwind?" → Use showcaseSkill action (NOT dataNotFound)
      - "what do you do for fun?" → Answer from questions data (NOT dataNotFound)
      - "What's your mom's name?" → Use dataNotFound action with requestedInfo: "mother's name"
      - "What's your favorite food?" → Use dataNotFound action with requestedInfo: "favorite food"  
      - "Do you have siblings?" → Use dataNotFound action with requestedInfo: "family/sibling information"
    `,
  }, []);

  useCopilotAction({
    name: 'dataNotFound',
    description: 'REQUIRED: Use this action when requested information is not available in the portfolio data sources, including personal information, preferences, or details not covered in the professional data. This provides users with a direct contact option.',
    parameters: [
      {
        name: 'requestedInfo',
        type: 'string',
        description: 'Description of what information was requested but not found in the data',
        required: true,
      },
      {
        name: 'suggestion',
        type: 'string', 
        description: 'Optional suggestion for how the user can get this information',
        required: false,
      },
    ],
    handler: async ({ requestedInfo, suggestion }) => {
      console.log(sig, `❓ Data not found: ${requestedInfo}`);
      if (suggestion) {
        console.log(sig, `💡 Suggestion: ${suggestion}`);
      }
      return `The requested information "${requestedInfo}" is not available in my current portfolio data. I've provided an option to contact Omar directly for this information.`;
    },
    render: ({ args }) => {
      const [isLoading, setIsLoading] = useState(false);
      const [emailSent, setEmailSent] = useState(false);
      const [error, setError] = useState<string | null>(null);

      const handleEmailOmar = async () => {
        console.log(sig, '📧 Email Omar button clicked');
        console.log(sig, `User wanted info about: ${args.requestedInfo}`);
        
        setIsLoading(true);
        setError(null);
        
        try {
          const response = await sendContactNotification(args.requestedInfo || 'Unknown request');
          
          if (response.success) {
            console.log(sig, '✅ Email sent successfully');
            setEmailSent(true);
          } else {
            console.error(sig, '❌ Email sending failed:', response.error);
            setError(response.error || 'Failed to send email');
          }
        } catch (err) {
          console.error(sig, '❌ Error sending email:', err);
          setError(err instanceof Error ? err.message : 'Failed to send email');
        } finally {
          setIsLoading(false);
        }
      };

      return (
        <div className="flex flex-col gap-4 p-4 bg-darker backdrop-blur-md border-[2px] border-darkBlue/30 rounded-xl relative overflow-hidden">
          {/* Header with icon */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue/20 rounded-full flex items-center justify-center">
              <MdInfoOutline className="text-blue text-lg" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium text-sm">Information Not Available</p>
              <p className="text-white/60 text-xs">This data isn't in my portfolio</p>
            </div>
          </div>

          {/* Requested info */}
          <div className="bg-dark/50 border border-darkBlue/20 rounded-lg p-3">
            <p className="text-white/80 text-sm">
              <span className="text-white/50">Requested:</span> {args.requestedInfo}
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red/10 border border-red/20 rounded-lg p-3">
              <p className="text-red/90 text-sm">
                <span className="font-medium">Error:</span> {error}
              </p>
            </div>
          )}

          {/* Success message */}
          {emailSent && (
            <div className="bg-green/10 border border-green/20 rounded-lg p-3">
              <p className="text-green/90 text-sm">
                <span className="font-medium">✅ Email sent!</span> Omar will be notified about your request.
              </p>
            </div>
          )}

          {/* Email button */}
          <button
            onClick={handleEmailOmar}
            disabled={isLoading || emailSent}
            className={`w-full font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group ${
              emailSent
                ? 'bg-green/20 text-green cursor-not-allowed'
                : isLoading
                ? 'bg-blue/50 text-white cursor-not-allowed'
                : 'bg-blue hover:bg-blue/90 text-white'
            }`}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Sending...
              </>
            ) : emailSent ? (
              <>
                <span>✅</span>
                Email Sent
              </>
            ) : (
              <>
                <MdEmail className="text-lg group-hover:scale-110 transition-transform duration-200" />
                Contact Omar Directly
              </>
            )}
          </button>

          {/* Footer note */}
          <p className="text-white/40 text-xs text-center">
            {emailSent
              ? 'Omar has been notified and will respond soon'
              : 'For questions beyond my portfolio scope, reach out personally'
            }
          </p>

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue/5 to-transparent pointer-events-none rounded-xl" />
        </div>
      );
    },
  });

  return {};
};
