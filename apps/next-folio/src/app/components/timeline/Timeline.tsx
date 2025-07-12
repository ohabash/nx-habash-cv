"use client";

import { allData } from "@/data";
import { useWindowSize } from '@nx-habash/react-lib';
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { experience } from "../../data/data-experience";
import { skills } from "../../data/data-skills";
import { FadeIn } from "../animation/FadeIn";
import { Container } from "../layout/Container";

import Image from "next/image";
import { useCopilotReadable } from "@copilotkit/react-core";
import { useCopilotChatSuggestions } from "@copilotkit/react-ui";
import { useCopilotActions } from "../copilotKit/actions.hook";

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
  const copyMarginTop = useTransform(
    dialScrollYProgress,
    [0, 0.5, 1],
    [0, 100, 0]
  );
  const skillsX = useTransform(scrollYProgress, [0.8, 1], [0, screen.width]);
  useCopilotChatSuggestions(
    { instructions: 'Suggest the most relevant next interview question about your skills, experience, projects, or things about you.' },
    [allData]
  );
  useCopilotReadable({
    description: 'Information about Omar Habash',
    value: JSON.stringify(allData),
  });
  return (
    <div
      className="pb-[15vh] [--borderW:8px] bg-darker__ dark-shadow__ overflow-clip w-full"
      ref={wrapperEl}
      id="experience"
    >
      <Container className="font-semibold space-y-12 relative z-10 px-[7vw]_">
        <motion.h1
          className="sticky top-[8.9rem] text-dark text-[3.5rem] max-lg:top-[10.5rem] max-lg:text-[2.5rem] max-md:text-[2rem]"
          style={{
            opacity: titleOpacity,
            // scale: titleScale
          }}
        >
          EXPERIENCE
        </motion.h1>
        {experience.map((item, index) => (
          <FadeIn key={'e-' + index}>
            <div className="flex border-b-[0px] border-subtle pb-16">
              {/* logo // company // time  */}
              <div className="flex pr-4 sticky top-14 max-lg:top-20 self-start text-right max-md:text-left">
                {/* company // Time */}
                <div className="flex items-center bg-gray-800 border-[var(--borderW)] border-white h-[6rem] border-r-0 mr-[-3rem] px-[5rem] max-md:hidden ">
                  <div>
                    <p className="font-bold max-[1000px]:hidden">{item.date}</p>
                    <p className="font-bold min-[1000px]:hidden">{item.shortDate}</p>
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
                <p className=" ">{item.description}</p>

                {/* projects */}
                <div className="flex-1">
                  {item.projects?.map((project, idx) => (
                    <FadeIn scale={false} key={'p-' + idx} ref={dialEl}>
                      <motion.div
                        className="mt-4_"
                        style={{ marginTop: copyMarginTop }}
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
    </div>
  );
};