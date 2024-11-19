import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ReactNode, RefObject, useEffect, useState } from "react";
import { useWindowSize } from 'react-use';

type Props = {
  target: RefObject<HTMLDivElement>;
  children: ReactNode;
  className?: string;
};

export const StickBottomMotion = ({ target, children, className }: Props) => {
  // track scroll progress
  const { scrollYProgress } = useScroll({
    target,
    offset: ['start start', 'end start'],
  });

  // get window size
  const window = useWindowSize();
  const isInView = useInView(target);
  const [active, setActive] = useState(scrollYProgress.get() > 0.2);
  const revealWhen = 0.1;
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const nw = latest > revealWhen;
      if (nw !== active) {
        setActive(nw);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, active]);

  // (TODO => start when 1/2 screen is visible)
  const start = 0.2;
  const end = start + 0.2;

  // scale in
  const scale = useTransform(scrollYProgress, [start, end], [-0.5, 1]);

  // fade in
  const opacity = useTransform(scrollYProgress, [start, end], [0, 0.75]);

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate={active ? 'visible' : 'hidden'}
      exit="hidden"
      variants={{
        hidden: { scale: 0.25, opacity: 0, y: 200 },
        visible: { 
          scale: 1, 
          opacity: 1, 
          y: 0, 
          transition: { 
            type: 'spring', 
            stiffness: 600, 
            damping: 20, 
            bounce: 0.5, 
            duration: 0.5 
          } 
        },
      }}
    >
      {children}
    </motion.div>
  );
};