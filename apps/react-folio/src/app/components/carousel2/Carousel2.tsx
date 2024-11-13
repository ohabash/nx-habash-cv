import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import { useWindowSize } from 'react-use';
import { items } from './carItems2';
import { Arrows2 } from './Arrows2';
import imgEnd from '../../../../public/theend.png';

const DRAG_BUFFER = 50;
const GAP_WIDTH = 25; // Assuming `gap-8` is 32px (2rem)

const SPRING_OPTIONS = {
  type: 'spring',
  mass: 2,
  stiffness: 400,
  damping: 50,
};

export const Carousel2 = () => {
  const screen = useWindowSize();
  const [imgIndex, setImgIndex] = useState(2);

  const dragX = useMotionValue(0);
  // dragX.set(0);

  const imageWidth = 0.6 * screen.width; // 60vw for each image
  const containerOffset = (screen.width - imageWidth) / 2;

 const calculateTranslateX = () => {
   // Width occupied by each item including the gap
   const totalItemWidth = imageWidth + GAP_WIDTH;

   // Total width of all items in the carousel
   const totalCarouselWidth = items.length * totalItemWidth;

   // Calculate cumulative offset for the active item
   const cumulativeWidth = imgIndex * totalItemWidth;

   // Center offset calculation
   const centeredOffset = screen.width / 2 - imageWidth / 2;

   // Adjust the translateX to center the active item, ensuring it stays within bounds
   const maxTranslateX = 0; // At the start, the carousel should not translate positively
   const minTranslateX = -(totalCarouselWidth - screen.width); // Ensures it doesn’t overscroll at the end

   // Final translateX calculation with bounds
   const translateX = Math.max(
     Math.min(-cumulativeWidth + centeredOffset, maxTranslateX),
     minTranslateX
   );

   return translateX - GAP_WIDTH + 5;
 };

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && imgIndex < items.length - 1) {
      setImgIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((pv) => pv - 1);
    }
  };

  return (
    <div className="overflow-clip">
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          // x: dragX,
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


  // scale:
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
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
  function outerTranslate(i: number) {
    return i > imgIndex ? posterTranslateXRight : posterTranslateXLeft;
  }
  function mainCarMotionStyles(i: number) {
    return i === imgIndex
      ? { scale }
      : {
          opacity: outerItemsOpacity,
          x: outerTranslate(i),
        };
  }

  return (
    <div
      ref={carouselWrapperRef}
      className="overflow-clip_ mt-[-100vh] h-[300vh] relative bg-yellow_"
    >
      <div className="h-screen sticky top-0 flex items-center ">
        <div className="flex items-center cursor-grab active:cursor-grabbing gap-8_ relative gap-5__ mb-5">
          {items.map((item, idx) => {
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
                animate={{
                  // scale: imgIndex === idx ? 1 : 1,
                }}
                transition={SPRING_OPTIONS}
                className={
                  `aspect-video mx-8_ shrink-0 rounded-2xl object-cover bg-black relative overflow-clip ` +
                  (imgIndex === idx ? '' : '')
                }
              >
                <h1 className={imgIndex === idx ? 'text-blue' : ''}>{idx}</h1>
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
        </div>
      </div>
    </div>
  );
};
