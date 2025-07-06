"use client";
import { motion, MotionValue, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import ContactLeft from "./ContactLeft";
import { ContactRight } from "./ContactRight";
import { useRef } from "react";

export const Contact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  return (
    <div id="contact" className="relative h-[220vh] bg-red_" ref={ref}>
      <div className="bg-darker h-screen sticky top-0">
        {' '}
        {/* Parent */}
        <div className="flex h-full">
          {' '}
          {/* Left */}
          <div className="flex relative overflow-clip">
            <Lines scrollYProgress={scrollYProgress} />
            <ContactLeft />
          </div>
          {/* right */}
          <div className="flex bg-darkest relative border-l-[1px] border-darkBlue time-glow max-sm:hidden">
            <ContactRight />
          </div>
        </div>
      </div>
    </div>
  );
};

interface LineProps {
  scrollYProgress: MotionValue<number>;
}
const Lines = ({ scrollYProgress }: LineProps) => {
  const lines = Array.from({ length: 100 }, (_, i) => i + 1);
  const springScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  // const scrollVelocity = useVelocity(scrollYProgress);
  // const smoothVelocity = useSpring(scrollVelocity, {
  //   damping: 200,
  //   stiffness: 100,
  //   restDelta: 0.001,
  // });
  const y = useTransform(springScroll, [0, 1], [0, -700], {
    clamp: true,
  });
  return (
    <motion.div
      className="absolute top-0 right-0 z-30 border-l-2 border-darkBlue backdrop-blur-sm"
      style={{ y }}
    >
      <div className="flex flex-col text-right pl-1 pr-2">
        {lines.map((line) => {
          return (
            <div key={line} className="flex-1 grow h-2 text-white/10">
              {line}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Contact;
