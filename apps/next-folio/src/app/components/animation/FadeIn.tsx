import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ReactNode, RefObject, useRef } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  // start loc can be a number between 0 100
  start?: number;
  delay?: number;
  scale?: boolean;
  ref?: RefObject<HTMLDivElement>;
};

export const FadeIn = ({ children, className, scale, start = 75, delay=0, ref }: Props) => {
  const wrapperEl = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapperEl, { amount: 0.5 });
  // const { scrollYProgress } = useScroll({
  //   target: wrapperEl,
  //   offset: ['start start', 'end start'],
  // });
  // const copyScale = useTransform(scrollYProgress, [0, 0.1], [0.8, 2]);
  const low = scale ? 0.5 : 1;
  return (
    <div className="h-full">
      <motion.div
        ref={wrapperEl}
        initial={{ opacity: 0, y: start, scale: low }}
        animate={{ scale: isInView ? 1 : low }}
        whileInView={{ opacity: 1, y: 1 }}
        viewport={{ margin: `100% 0px -120px 0px` }}
        transition={{
          ease: 'easeOut',
          duration: 0.45,
          delay: delay,
        }}
        className={className}
        style={{
          // scale: copyScale
          transformOrigin: 'left center',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}