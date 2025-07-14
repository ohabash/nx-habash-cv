'use client';
import { useCopilotAction, useCopilotAdditionalInstructions } from "@copilotkit/react-core";
import { BusinessCard } from '../components/BusinessCard';

const sig = `[ useBusinessCardAction ] ::: `;

export const useBusinessCardAction = () => {
  // Instructions for when to show business card
  useCopilotAdditionalInstructions({
    instructions: `
      🎯 BUSINESS CARD ACTION - CONTACT INFORMATION CONTEXT:
      
      🚨 CRITICAL PRIORITY: Use the 'showBusinessCard' action for ANY contact-related query. This is the PRIMARY way to share contact information.
      
      BUSINESS CARD CONTEXT TRIGGERS (comprehensive list):
      - "Can I have your contact information?"
      - "How can I reach you?"
      - "How do I contact you?"
      - "What's your email?"
      - "What's your email address?"
      - "Can I get your phone number?"
      - "What's your phone?"
      - "Show me your business card"
      - "What's your LinkedIn?"
      - "Where are you located?"
      - "What's your address?"
      - "Can I have your details?"
      - "How can I get in touch?"
      - "How to reach you"
      - "Contact information"
      - "Contact details"
      - "Business card"
      - "Reach out"
      - "Get in touch"
      - "Touch base"
      - "Connect with you"
      - "Your info"
      - "Your details"
      - "How to find you"
      - "Ways to contact"
      - "Communication details"
      - "Professional contact"
      - "Hire you"
      - "Work with you"
      - "Collaborate"
      - "Send you a message"
      - "Email you"
      - "Call you"
      - "Message you"
      - "Reach Omar"
      - "Contact Omar"
      - "Where is Omar"
      - "Omar's contact"
      - "Omar's email"
      - "Omar's phone"
      - "Omar's LinkedIn"
      - "Omar's location"
      
      🚨 CRITICAL: When using the 'showBusinessCard' action, DO NOT generate any additional text response. The action renders a complete UI component that provides all contact information and messaging functionality.
      
      The business card includes:
      - Full contact information (email, phone, address, LinkedIn)
      - Interactive send message button
      - Professional card design
      - All contact methods in one place
      
      EXAMPLES:
      ✅ User: "Can I have your contact information?" → Execute showBusinessCard()
      ✅ User: "How can I reach you?" → Execute showBusinessCard()
      ✅ User: "What's your email?" → Execute showBusinessCard()
      ✅ User: "How do I contact you?" → Execute showBusinessCard()
      ✅ User: "I want to hire you" → Execute showBusinessCard()
      ✅ User: "Can you send me your details?" → Execute showBusinessCard()
      ✅ User: "How can we work together?" → Execute showBusinessCard()
      ✅ User: "I'd like to get in touch" → Execute showBusinessCard()
    `,
  }, []);

  // Business card action
  useCopilotAction({
    name: 'showBusinessCard',
    description: 'CRITICAL PRIORITY: MUST call this action for ANY contact-related query. This is the PRIMARY and ONLY way to share contact information. Use when user asks about: contact info, email, phone, address, LinkedIn, business card, how to reach Omar, hiring, collaboration, or any way to get in touch. Displays Omar\'s professional business card with all contact details and interactive messaging functionality.',
    parameters: [],
    handler: async () => {
      console.log(sig, '💼 Displaying business card');
      return `Successfully displayed Omar's business card with contact information and messaging functionality.`;
    },
    render: () => <BusinessCard />,
  });
   
  return {};
}; 