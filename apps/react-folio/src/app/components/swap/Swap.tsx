// Swap.tsx
// This component handles the swapping of text with a delay between each word.
// For more information, visit: https://www.tailwindtoolbox.com/generators

import { TypeAnimation } from 'react-type-animation';
import { zipArrays } from '../../functions';
import './swap.scss';
import { twMerge } from 'tailwind-merge';

type Props = {
  words: string[];
  className?: string;
  delay?: number;
};

export const Swap = ({ words, className, delay = 3000 }: Props) => {
  const timeBetweenWords = Array(words.length).fill(delay);
  const sequence = zipArrays(words, timeBetweenWords);
  return (
    <>
      <TypeAnimation
        sequence={sequence}
        wrapper="span"
        cursor={false}
        repeat={Infinity}
        style={{ display: 'inline-block'}}
        className={twMerge('', className)}
        deletionSpeed={60}
      />
      <span className="cursor">|</span>
    </>
  );
};
