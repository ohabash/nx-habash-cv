import { RefObject, useRef } from 'react';
import { InfiniteMovingCards } from '../ui/infinite-moving-cards';
import { randomSkillsSet1, randomSkillsSet2, skills } from './skills.data';
import { useScroll, motion, useTransform } from 'framer-motion';

type Props = { 
  containerRef: RefObject<HTMLDivElement> 
};

export const SmallCarousels2 = ({containerRef}: Props) => {
  const skillsLn = skills.length;
  const firstHalf = skills.slice(0, skillsLn/2);
  const secondHalf = skills.slice(skillsLn/2, skillsLn);
  
  return (
    <div
      className="d6 -mt-[calc((100vh-(300px*(16/9)))/2)] space-y-3 pt-2 md:-mt-[calc((100vh-(60vw*(9/16)))/2)]"
    >
      <InfiniteMovingCards
        items={firstHalf}
        direction="right"
        speed="60s" // change based on skillsLn
        groupId={'R1'}
      />
      <InfiniteMovingCards
        items={secondHalf}
        direction="right"
        speed="80s" // change based on skillsLn
        groupId={'R2'}
      />
    </div>
  );
};
