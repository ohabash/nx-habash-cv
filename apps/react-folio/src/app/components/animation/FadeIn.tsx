import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  // start loc can be a number between 0 100
  start?: number;
}

export const FadeIn = ({ children, className, start = 0 }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: start }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: `100% 0px -150px 0px` }}
      transition={{ ease: 'easeOut', duration: 0.4 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}