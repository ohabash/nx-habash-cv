import { AnimatePresence, easeInOut, motion } from "framer-motion";
import App from "next/app";
import { ReactNode, useState } from "react";


export interface Props {
  children: ReactNode;
  className?: string;
}

export function EnterDiv({ children, className }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  setTimeout(() => {
    setIsVisible(true);
  }, 1000);
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={className}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 5, ease: easeInOut },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 5, ease: easeInOut },
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
