"use client"
import { Container } from '../layout/Container';
import { Swap } from '../swap/Swap';
const imgHero = '/images/vscode-coffee.webp';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import './hero.scss';

export function Hero() {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: videoContainerRef,
    offset: ['start start', 'end end'],
  });
  const imgOpacity = useTransform(scrollYProgress, [0.2, 0.1, 1], [1, 1, 0]);
  const imgScale = useTransform(scrollYProgress, [-0.2, 0.5, 1], [1, 1.3, 1.5]);
  const imgRotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 5, 10]);
  // const copyScale = useTransform(scrollYProgress, [0.2, 0.1, 1], [1, 1, 1.3]);
  const copyOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.5],
    [1, 1, 0]
  );
  // const copyRotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, -5, -10]);
  // const line2Translate = useTransform(scrollYProgress, [0, 1], [0, -3000]);
  // const line1Translate = useTransform(scrollYProgress, [0, 1], [0, 3000]);
  const heroHeight = 2 * 100 + 'vh';
  return (
    <div className="bg-1 relative -mt-[var(--header-2-height)]">
      {/* bg image */}
      <motion.div
        className={`absolute -top-[--header-height] left-0 z-10 w-full h-[${heroHeight}] bg-red`}
        ref={videoContainerRef}
        style={{ opacity: imgOpacity }}
      >
        <motion.img
          style={{
            scale: imgScale,
            rotate: imgRotate,
          }}
          className=" object-cover h-[100vh] w-full sticky top-0"
          src={imgHero}
          alt="Omar Habash Hero"
        />
      </motion.div>

      {/* Alt Copy Animation */}
      <Container className="relative z-10 h-[--hero-height]">
        <motion.div
          className="flex flex-col justify-end items-start h-full"
          style={{
            opacity: copyOpacity,
            // scale: copyScale,
            // rotate: copyRotate
          }}
        >
          <h1 className="text-3xl mb-10">
            <span className="text-[2rem]">
              <Swap
                words={['User', 'Developer', 'Editor', 'Employee']}
                className={'text-accent2'}
              />{' '}
              Experiences.
            </span>
            <br />
            Fullstack Software Engineer{' '}
          </h1>
        </motion.div>
      </Container>
    </div>
  );
}


