"use client";
import authPoster from '@public/img/auth_poster.webp'; // https://chatgpt.com/c/672d7ac4-cfe0-800d-ae43-e10991fa9cda
import { easeInOut, motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { useDragControls } from 'framer-motion';

type Props = {
  // scrollContainer: RefObject<HTMLDivElement>;
};

export const AuthAside = () => {
  const controls = useDragControls();
  const h = '810px';
  const w = '890px';
  const styles = {
    '--img-width': w,
    '--img-height': h,
  } as React.CSSProperties;
  // const scrollContainer = useRef<HTMLDivElement>(null);
  // const { scrollYProgress } = useScroll({
  //   target: scrollContainer,
  //   offset: ['start start', 'end start'],
  // });
  // const width = useTransform(scrollYProgress, [0.1, 0.7], ['2%', '100%']);
  const width = '20px';
  const blurControl = {
    initial:{ width: '100%' },
    animate:{
      width: "20px",
      transition: { duration: 1.5, ease: easeInOut },
    },
    exit:{
      width: "100%",
      transition: { duration: 1.5, ease: easeInOut },
    }
  };
  return (
    <motion.div
      className=""
      // drag
      // dragControls={controls}
      style={styles}
    >
      <div className={`img-wrapper`}>
        {/* <motion.div
          className='z-20's
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 1.5, ease: easeInOut },
          }}
          exit={{
            opacity: 0,
            scale: 1,
            transition: { duration: 1.5, ease: easeInOut },
          }}
        > */}
          <Image
            src={authPoster}
            alt="All developers go to heaven."
            className={''}
          ></Image>
        {/* </motion.div> */}
        <motion.div
          className="img-blur"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 1.5, ease: easeInOut },
          }}
          exit={{
            opacity: 0,
            scale: 1,
            transition: { duration: 1.5, ease: easeInOut },
          }}
        ></motion.div>

        <motion.div
          {...blurControl}
          style={{ width }}
          className="b b1 w-[20px]_"
        ></motion.div>
        <motion.div
          style={{ width }}
          className="b b2 w-[20px]_"
          {...blurControl}
        ></motion.div>
        <div style={{ height: width }} className="b b3 h-[20px]_"></div>
        <div style={{ height: width }} className="b b4 h-[20px]_"></div>
      </div>
    </motion.div>
  );
};
