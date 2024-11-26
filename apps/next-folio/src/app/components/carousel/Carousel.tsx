"use client";
import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import { skills } from './skills.data';
import { Arrows2 } from './Arrows2';
// eslint-disable-next-line @nx/enforce-module-boundaries
import imgEnd from '@public/img/theend.png';
import { SmallCarousels2 } from './SmallCarousels2';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { useWindowSize } from '@nx-habash/react-lib';

const DRAG_BUFFER = 1;
const GAP_WIDTH = 25; // Assuming `gap-8` is 32px (2rem)

const SPRING_OPTIONS = {
  type: 'spring',
  mass: 2,
  stiffness: 400,
  damping: 50,
};

export const Carousel = () => {
  const screen = useWindowSize();
  const [imgIndex, setImgIndex] = useState(1);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);

  const dragX = useMotionValue(0);
  // dragX.set(0);

  const imageWidth = 0.58 * screen.width; // 60vw for each image
  const containerOffset = (screen.width - imageWidth) / 2;

 const calculateTranslateX = () => {
   // Width occupied by each item including the gap
   const totalItemWidth = imageWidth + GAP_WIDTH;

   // Calculate cumulative offset for the active item
   const cumulativeWidth = imgIndex * totalItemWidth;

   // Center offset calculation
   const centeredOffset = screen.width / 2 - imageWidth / 2;

   // Final translateX calculation
   const translateX = -cumulativeWidth + centeredOffset;

   return translateX - GAP_WIDTH + 5;
 };

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && imgIndex < skills.length - 1) {
      setImgIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((pv) => pv - 1);
    }
  };

  return (
    <div className="overflow-clip h-full" ref={ref}>
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        onDragEnd={onDragEnd}
        animate={{
          translateX: calculateTranslateX(),
        }}
        transition={SPRING_OPTIONS}
        className="relative _bg-purple-600 overflow-clip_"
      >
        <Images
          imageWidth={imageWidth}
          imgIndex={imgIndex}
          setImgIndex={setImgIndex}
        />
      </motion.div>
      <motion.div className='relative z-[11]' style={{opacity}}>
        <SmallCarousels2 containerRef={ref} />
      </motion.div>
    </div>
  );
};










type ImageProps = {
  imgIndex: number;
  imageWidth: number;
  setImgIndex: (value: SetStateAction<number>) => void;
};

const Images = ({ imgIndex, imageWidth, setImgIndex }: ImageProps) => {
  const nextItem = (index: number) => {
    return imgIndex + 1 === index ? true : false;
  };
  const prevItem = (index: number) => {
    return imgIndex - 1 === index ? true : false;
  };

  // ref
  const carouselWrapperRef = useRef<HTMLDivElement>(null);

  // // wheel
  // const handleScroll = (e: any) => {
  //   if (e.deltaX > 0 && imgIndex < items.length - 1) {
  //     setImgIndex((prevIndex) => prevIndex + 1); // Scroll down/right
  //   } else if (e.deltaX < 0 && imgIndex > 0) {
  //     setImgIndex((prevIndex) => prevIndex - 1); // Scroll up/left
  //   }
  // };

  // useEffect(() => {
  //   const container = carouselWrapperRef.current;
  //   if (container) {
  //     container.addEventListener('wheel', handleScroll); // Add scroll event listener
  //     return () => container.removeEventListener('wheel', handleScroll); // Clean up event listener
  //   }
  // }, [imgIndex]);

  // scale:
  const { scrollYProgress } = useScroll({
    target: carouselWrapperRef,
    offset: ['start start', 'end start'],
  });
  const { width, height } = useWindowSize();
  const startOuterTransition = 0.6;
  const endOuterTransition = 0.7;
  const maximumScale = useMemo(() => {
    const windowYRatio = height / width;
    const xScale = 1.66667;
    const yScale = xScale * (16 / 9) * windowYRatio;
    return Math.max(xScale, yScale);
  }, [width, height]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7],
    [maximumScale * 1.1, maximumScale, 1]
  );

  const outerItemsOpacity = useTransform(
    scrollYProgress,
    [startOuterTransition, endOuterTransition],
    [0, 1]
  );
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
  const copyTranslateY = useTransform(scrollYProgress, [0, 0.6], [200, 0]);
  const copyOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  function outerTranslate(i: number) {
    return i > imgIndex ? posterTranslateXRight : posterTranslateXLeft;
  }
  const translateY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  function mainCarMotionStyles(i: number) {
    return i === imgIndex
      ? {
          scale,
          y: translateY,
          copyOpacity: 1
        }
      : {
          opacity: outerItemsOpacity,
          x: outerTranslate(i),
        };
  }
  const startOver = () => setImgIndex(0);

  const pinnedSkills = skills.filter((i) => i.pinned);

  return (
    <div
      ref={carouselWrapperRef}
      className="overflow-clip_ mt-[-100vh] h-[300vh] relative bg-yellow_"
    >
      <div className="h-screen sticky top-0 flex items-center ">
        <div className="flex items-center cursor-grab active:cursor-grabbing gap-8_ relative gap-5__ mb-5">
          {pinnedSkills.map((item, idx) => {
            return (
              <motion.div
                key={idx}
                style={{
                  backgroundImage: `url(${item.poster})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: imageWidth,
                  marginLeft: GAP_WIDTH,
                  // marginRight: GAP_WIDTH/2,
                  ...mainCarMotionStyles(idx),
                }}
                animate={
                  {
                    // scale: imgIndex === idx ? 1 : 1,
                  }
                }
                transition={SPRING_OPTIONS}
                className={
                  `aspect-video mx-8_ shrink-0 rounded-2xl object-cover bg-black relative overflow-clip ` +
                  (imgIndex === idx ? '' : '')
                }
              >
                <motion.div
                  className={''}
                  style={{
                    y: copyTranslateY,
                    opacity: copyOpacity,
                  }}
                >
                  <div className="mx-10 my-8">
                    <div className="initials mix-blend-screen montserrat font-[900] hidden">
                      <span className="text-5xl mix-blend-screen text-accent1 z-20 relative1">
                        O
                      </span>
                      <span className="text-5xl mix-blend-screen relative z-30 text-gray-400 -ml-5 ">
                        H
                      </span>
                    </div>
                    <div className="bg-darker/80 inline-block font-bold uppercase rounded-md py-2 px-5 text-center">
                      {item.name}
                    </div>
                  </div>
                </motion.div>
                {/* <h1 className={imgIndex === idx ? 'text-blue' : ''}>{idx}</h1> */}
                {nextItem(idx) && (
                  <Arrows2
                    onClick={(e) => setImgIndex(imgIndex + 1)}
                    mode={'next'}
                    className={`fadeInRight d3`}
                  />
                )}
                {prevItem(idx) && (
                  <Arrows2
                    onClick={(e) => setImgIndex(imgIndex - 1)}
                    mode={'prev'}
                    className={`fadeInLeft d3`}
                  />
                )}
              </motion.div>
            );
          })}
          <div
            style={{ width: imageWidth / 3 }}
            className={twMerge(
              'ml-5 aspect-video mx-8_ shrink-0 rounded-2xl object-cover bg-white_ relative overflow-clip text-center',
              imgIndex === pinnedSkills.length - 1 ? 'z-30' : '-z-10'
            )}
          >
            <Image className="brightness-200" src={imgEnd} alt="" />
            <p
              onClick={startOver}
              className="f cursor-pointer hover:text-white"
            >
              Start Over
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
