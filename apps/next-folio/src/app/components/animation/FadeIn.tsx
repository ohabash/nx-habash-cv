import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  // start loc can be a number between 0 100
  start?: number;
  delay?: number;
}

export const FadeIn = ({ children, className, start = 75, delay=0 }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: start }}
      whileInView={{ opacity: 1, y: 1 }}
      viewport={{ margin: `100% 0px -120px 0px` }}
      transition={{ ease: 'easeOut', duration: 0.4, delay: delay}}
      className={className}
    >
      {children}
    </motion.div>
  );
}