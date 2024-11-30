import React from 'react'
import { PlaceholdersAndVanishInput } from '@ui/placeholders-and-vanish-input';

type Props = {
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (val: string, e: React.FormEvent<HTMLFormElement>) => void;
};
const ChatInput = ({onSubmit}: Props) => {
  const [val, setVal] = React.useState('');
  const placeholders = [
    'Where did you go to school?',
    'Do you know how to use React?',
    'What’s your experience with front-end development?',
    'What’s your experience with back-end development?',
    'How do you handle tight deadlines?',
    'Write a Javascript method to reverse a string',
    'Tell me about yourself?',
    'What’s your experience with REST APIs?',
  ];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setVal(newVal);
  };
  const valAndSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(val, e);
  }
  return (
    <div className="relative">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={valAndSubmit}
      />
    </div>
  );
}

export default ChatInput
