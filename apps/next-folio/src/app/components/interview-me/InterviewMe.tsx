"use client";
import { useScroll, useTransform } from 'framer-motion';
import React from 'react';
import { PiOpenAiLogo } from 'react-icons/pi';
import { Button } from '../button/Button';
import { ChatModal } from '../chat/Chat';
import { GoogleGeminiEffect } from '../ui/geminiEffect/GoogleGeminiEffect';

export function InterviewMe() {
  console.log(`🚀 => InterviewM1e => pathLengthFifth:`)
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.02, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);

  return (
    <div
      className="h-[400vh] -mt-8 z-[10] bg-darker w-full border-b-[1px] border-subtle rounded-md relative pt-52 overflow-clip"
      ref={ref}
    >
      <GoogleGeminiEffect
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
        title={<Title />}
        button={<InterviewMeTrigger className="md:mt-24" />}
        description={
          'An interactive AI bot that lets you ask questions about my professional experience, skills, and achievements.'
        }
      />
    </div>
  );
}

const Title = () => {
  return (
    <h1 className="glow-effect1 -mr-11">
      Interview Me
      <span className="p-2 text-xs bg-white text-black grad-dark rounded-md  relative ml-2 -top-12 glow-effect">
        Ai
      </span>
    </h1>
  );
}

export const InterviewMeTrigger = ({ className }: { className?: string }) => {
  return (
    <ChatModal className="z-30">
      <Button
        className={`text-darker backdrop-blur-[2px] bg-white/80 text-xl ${className}`}
        blur={true}
        icon={<PiOpenAiLogo />}
        iconClassName="bg-accent3 text-white"
      >
        Interview Me
      </Button>
    </ChatModal>
  );
};

