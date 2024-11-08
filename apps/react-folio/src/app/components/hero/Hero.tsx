import { Container } from "../layout/Container";
import { Swap } from "../swap/Swap";
import imgHero from "../../../assets/images/vscode-coffee.webp";
import "./hero.scss";
import { useRef } from "react";
import { useScroll, useTransform, motion } from 'framer-motion';

export function Hero() {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({
    target: videoContainerRef,
    offset: ['start start', 'end end'],
  });
  const imgOpacity = useTransform(scrollYProgress, [0.2, 0.1, 1], [1, 1, 0]);
  const imgScale = useTransform(scrollYProgress, [0.2, 0.1, 1], [1, 1, 1.1]);
  const copyOpacity = useTransform(scrollYProgress, [-0.5, 0.05, 0.5], [1, 1, 0]);

  return (
    <div className="bg-1 h-[300vh] relative -mt-[var(--header-2-height)]">
      {/* bg image */}
      <motion.div
        className="absolute -top-[--header-height] left-0 z-10 w-full h-[200vh] bg-red "
        ref={videoContainerRef}
        style={{ opacity: imgOpacity }}
      >
        <motion.img
          style={{ scale: imgScale }}
          className=" object-cover h-[100vh] w-full sticky top-0"
          src={imgHero}
          alt="Omar Habash Hero"
        />
      </motion.div>

      {/* copy over image */}
      <Container className="relative z-10 h-[--hero-height]">
        <motion.div
          className="flex flex-col justify-end items-start h-full"
          style={{ opacity: copyOpacity, scale: imgScale }}
        >
          <h1 className="text-4xl mb-20">
            Complex problems. <br />
            <Swap
              words={['Simple', 'Intuitive', 'Impactful', 'Innovative']}
              className={'text-accent1'}
            />
            UX.
          </h1>
        </motion.div>
      </Container>
    </div>
  );
}
  