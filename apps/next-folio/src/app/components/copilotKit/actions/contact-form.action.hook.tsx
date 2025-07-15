'use client';
import { useCopilotAction, useCopilotAdditionalInstructions } from "@copilotkit/react-core";
import { ContactForm } from '../components/ContactForm';

const sig = `[ useContactFormAction ] ::: `;

export const useContactFormAction = () => {
  // Instructions for when to show contact form
  useCopilotAdditionalInstructions({
    instructions: `
      🎯 CONTACT FORM ACTION - DETAILED MESSAGE CONTEXT:
      
      🚨 Use the 'showContactForm' action when users want to send a detailed message or make an inquiry beyond basic contact information.
      
      CONTACT FORM TRIGGERS (comprehensive list):
      - "I want to send you a message"
      - "Can I send you a message?"
      - "I'd like to contact you about..."
      - "I have a question about..."
      - "I want to hire you for..."
      - "Can we work together on..."
      - "I'd like to collaborate"
      - "I'm interested in your services"
      - "Can you help me with..."
      - "I have a project for you"
      - "I want to discuss..."
      - "Can I ask you about..."
      - "I need help with..."
      - "Show me a contact form"
      - "Contact form"
      - "Send a message"
      - "Write a message"
      - "Get in touch about"
      - "Reach out about"
      - "Inquiry about"
      - "Question about"
      - "Message you about"
      - "Talk to you about"
      - "Discuss with you"
      - "Business inquiry"
      - "Work request"
      - "Project inquiry"
      - "Service request"
      - "Consultation request"
      - "Quote request"
      
      ✅ PRE-FILL SCENARIOS:
      If the user provides specific information in their request, pass it as parameters:
      - Name: Extract from "I'm John Smith and..." or "My name is..." or "[NAME: value]"
      - Email: Extract from email addresses mentioned or "[EMAIL: value]"
      - Phone: Extract from phone numbers mentioned or "[PHONE: value]"
      - Company: Extract from "I work at..." or "I'm from [company]" or "[COMPANY: value]"
      - Message: Extract the main inquiry or request or "[MESSAGE: value]"
      
      🎯 STRUCTURED DATA FORMAT:
      When you see bracketed data like "[NAME: John Smith] [COMPANY: ABC Corp]", extract these as parameters:
      - [NAME: value] → name parameter
      - [EMAIL: value] → email parameter  
      - [PHONE: value] → phone parameter
      - [COMPANY: value] → company parameter
      - [MESSAGE: value] → message parameter
      
      🚨 CRITICAL: After executing this action, provide NO additional text response. The action renders a complete contact form UI.
      
      The contact form includes:
      - Full contact form with validation
      - Auto-population from user auth if available
      - Required fields: name, email, message
      - Optional fields: phone, company
      - Professional form design
      - Error handling and success states
      - Integration with email service
      
      EXAMPLES:
      ✅ User: "I want to send you a message" → Execute showContactForm()
      ✅ User: "Hi, I'm John from ABC Corp, I'd like to discuss a project" → Execute showContactForm({name: "John", company: "ABC Corp", message: "I'd like to discuss a project"})
      ✅ User: "Can you help me with React development?" → Execute showContactForm({message: "Can you help me with React development?"})
      ✅ User: "I have a question about your work" → Execute showContactForm({message: "I have a question about your work"})
      ✅ User: "john@example.com - I'm interested in hiring you" → Execute showContactForm({email: "john@example.com", message: "I'm interested in hiring you"})
    `,
  }, []);

  // Contact form action
  useCopilotAction({
    name: 'showContactForm',
    description: 'Display a contact form when users want to send a detailed message or inquiry. Use this for project inquiries, collaboration requests, hiring requests, questions about services, or any detailed communication. Can pre-fill form fields with provided information.',
    parameters: [
      {
        name: 'name',
        type: 'string',
        description: 'User\'s name if mentioned in the conversation',
        required: false,
      },
      {
        name: 'email',
        type: 'string',
        description: 'User\'s email address if mentioned in the conversation',
        required: false,
      },
      {
        name: 'phone',
        type: 'string',
        description: 'User\'s phone number if mentioned in the conversation',
        required: false,
      },
      {
        name: 'company',
        type: 'string',
        description: 'User\'s company or organization if mentioned in the conversation',
        required: false,
      },
      {
        name: 'message',
        type: 'string',
        description: 'Initial message or inquiry content based on user\'s request',
        required: false,
      },
    ],
    handler: async ({ name, email, phone, company, message }) => {
      console.log(sig, '📝 Displaying contact form with pre-filled data:', {
        name,
        email,
        phone,
        company,
        message
      });
      return `Successfully displayed contact form${name || email || phone || company || message ? ' with pre-filled information' : ''}.`;
    },
    render: ({ args }) => {
      // console.log(sig, '🎨 Rendering ContactForm with args:', args);
      // console.log(sig, '🎨 Passing to ContactForm:', {
      //   initialName: args.name,
      //   initialEmail: args.email,
      //   initialPhone: args.phone,
      //   initialCompany: args.company,
      //   initialMessage: args.message
      // });
      
      return (
        <ContactForm
          initialName={args.name}
          initialEmail={args.email}
          initialPhone={args.phone}
          initialCompany={args.company}
          initialMessage={args.message}
        />
      );
    },
  });
   
  return {};
}; 