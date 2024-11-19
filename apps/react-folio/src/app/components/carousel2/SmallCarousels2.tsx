import { motion, useInView } from 'framer-motion';
import { SmallCarousel2 } from './SmallCarousel2';
import { randomItemsSet1, randomItemsSet2 } from './carItems2';
import { useRef } from 'react';

<style>
  
</style>

export const SmallCarousels2 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <motion.div
      ref={ref}
      variants={{
        // active: { opacity: 1, y: 0 },
        // inactive: { opacity: 0, y: 1100 },
      }}
      // initial="inactive"
      // animate={isInView ? 'active' : 'inactive'}
      // transition={{ duration: 1, delay: 0.75 }}
      className="fadeInUp d6 -mt-[calc((100vh-(300px*(16/9)))/2)] space-y-3 pt-3 md:-mt-[calc((100vh-(60vw*(9/16)))/2)]"
    >
      <SmallCarousel2
        carId={'R1'}
        className="[--duration:35s]"
        items={randomItemsSet1}
        direction="right"
      />
      <SmallCarousel2
        className="[--duration:60s]"
        carId={'R2'}
        items={randomItemsSet2}
        direction="right"
      />
    </motion.div>
  );
};
