"use client"
import Image from 'next/image';
import './hero.scss';
import { ReactNode, useRef } from 'react';
import { motion, MotionValue, useInView, useScroll, useTransform } from 'framer-motion';
import { Container } from '../layout/Container';
import { Swap } from '../swap/Swap';
const imgHero = '/images/vscode-coffee.webp';

export const Hero2 = () => {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: videoContainerRef,
    offset: ['start start', 'end end'],
  });
  const imgOpacity = useTransform(scrollYProgress, [0.2, 0.1, 1], [1, 1, 0]);
  const copyOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.5], [1, 1, 0]);
  const mainScale = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [1, 1, 0.85, 0.85]);
  return (
    <motion.div className="bg-1 relative -mt-[var(--header-2-height)] overflow-clip rounded-2xl" style={{
      scale: mainScale,
      transformOrigin: 'top center',
    }}>
      {/* BACKGROUND */}
      <motion.div
        className={`absolute -top-[--header-height] left-0 z-10 w-full h-[300vh] bg-red`}
        ref={videoContainerRef}
        style={{ opacity: imgOpacity }}
      >
        <motion.img
          style={{}}
          className=" object-cover h-[100vh] w-full sticky top-0"
          src={imgHero}
          alt="Omar Habash Hero"
        />
      </motion.div>

      <Overlay scrollYProgress2={scrollYProgress}>
        <h1 className="text-3xl mb-10">
          another one
        </h1>
      </Overlay>
      
      <Overlay scrollYProgress2={scrollYProgress}>
        <h1 className="text-3xl mb-10">
          another two
        </h1>
      </Overlay>
    </motion.div>
  );
}


interface OverlayProps {
  children: ReactNode;
  scrollYProgress2: MotionValue<number>;
}
const Overlay = ({ scrollYProgress2, children }: OverlayProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const copyOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8], [0, 1, 1]);
  const isInView = useInView(ref, { once: true });
  return (
    <div className="h-[100vh]_ relative">
      <Container className="z-10 h-[--hero-height]">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`flex flex-col justify-end items-start h-full ${isInView}`}
          // style={{
          //   opacity: copyOpacity, // scale: copyScale,
          //   // rotate: copyRotate
          // }}
        >
          {children}
        </motion.div>
      </Container>
    </div>
  );
};
  