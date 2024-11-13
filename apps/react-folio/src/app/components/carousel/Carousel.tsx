import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { useWindowSize } from 'react-use';
import { Button } from "../button/Button";
import { Arrows } from "./Arrows";
import { items, randomItemsSet1, randomItemsSet2 } from "./carItems";
import { SmallCarousel } from "./SmallCarousel";

export const Carousel = () => {
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: carouselWrapperRef,
    offset: ['start start', 'end start'],
  })
  const { width, height } = useWindowSize();
  const maximumScale = useMemo(() => {
    const windowYRatio = height / width;
    const xScale = 1.66667;
    const yScale = xScale * (16 / 9) * windowYRatio;
    return Math.max(xScale, yScale);
  }, [width, height]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.66],
    [maximumScale * 1.1, maximumScale, 1]
  );
  const [carouselVariant, setCarouselVariant] = useState<'inactive' | 'active'>(
    'inactive'
  );
  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (progress >= 0.67) {
      setCarouselVariant('active');
    } else {
      setCarouselVariant('inactive');
    }
  });
  // const activeIndex = 1;
  const activeIndex = Math.floor(items.length / 2);
  const startOuterTransition = 0.6;
  const endOuterTransition = 0.7;
  const outerItemsOpacity = useTransform(scrollYProgress, [startOuterTransition, endOuterTransition], [0, 1]);
  const posterTranslateXLeft = useTransform(
    scrollYProgress,
    [startOuterTransition, endOuterTransition],
    [-100, 0]
  );
  const posterTranslateXRight = useTransform(
    scrollYProgress,
    [startOuterTransition, endOuterTransition],
    [100, 0]
  );
  function outerTranslate(i:number)  {
    return i > activeIndex ? posterTranslateXRight : posterTranslateXLeft;
  }
  const bottomOpacity = useTransform(
    scrollYProgress,
    [startOuterTransition+0.05, endOuterTransition+0.05],
    [0, 1]
  );
  function mainCarMotionStyles(i:number) {
    return i === activeIndex
      ? { scale }
      : {
          opacity: outerItemsOpacity,
          x: outerTranslate(i),
        };
  }
  const nextItem = (index:number) => {
    return (activeIndex+1) === index ? true : false;
  };
  const prevItem = (index:number) => {
    return (activeIndex-1) === index ? true : false;
  };
                
  return (
    <motion.div className="bg-darker pb-8" animate={carouselVariant}>
      {/* big */}
      <div
        ref={carouselWrapperRef}
        className="overflow-clip mt-[-100vh] h-[300vh] relative"
      >
        <div className="h-screen sticky top-0 flex items-center">
          <div className="relative flex gap-5 mb-5 left-1/2 -translate-x-1/2">
            {items.map((item, i) => (
              <motion.div
                style={mainCarMotionStyles(i)}
                key={i}
                className={
                  `shrink-0 w-[60vw] aspect-video relative overflow-hidden ` +
                  (i === activeIndex ? 'z-10_' : '')
                }
              >
                {nextItem(i) && <Arrows mode={'next'} />}
                {prevItem(i) && <Arrows mode={'prev'} />}
                <img
                  className="w-full h-full object-cover rounded-2xl z-10"
                  src={item.poster}
                  alt={item.name}
                />
                {i === activeIndex && item.copy && (
                  <motion.div
                    variants={{
                      active: { opacity: 1, y: 0 },
                      inactive: { opacity: 0, y: 20 },
                    }}
                    className="absolute bottom-0 left-0 flex w-full flex-col items-center gap-4 p-5 text-lg text-white md:flex-row md:justify-between md:gap-0"
                  >
                    {item.copy.title && <p>{item.copy.title}</p>}
                    {item.copy.button && <Button>{item.copy.button}</Button>}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* small */}
      <motion.div
        variants={{
          active: { opacity: 1, y: 0 },
          inactive: { opacity: 0, y: 100 },
        }}
        transition={{ duration: 0.98 }}
        className="-mt-[calc((100vh-(300px*(16/9)))/2)] space-y-3 pt-4 md:-mt-[calc((100vh-(60vw*(9/16)))/2)]"
      >
        <SmallCarousel
          carId={'R1'}
          className="[--duration:35s]"
          items={randomItemsSet1}
          direction="left"
        />
        <SmallCarousel
          className="[--duration:60s]"
          carId={'R2'}
          items={randomItemsSet2}
          direction="right"
        />
      </motion.div>
    </motion.div>
  );
}
