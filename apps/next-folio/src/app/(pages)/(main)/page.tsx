'use server';
import { Timeline } from '@/components/timeline/Timeline';
import Contact from '@/components/contact/Contact';
import { Carousel } from '@components/carousel/Carousel';
import { Hero } from '@components/hero/Hero';
import { InterviewMe } from '@components/interview-me/InterviewMe';

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
          <Timeline />
          {/* <TimelineAlt/> */}
        </div>
        <div className="car-wrapper relative h-full">
          <Carousel />
        </div>
      </main>
      <InterviewMe />
      <Contact/>
      <div className="p-8 text-center bg-darkest relative z-10 shadow-2xl border-t-2 border-darkBlue/20">
        <h2 className="text-darkBlue font-extrabold">Thank you.</h2>
        <p className="f max-w-screen">There is so much more planned &mdash; come back again.</p>
      </div>
    </>
  );
}
