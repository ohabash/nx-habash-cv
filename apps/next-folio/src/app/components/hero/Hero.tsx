"use client"
import { Container } from '../layout/Container';
import { Swap } from '../swap/Swap';
const imgHero = '/images/vscode-coffee.webp';
// import imgHero from '../../assets/images/vscode-coffee.webp';
import './hero.scss';
import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export function Hero() {
  const altAnimation = true;
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: videoContainerRef,
    offset: ['start start', 'end end'],
  });
  const imgOpacity = useTransform(scrollYProgress, [0.2, 0.1, 1], [1, 1, 0]);
  const imgScale = useTransform(scrollYProgress, [-0.2, 0.5, 1], [1, 1.3, 1.5]);
  const imgRotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 5, 10]);
  const copyScale = useTransform(scrollYProgress, [0.2, 0.1, 1], [1, 1, 1.3]);
  const copyOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.5],
    [1, 1, 0]
  );
  const copyRotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, -5, -10]);
  const line2Translate = useTransform(scrollYProgress, [0, 1], [0, -3000]);
  const line1Translate = useTransform(scrollYProgress, [0, 1], [0, 3000]);

  return (
    <div className="bg-1 relative -mt-[var(--header-2-height)]">
      {/* bg image */}
      <motion.div
        className="absolute -top-[--header-height] left-0 z-10 w-full h-[200vh] bg-red "
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

      {/* copy over image */}
      {!altAnimation && (
        <Container className="relative z-10 h-[--hero-height]">
          <motion.div className=" h-full1" style={{ opacity: copyOpacity }}>
            <h1 className="text-4xl">
              <motion.div style={{ translateX: line1Translate, originZ: 0.1 }}>
                {' '}
                Complex problems. <br />{' '}
              </motion.div>
              <motion.div style={{ translateX: line2Translate, originZ: 0.1 }}>
                <Swap
                  words={['Simple', 'Intuitive', 'Impactful', 'Innovative']}
                  className={'text-accent2'}
                />{' '}
                UX.
              </motion.div>
            </h1>
          </motion.div>
        </Container>
      )}

      {/* Alt Copy Animation */}
      {altAnimation && (
        <Container className="relative z-10 h-[--hero-height]">
          <motion.div
            className="flex flex-col justify-end items-start h-full"
            style={{
              opacity: copyOpacity,
              // scale: copyScale,
              // rotate: copyRotate
            }}
          >
            <h1 className="text-4xl mb-20">
              Complex problems. <br />
              <Swap
                words={['Simple', 'Intuitive', 'Impactful', 'Innovative']}
                className={'text-accent2'}
              />
              UX.
            </h1>
          </motion.div>
        </Container>
      )}
    </div>
  );
}
