'use server';
import { Hero } from '@components/hero/Hero';
import { Timeline } from '@components/timeline/Timeline';
import { Carousel } from '@components/carousel/Carousel';
import { InterviewMe } from '@components/interview-me/InterviewMe';
import { InterviewMeWrapper } from '../../components/interview-me/InterviewMeWrapper';

export default async function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <>
      <main id={'page-home'} className="relative h-full">
        <div className="bg-1 relative z-10 max-w-screen contain-paint">
          <Hero />
          <Timeline></Timeline>
        </div>
        <div className="car-wrapper relative h-full">
          <Carousel />
        </div>
        {/* <StickBottom mainWrapperRef={mainWrapperRef}></StickBottom> */}
      </main>
      {/* <InterviewMeWrapper> */}
        <InterviewMe />
      {/* </InterviewMeWrapper> */}
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div>
    </>
  );
}
