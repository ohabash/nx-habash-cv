import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { Item } from "./carItems2";

type SmCarProps = {
  items: Item[];
  carId: string;
  className?: string;
  direction: 'left' | 'right';
};

export const SmallCarousel2 = ({ items, carId, className, direction }: SmCarProps) => {
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const offset = (direction === 'left') ? ['start start', 'end start'] : ['end start', 'start start'];
  const { scrollYProgress } = useScroll({
    target: carouselWrapperRef,
    // offset: offset as any,
    offset: ['end end', 'start start'],
  });
  const track = (direction === 'left') ? [1000, 0] : [-1000, 0];
  const translateX = useTransform(
    scrollYProgress,
    [0, 1],
    track
  );
  return (
    <div className={`overflow-clip ${className}`} ref={carouselWrapperRef}>
      <motion.div
        className={twMerge(
          `flex gap-5 mb-5 animate-carousel-move_ `,
          direction === 'left' ? 'justify-end' : 'justify-start'
        )}
        // style={{ x: translateX }}
        transition={{ type: 'spring', stiffness: 1000 }}
      >
        {items.map((item, index) => (
          <div
            className="w-[23vw] shrink-0 aspect-video"
            key={`${carId}-${index}`}
          >
            <img
              className="object-cover w-full h-full rounded-xl"
              src={item.poster}
              alt={item.name}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
