import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { Skill } from "./skills.data";
import { LogoCard } from "../logo-card/LogoCard";

type SmCarProps = {
  items: Skill[];
  carId: string;
  className?: string;
  direction: 'left' | 'right';
};

export const SmallCarousel2 = ({ items, carId, className, direction }: SmCarProps) => {
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  // const offset = (direction === 'left') ? ['start start', 'end start'] : ['end start', 'start start'];
  // const { scrollYProgress } = useScroll({
  //   target: carouselWrapperRef,
  //   offset: ['end end', 'start start'],
  // });
  const track = (direction === 'left') ? [1000, 0] : [-1000, 0];
  return (
    <div className={`overflow-clip ${className}`} ref={carouselWrapperRef}>
      <motion.div
        className={twMerge(
          `flex gap-5 mb-5 _animate-carousel-move `,
          direction === 'left' ? 'justify-end' : 'justify-start'
        )}
        transition={{ type: 'spring', stiffness: 1000 }}
      >
        {items.map((item, index) => (
          <LogoCard
            key={`${carId}-${index}`}
            item={item}
          />
        ))}
      </motion.div>
    </div>
  );
};
