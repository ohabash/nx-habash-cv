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
  const translateX = useTransform( scrollYProgress, [0, 1], track );
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  return (
    <div className={`overflow-clip ${className}`} ref={carouselWrapperRef}>
      <motion.div
        className={twMerge(
          `flex gap-5 mb-5 _animate-carousel-move `,
          direction === 'left' ? 'justify-end' : 'justify-start'
        )}
        // style={{ x: translateX }}
        transition={{ type: 'spring', stiffness: 1000 }}
      >
        {items.map((item, index) => (
          <a
            className="w-[15vw] overflow-clip shrink-0 aspect-video relative rounded-xl block"
            key={`${carId}-${index}`}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            style={{
              backgroundImage: `url(${item.poster})`,
              backgroundSize: 'cover',
              // backgroundPositionY: bgY,
            }}
          >
            {/* overlay */}
            <div
              className="absolute top-0 left-0 w-full h-full z-10 p-2__ flex items-center text-center justify-center"
            >
              <motion.div
                className="bg-dark/90__ blurrr h-full rounded-xl overflow-clip w-full"
                style={
                  {
                    opacity: overlayOpacity,
                  }
                }
              >
                <img
                  className={twMerge(
                    'drop-shadow-2xl w-[40%] h-full object-contain inline',
                    item.iconClass
                  )}
                  src={item.icon || '/img/logos/angular.webp'}
                  alt=""
                />
              </motion.div>
            </div>
          </a>
        ))}
      </motion.div>
    </div>
  );
};
