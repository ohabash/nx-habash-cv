"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn } from "../animation/FadeIn";
import { Container } from "../layout/Container";
import { useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { useWindowSize } from '@nx-habash/react-lib';
import { experience } from "./timeline.data";


export const Timeline = () => {
  const screen = useWindowSize();
  const wrapperEl = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperEl,
    offset: ['start start', 'end start'],
  });
  const dialEl = useRef<HTMLDivElement>(null);
  const { scrollYProgress:dialScrollYProgress } = useScroll({
    target: dialEl,
    offset: ['start start', 'end start'],
  });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const titleScale = useTransform(scrollYProgress, [0, 0.1], [0.8, 1]);
  const copyScale = useTransform(
    dialScrollYProgress,
    [0, 0.5, 1],
    [0.6, 1, 0.6]
  );
  const skillsX = useTransform(scrollYProgress, [0.8, 1], [0, screen.width]);
  return (
    <div
      className="py-[15vh] [--borderW:8px] bg-darker__ dark-shadow__ overflow-clip w-full"
      ref={wrapperEl}
    >
      <Container className="font-semibold space-y-12 relative z-10 px-[7vw]_">
        <motion.h1
          className="sticky top-[8.9rem] text-dark text-[3.5rem]"
          style={{
            opacity: titleOpacity,
            // scale: titleScale
          }}
        >
          EXPERIENCE
        </motion.h1>
        {experience.map((item, index) => (
          <FadeIn key={'e-' + index}>
            <div className="flex border-b-[0px] border-subtle pb-16 ">
              {/* logo // company // time  */}
              <div className="flex pr-4 sticky top-14 self-start text-right">
                {/* company // Time */}
                <div className="flex items-center bg-gray-800 border-[var(--borderW)] border-white h-[6rem] border-r-0 mr-[-3rem] px-[5rem]">
                  <div>
                    <p className="font-bold">{item.date}</p>
                    <span className="text-lighten-7 font-medium">
                      {item.company}
                    </span>
                  </div>
                </div>

                {/* logo */}
                <div className="flex-shrink-0">
                  <div className="rounded-r-full overflow-clip bg-gray-800 border-[var(--borderW)] border-white border-l-0 p-2 flex items-center h-[6rem] w-[6rem]">
                    <Image
                      src={item.logo}
                      alt={`${item.company} logo`}
                      className="w-full h-full mr-4"
                    />
                  </div>
                </div>
              </div>

              {/* Copy */}
              <div className="flex-1">
                {/* title */}
                <div className="flex items-center mb-2">
                  <h3 className="text-lg font-semibold text-accent2">
                    {item.title}
                  </h3>
                </div>

                {/* desc */}
                <p className=" ">*{item.description}</p>

                {/* projects */}
                <div className="flex-1">
                  {item.projects?.map((project, idx) => (
                    <FadeIn scale={false} key={'p-' + idx} ref={dialEl}>
                      <motion.div
                        className="mt-4"
                        // style={{ scale: copyScale }}
                      >
                        <p className="font-bold text-accent3">{project.name}</p>
                        <p className="">{project.desc}</p>
                      </motion.div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </Container>
      <div className="blurrr bottom-[-14vh] absolute left-0 w-screen overflow-clip">
        <motion.div
          className="text-accent1 drop-shadow-lg shad font-black text-[9rem] pt-3 py-4"
          style={
            {
              // x: skillsX,
              // scale: skillsScale
            }
          }
        >
          <h1>SKILLS</h1>
        </motion.div>
      </div>
    </div>
  );
};