import { Carousel } from '../../components/carousel/Carousel';
import { Carousel2 } from '../../components/carousel2/Carousel2';
import { SmallCarousels2 } from '../../components/carousel2/SmallCarousels2';
import { VerticalList } from '../../components/vertical-list/VerticalList';
import { Hero } from './../../components/hero/Hero';

export function Home() {
  return (
    <>
      <div className="bg-1 relative z-10">
        <Hero />
        <VerticalList></VerticalList>
      </div>
      {/* <div>columns</div> */}
      {/* <Carousel /> */}
      {/* <div className="min-h-screen"></div> */}
      <Carousel2/>
      <SmallCarousels2/>
      <div className="min-h-screen"></div>
    </>
  );
}
