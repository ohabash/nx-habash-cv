import Contact from '@/components/contact/Contact';
import { HeroCar } from '@/components/HeroCar/HeroCar';
import { Timeline } from '@/components/timeline/Timeline';
import { Carousel } from '@components/carousel/Carousel';
import { InterviewMe } from '@components/interview-me/InterviewMe';
import { headers } from 'next/headers';

export default async function Index() {
  const userAgent = (await headers()).get('user-agent');
   const isMobile = userAgent && /Mobile|Android|iPhone/i.test(userAgent);
   console.log(`🚀 => Index => isMobile:`, isMobile)
  
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <>
      {/* <main id={'page-home'} className="relative h-full"> */}
      <HeroCar />
      <div className="bg-1 relative z-10 max-w-screen contain-paint">
        <Timeline />
      </div>
      <div id="skills" className="car-wrapper relative h-full">
        <Carousel />
      </div>
      <InterviewMe />
      <Contact />
      {/* </main> */}
      <div className="p-8 text-center bg-darkest relative z-10 shadow-2xl border-t-2 border-darkBlue/20">
        <h2 className="text-darkBlue font-extrabold">Thank you.</h2>
        <p className="f max-w-screen">More planned &mdash; come back again.</p>
      </div>
    </>
  );
}
