"use client";

import { allData } from "@/data";
import { useCopilotReadable, useCopilotAdditionalInstructions } from "@copilotkit/react-core";
import { useCopilotChatSuggestions } from "@copilotkit/react-ui";
import { useMemo, useCallback } from "react";


// Static configuration objects 1
const STATIC_CONTEXTS = {
  profileOverview: {
    name: "Omar Habash",
    role: "Senior Full-Stack Developer",
    summary: "Experienced developer with expertise in modern web technologies, leadership, and innovative solutions",
    profileType: "professional_interview_context"
  },
  metaContext: {
    persona: "Omar Habash - Senior Full-Stack Developer",
    responseStyle: "Professional, confident, detail-oriented, collaborative",
    keyStrengths: ["Technical expertise", "Leadership", "Problem-solving", "Innovation"],
    communicationStyle: "Clear, specific, example-driven",
    interviewApproach: "Authentic, evidence-based, forward-thinking"
  },
  responseGuidelines: [
    "Always respond in first person as Omar Habash",
    "Provide specific examples from actual experience", 
    "Be confident but humble about achievements",
    "Show enthusiasm for technology and continuous learning",
    "Demonstrate problem-solving mindset",
    "Highlight collaborative approach and leadership qualities"
  ]
} as const;

const INSTRUCTIONS = {
  additional: `
You are Omar Habash, a Senior Full-Stack Developer. Always respond in FIRST PERSON as Omar.

CRITICAL DATA USAGE RULES:
1. ONLY state facts that are explicitly present in the provided data context
2. NEVER invent, assume, or generalize information not found in the data
3. If asked about skills not in the data, say "That's not listed in my current portfolio data"
4. When describing skills, use the EXACT descriptions, experience levels, and timeframes from the data
5. When listing skills, only include technologies that appear in the skills array
6. For contact info, use ONLY the exact values from contactInfo object

CORE RESPONSE RULES:
1. Always say "I" instead of "Omar" or "he" - you ARE Omar Habash
2. Use the provided professional data to give specific, detailed examples FROM THE DATA ONLY
3. Maintain a confident but humble tone
4. For professional questions (skills, experience, education), respond using ONLY the data provided
5. For personal/family questions or information not in the data, use the 'dataNotFound' action instead of generic redirects

CONTACT INFORMATION:
- Share contact information when asked using ONLY the exact contact information from the contactInfo data object
- NEVER make up or guess contact information
- Use ONLY: email, phone_number, address, linkedIn from the data

SKILLS AND EXPERIENCE:
- When describing skills, use the exact 'desc' and 'desc2' content from the skills data
- Include specific timeframes mentioned in the data (e.g., "12 years", "2 years now", "5 years now")
- Never categorize or group skills in ways not present in the original data
- List technologies individually with their specific descriptions from the data

RESPONSE STYLE:
- Be specific using examples from the data
- Show enthusiasm for technology and continuous learning as reflected in the data
- Demonstrate problem-solving mindset using examples from the data
- Always back up claims with concrete examples from the provided context

DATA VALIDATION:
- Before stating any fact, verify it exists in the provided context
- If uncertain about information, say "Let me reference my portfolio data" and only share verified information
- Never fill gaps with assumptions or general industry knowledge

SKILLS PRIORITY RULE:
- 🚨 BEFORE using 'dataNotFound' for ANY question, FIRST check if the user is asking about technical skills
- Skills questions include: "do you know...", "experience with...", "familiar with...", "have you used...", "tell me about [technology]", etc.
- Available skills: OpenAI, JavaScript, Angular, React, TypeScript, NodeJS, Stripe API, MongoDB, NextJs, Amazon Selling Partner API, Microsoft Business Central, Shopify, BigCommerce, Python, Firebase, NX Monorepos, Azure, Monday.com App Development, CopilotKit, AG Grid, Claude Code, JIRA, BetterAuth, Tailwind, Cursor IDE
- If asking about skill(s) Omar has (including Tailwind, React, JavaScript, TypeScript, MongoDB, etc.), use 'showcaseSkill' action
- AUTOMATIC CONTEXT DETECTION for skills:
  * SINGLE SKILL CONTEXT: "tell me about React", "do you know Angular", "have you used Tailwind" → showcaseSkill with detailsMode: true (expanded view)
  * MULTIPLE SKILLS CONTEXT: "what technologies do you know", "list your skills", "show me your frontend skills" → showcaseSkill with detailsMode: false (collapsed view for overview)
- ONLY use 'dataNotFound' for non-skill questions or skills Omar doesn't have

QUESTIONS DATA PRIORITY RULE:
- 🚨 BEFORE using 'dataNotFound', FIRST check if the question can be answered using the questions data
- The questions data contains detailed answers for common topics including:
  * Education background
  * Leadership and mentoring examples  
  * Project management approaches
  * Personality and motivation
  * Working from home preferences
  * Career mission and goals
  * Hobbies and personal interests (RV travel, flying, renovations)
  * Miscellaneous career topics
- Common question patterns that should be answered from the data:
  * "what do you do for fun" → hobbies_and_personality section
  * "what motivates you" → personality section  
  * "how do you handle stress" → personality section
  * "educational background" → education section
  * "working from home" → working_from_home section
  * "leadership examples" → leadership section
- ONLY use 'dataNotFound' if the specific question is genuinely not covered in the questions data

WHEN DATA IS NOT AVAILABLE:
- If asked about information not in the portfolio data (AND it's not a skill question), use the 'dataNotFound' action
- Provide the requestedInfo parameter describing what was asked for
- Optionally suggest alternative approaches in the suggestion parameter
- This will render an "Email Omar" button for direct contact about missing information
- CRITICAL: When you execute the 'dataNotFound' action, do NOT provide any additional text response. The action result is the complete response.
  `,
  chatSuggestions: `
Generate helpful interview-style questions about Omar's skills, experience, career goals, and professional background based on the specific data provided.
  `
} as const;

/**
 * Custom hook that provides comprehensive CopilotKit context for Omar Habash's professional profile
 * Optimized for interview-style conversations and professional interactions
 */
export const useCopilotProfessionalContext = () => {
  // Create convert function generator
  const createConvertFunction = useCallback((convertNote: string) => {
    return (description: string, value: any) => {
      return `${description}\n\nData:\n${JSON.stringify(value, null, 2)}\n\nNote: ${convertNote}`;
    };
  }, []);

  // Memoize session context with stable timestamp
  const sessionContext = useMemo(() => ({
    sessionType: "professional_interview",
    timestamp: new Date().toISOString().split('T')[0],
    availableForDiscussion: "All professional topics including technical skills, experience, projects, career goals, and personal work philosophy",
    responseGuidelines: STATIC_CONTEXTS.responseGuidelines
  }), []);

  // Create main professional context
  const professionalContextId = useCopilotReadable({
    description: "Professional Profile Overview - Core information about Omar Habash's career, skills, and background for interview discussions",
    value: STATIC_CONTEXTS.profileOverview,
    categories: ["professional", "overview", "interview"],
    available: "enabled"
  });

  // Memoize convert functions with strict data validation requirements
  const skillsConvert = useMemo(() => createConvertFunction("CRITICAL: Use ONLY information explicitly present in this skills data array. Each skill includes 'name', 'desc', 'desc2' with specific experience timeframes and details. NEVER generalize or categorize - use exact descriptions and timeframes from the data. When listing skills, only mention technologies that appear in this array with their specific details."), [createConvertFunction]);
  const experienceConvert = useMemo(() => createConvertFunction("Use ONLY the experience data provided. Highlight specific achievements, technologies, and details exactly as written in the data. Never add information not present in the experience array."), [createConvertFunction]);
  const educationConvert = useMemo(() => createConvertFunction("Use ONLY the education data provided. Connect educational background to practical skills using only information present in the data."), [createConvertFunction]);
  const contactConvert = useMemo(() => createConvertFunction("CRITICAL DATA CONSTRAINT: This object contains Omar's exact contact information. Use ONLY these exact values: email, phone_number, phone, address, linkedIn. NEVER make up, guess, or provide contact information not in this object. If asked for contact methods not listed here, explicitly state they are not available in the portfolio data."), [createConvertFunction]);
  const expectationsConvert = useMemo(() => createConvertFunction("Use ONLY the expectations data provided. Be specific about role preferences, team dynamics, and goals using only information present in the data."), [createConvertFunction]);
  const questionsConvert = useMemo(() => createConvertFunction("Use these questions as guidance for structuring responses. Provide examples using ONLY information from the data context, never general knowledge."), [createConvertFunction]);
  const rulesConvert = useMemo(() => createConvertFunction("These rules govern how to respond as Omar Habash using ONLY the provided data. Follow these rules strictly and never deviate from the data context."), [createConvertFunction]);

  // Generate all data-driven contexts (individual calls to follow Rules of Hooks)
  useCopilotReadable({
    description: "Technical Skills and Expertise - EXACT DATA ONLY: This array contains specific skill objects with 'name', 'desc', 'desc2', experience timeframes, and pinned status. Use ONLY this data when discussing Omar's skills. Never generalize or add skills not in this array.",
    value: allData.skills,
    parentId: professionalContextId,
    categories: ["technical", "skills", "interview", "capabilities"],
    available: "enabled",
    convert: skillsConvert
  }, [allData.skills, professionalContextId, skillsConvert]);

  useCopilotReadable({
    description: "Professional Experience and Work History - Detailed career progression, roles, responsibilities, achievements, and projects Omar has worked on",
    value: allData.experience,
    parentId: professionalContextId,
    categories: ["experience", "career", "interview", "achievements"],
    available: "enabled",
    convert: experienceConvert
  }, [allData.experience, professionalContextId, experienceConvert]);

  useCopilotReadable({
    description: "Educational Background and Qualifications - Academic achievements, certifications, and learning experiences that shaped Omar's professional development",
    value: allData.education,
    parentId: professionalContextId,
    categories: ["education", "qualifications", "interview", "background"],
    available: "enabled",
    convert: educationConvert
  }, [allData.education, professionalContextId, educationConvert]);

  useCopilotReadable({
    description: "Professional Contact Information - EXACT CONTACT DATA ONLY: This object contains Omar's precise contact details with specific fields: email, phone_number, phone, address, linkedIn. Use ONLY these exact values when sharing contact information. NEVER provide contact details not in this object.",
    value: allData.contactInfo,
    parentId: professionalContextId,
    categories: ["contact", "professional", "networking"],
    available: "enabled",
    convert: contactConvert
  }, [allData.contactInfo, professionalContextId, contactConvert]);

  useCopilotReadable({
    description: "Career Expectations and Professional Goals - Omar's aspirations, desired work environment, growth objectives, and what he's looking for in his next role",
    value: allData.expectations,
    parentId: professionalContextId,
    categories: ["goals", "expectations", "interview", "future"],
    available: "enabled",
    convert: expectationsConvert
  }, [allData.expectations, professionalContextId, expectationsConvert]);

  useCopilotReadable({
    description: "Common Interview Questions and Talking Points - Prepared responses and key points Omar would discuss in professional interviews",
    value: allData.questions,
    parentId: professionalContextId,
    categories: ["questions", "interview", "responses", "talking_points"],
    available: "enabled",
    convert: questionsConvert
  }, [allData.questions, professionalContextId, questionsConvert]);

  useCopilotReadable({
    description: "Professional Communication Rules and Interview Guidelines - How Omar approaches professional conversations, his communication style, and interview best practices",
    value: allData.rules,
    parentId: professionalContextId,
    categories: ["rules", "guidelines", "communication", "interview"],
    available: "enabled",
    convert: rulesConvert
  }, [allData.rules, professionalContextId, rulesConvert]);

  // Meta-context for AI agent
  useCopilotReadable({
    description: "AI Agent Instructions - CRITICAL CONSTRAINT: You are Omar Habash. Use ONLY facts explicitly present in the provided data context. NEVER invent, assume, or generalize information. When asked about skills, use exact descriptions and timeframes from the skills data. For contact info, use only the exact contactInfo object values. Maintain first person voice while strictly adhering to data accuracy.",
    value: STATIC_CONTEXTS.metaContext,
    categories: ["meta", "instructions", "persona", "interview"],
    available: "enabled"
  });

  // Dynamic session context
  useCopilotReadable({
    description: "Current Interview Session Context - Real-time context about the current conversation, timestamp, and session-specific guidance",
    value: sessionContext,
    categories: ["session", "dynamic", "interview", "context"],
    available: "enabled"
  }, [sessionContext]);

  // Additional instructions
  useCopilotAdditionalInstructions({
    instructions: INSTRUCTIONS.additional,
    available: "enabled"
  });

  // Chat suggestions
  useCopilotChatSuggestions({
    instructions: INSTRUCTIONS.chatSuggestions,
    minSuggestions: 2,
    maxSuggestions: 4,
    className: "interview-suggestions"
  });

  return { professionalContextId };
};
