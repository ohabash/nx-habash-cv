import { useRef } from 'react';
import { Carousel2 } from '../../components/carousel2/Carousel2';
import { SmallCarousels2 } from '../../components/carousel2/SmallCarousels2';
import { InterviewMe } from '../../components/interview-me/InterviewMe';
import { SkillsCar } from '../../components/skills-carousel/SkillsCar';
import { StickBottom } from '../../components/stick-bottom/StickBottom';
import { Timeline } from '../../components/timeline/Timeline';
import { Hero } from './../../components/hero/Hero';


export function Home() {
  // bottom animate 
  const mainWrapperRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <main id={'page-home'} className="relative h-full" ref={mainWrapperRef}>
        <div className="bg-1 relative z-10">
          <Hero />
          <Timeline></Timeline>
        </div>
        <Carousel2 />
        <SmallCarousels2 />
        <SkillsCar></SkillsCar>
        <StickBottom mainWrapperRef={mainWrapperRef}></StickBottom>
      </main>
      <InterviewMe />
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div>
    </>
  );
}
