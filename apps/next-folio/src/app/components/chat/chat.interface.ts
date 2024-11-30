export type ChatConvoProps = {
  messages: ChatMessage[];
}
export type ChatMessage = {
  id: string;
  text: string;
  user: string;
  timestamp: string;
  loading?: boolean;
}

export const sampleMessages: ChatMessage[] = [
  {
    id: '1',
    text: 'Its a pleasure to meet you Bob. What would you like to know about my professional experience?',
    user: 'Omar Habash (Bot)',
    timestamp: '2022-01-01T10:00:00Z',
  },
  {
    id: '2',
    text: 'Do you know how to use React?',
    user: 'Bob',
    timestamp: '2022-01-01T10:00:00Z',
  },
  {
    id: '3',
    text: 'Yes, I have been using React for the past 3 years.',
    user: 'Omar Habash (Bot)',
    timestamp: '2022-01-01T10:00:00Z',
  },
  {
    id: '4',
    text: 'What’s your experience with back-end development?',
    user: 'Bob',
    timestamp: '2022-01-01T10:00:00Z',
  },
  {
    id: '5',
    text: 'I have experience with Node.js and Express',
    user: 'Omar Habash (Bot)',
    timestamp: '2022-01-01T10:00:00Z',
  },
];