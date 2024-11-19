import { RefObject, useRef } from 'react';
import { InfiniteMovingCards } from '../ui/infinite-moving-cards';
import { randomSkillsSet1, randomSkillsSet2 } from './skills.data';
import { useScroll, motion, useTransform } from 'framer-motion';

type Props = { 
  containerRef: RefObject<HTMLDivElement> 
};

export const SmallCarousels2 = ({containerRef}: Props) => {
  
  return (
    <div
      className="d6 -mt-[calc((100vh-(300px*(16/9)))/2)] space-y-3 pt-3 md:-mt-[calc((100vh-(60vw*(9/16)))/2)]"
    >
      <InfiniteMovingCards
        items={randomSkillsSet1}
        direction="right"
        speed="180s"
        groupId={'R1'}
      />
      <InfiniteMovingCards
        items={randomSkillsSet2}
        direction="right"
        speed="200s"
        groupId={'R2'}
      />
    </div>
  );
};
