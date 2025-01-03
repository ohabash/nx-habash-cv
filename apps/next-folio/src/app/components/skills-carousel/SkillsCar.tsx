import { useScroll } from 'framer-motion';
import { skills } from '../carousel/skills.data';
import { InfiniteMovingCards } from '../ui/infinite-moving-cards';
import { RefObject } from 'react';

type Props = {
  containerRef: RefObject<HTMLDivElement>;
  groupId: string;
};
export function SkillsCar({ containerRef, groupId }: Props) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      (... something missing? )
      {/* <InfiniteMovingCards
        items={skills}
        direction="right"
        speed="slow"
        groupId={groupId}
        scrollYProgress={scrollYProgress}
      /> */}
    </div>
  );
}

