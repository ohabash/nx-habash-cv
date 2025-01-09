import React, { ReactNode, RefObject, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScroll } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  // start loc can be a number between 0 100
  start?: number;
  delay?: number;
  scale?: boolean;
  refPassed: RefObject<HTMLDivElement>;
};

const ScrollScalingDiv = ({ children, className, scale, start = 75, delay=0, refPassed }: Props) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.5, // Trigger animation when 50% of the div is in view
  });

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (inView) {
      controls.start({ scale: 1 });
    } else {
      controls.start({ scale: 0.5 });
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{ scale: 0.5 }}
      transition={{ duration: 0.5 }}
      style={{
        width: '200px',
        height: '200px',
        backgroundColor: 'lightblue',
        margin: '200px auto',
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollScalingDiv;