import { Hero } from '@components/hero/Hero';
import { Timeline } from '@components/timeline/Timeline';
import { Carousel } from '@components/carousel/Carousel';
import { InterviewMe } from '@components/interview-me/InterviewMe';

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <>
      <main id={'page-home'} className="relative h-full">
        <div className="bg-1 relative z-10">
          <Hero />
          <Timeline></Timeline>
        </div>
        <div className="car-wrapper relative h-full">
          <Carousel />
        </div>
        {/* <StickBottom mainWrapperRef={mainWrapperRef}></StickBottom> */}
      </main>
      <InterviewMe />
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div>
    </>
  );
}
