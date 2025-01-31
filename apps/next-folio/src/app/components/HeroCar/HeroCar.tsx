'use client';
import {
  motion,
  MotionValue,
  useScroll,
  useTransform
} from 'framer-motion';
import { SetStateAction, useMemo, useRef, useState } from 'react';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useWindowSize } from '@nx-habash/react-lib';
import { heroItem, HeroItem } from './HeroCar.data';
import "./HeroCar.scss";
import Link from 'next/link';

const SPRING_OPTIONS = {
  type: 'spring',
  mass: 2,
  stiffness: 400,
  damping: 50,
};

export const HeroCar = () => {
  // ref
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: itemScrollYProg } = useScroll({
    target: containerRef as any,
    offset: ['start start', 'end start'],
  });
  const height = useTransform(
    itemScrollYProg,
    [0, 0.6, 0.8],
    ['100%', '100%', '0%'],
    {
      clamp: false,
    }
  );
  return (
    <motion.div
      className="w-full z-30 relative"
      ref={containerRef}
      style={{ height }}
    >
      <div className="overflow-clip h-full">
        <div className="relative">
          <Item />
        </div>
      </div>
    </motion.div>
  );
};


/*
 
  /$$   /$$                            
 |__/  | $$                            
  /$$ /$$$$$$    /$$$$$$  /$$$$$$/$$$$ 
 | $$|_  $$_/   /$$__  $$| $$_  $$_  $$
 | $$  | $$    | $$$$$$$$| $$ \ $$ \ $$
 | $$  | $$ /$$| $$_____/| $$ | $$ | $$
 | $$  |  $$$$/|  $$$$$$$| $$ | $$ | $$
 |__/   \___/   \_______/|__/ |__/ |__/
*/

const Item = () => {
  const item = heroItem;

  // ref
  const ItemWrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: itemScrollYProg } = useScroll({
    target: ItemWrapperRef,
    offset: ['start start', 'end start'],
  });

  // value bank
  const screen = useWindowSize();
  const { Scale, height } = new (class Config {
    height = '150vh';
    start = 0;
    Scale = {
      start: this.start,
      end: this.start + 0.3,
      final: 0.83,
    };
  })();

  // scale
  const scale = useTransform(
    itemScrollYProg,
    [0, Scale.start, Scale.end],
    [1.025, 1.025, Scale.final]
  );
  return (
    <div
      ref={ItemWrapperRef}
      className={`mt-[-100vh]_ -mt-9 relative`}
      style={{ height }}
    >
      <div className="h-screen sticky top-0 bg-darkBlue_">
        <motion.div
          style={{
            backgroundImage: `url(${item.poster})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            ...{
              scale,
              // y: translateY,
              copyOpacity: 1,
            },
          }}
          animate={
            {
              // scale: imgIndex === idx ? 1 : 1,
            }
          }
          transition={SPRING_OPTIONS}
          className={`rounded-2xl object-cover bg-black relative overflow-clip w-full h-full`}
        >
          {/* curtain */}
          <Curtain itemScrollYProg={itemScrollYProg} item={item} />

        </motion.div>
      </div>
    </div>
  );
};






/*
 
                                  /$$               /$$          
                                 | $$              |__/          
   /$$$$$$$ /$$   /$$  /$$$$$$  /$$$$$$    /$$$$$$  /$$ /$$$$$$$ 
  /$$_____/| $$  | $$ /$$__  $$|_  $$_/   |____  $$| $$| $$__  $$
 | $$      | $$  | $$| $$  \__/  | $$      /$$$$$$$| $$| $$  \ $$
 | $$      | $$  | $$| $$        | $$ /$$ /$$__  $$| $$| $$  | $$
 |  $$$$$$$|  $$$$$$/| $$        |  $$$$/|  $$$$$$$| $$| $$  | $$
  \_______/ \______/ |__/         \___/   \_______/|__/|__/  |__/ 
*/
interface CurtainProps {
  itemScrollYProg: MotionValue<number>;
  item: HeroItem;
}
const Curtain = ({itemScrollYProg, item}: CurtainProps) => {
  const y = useTransform(
    itemScrollYProg,
    [0, 0.4, 0.8],
    [0, 10, -1000],
    {
      clamp: false,
    }
  );
  const height = useTransform(
    itemScrollYProg,
    [0, 0.6],
    ['100%', '0%'],
    {
      clamp: false,
    }
  )
  return (
    <motion.div
      className="z-10 absolute bottom-0 left-0 w-full h-full_ backdrop-blur-md bg-darker/10 min-h-fit"
      style={
        {
          // height
        }
      }
    >
      <div className="px-16 py-14">
        <div className="level">
          <div className="level-left">
            <div className="title-block">
              <h4 className="font-bold text-yellow -mb-2">
                Senior Software Engineer
              </h4>
              <h3 className="font-bold">OMAR HABASH</h3>
            </div>
          </div>
          <div className="level-right a-menu">
            <Link href="#experience" className='link'>Experience</Link>
            <Link href="#skills" className='link'>Skills</Link>
            <Link href="#interview-me" className='link'>Interview Me</Link>
            <Link href="#contact" className='link'>Contact</Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
    