'use client';
import Image from 'next/image';
import './hero.scss';

// icons
import imgNodeJs from './img/nodejs.png';
import imgAngularLogo from './img/angular.png';
import imgMongo from './img/mongo.webp';
import imgTypescriptLogo from './img/typescript.png';

// gradients1
import imgGradientBlue from './img/gradient-blue.png';
import imgGradientOrange from './img/gradient-orange.png';
import imgGradientLime from './img/gradient-lime.png';
import imgGradientRed from './img/gradient-red.png';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Component <Hero/>
export const Hero = () => {
  const railHeight = 500;
  const railWidth = 5582;
  const icons = [
    // {
    //   name: 'MongoDB',
    //   gradient: imgGradientLime,
    //   image: imgMongo,
    //   selector: 'pro',
    // },
    // {
    //   name: 'NodeJs',
    //   gradient: imgGradientLime,
    //   image: imgNodeJs,
    //   selector: 'pro',
    // },
    {
      name: 'Typescript',
      gradient: imgGradientBlue,
      image: imgTypescriptLogo,
      selector: 'pro',
    },
    {
      name: 'Angular',
      gradient: imgGradientRed,
      image: imgAngularLogo,
      selector: 'core',
    },
  ];
  const railObb =
    'M0.037,0 c-0.049,-0.022,-0.049,1,0,0.999 c0.049,0.023,0.049,-1.022,0,-0.999 M0.037,0.809 c-0.028,0.015,-0.028,-0.634,0,-0.619 c0.028,-0.015,0.028,0.634,0,0.619 M0.164,0.983 l0,-0.966 h-0.013 l-0.025,0.601 L0.1,0.017 h-0.013 v0.966 h0.015 v-0.568 l0.02,0.465 h0.007 l0.02,-0.477,0,0.58 h0.015 M0.218,0.017 h-0.016 l-0.031,0.966 h0.016 l0.006,-0.207 h0.032 l0.006,0.207 h0.017 L0.218,0.017 M0.199,0.607 l0.011,-0.37,0.011,0.37 h-0.022 M0.301,0.673 c0.026,-0.162,0.014,-0.694,-0.016,-0.656 c0,0,-0.03,0,-0.03,0 v0.966 h0.016 v-0.269 h0.015 l0.013,0.269 h0.017 l-0.015,-0.311 M0.271,0.536 v-0.337 c0.01,-0.004,0.029,-0.022,0.028,0.168 c0.001,0.19,-0.018,0.173,-0.028,0.168 M0.378,0 c-0.049,-0.022,-0.049,1,0,0.999 c0.049,0.023,0.049,-1.022,0,-0.999 M0.378,0.809 c-0.028,0.015,-0.028,-0.634,0,-0.619 c0.028,-0.015,0.028,0.634,0,0.619 M0.505,0.983 l0,-0.966 h-0.013 l-0.025,0.601 L0.441,0.017 h-0.013 v0.966 h0.015 v-0.568 l0.02,0.465 h0.007 l0.02,-0.477,0,0.58 h0.015 M0.558,0.017 h-0.016 l-0.031,0.966 h0.016 l0.006,-0.207 h0.032 l0.006,0.207 h0.017 L0.558,0.017 M0.54,0.607 l0.011,-0.37,0.011,0.37 h-0.022 M0.642,0.673 c0.026,-0.162,0.014,-0.694,-0.016,-0.656 c0,0,-0.03,0,-0.03,0 v0.966 h0.016 v-0.269 h0.015 l0.013,0.269 h0.017 l-0.015,-0.311 M0.612,0.536 v-0.337 c0.01,-0.004,0.029,-0.022,0.028,0.168 c0.001,0.19,-0.018,0.173,-0.028,0.168 M0.721,0 c-0.049,-0.022,-0.049,1,0,0.999 c0.049,0.023,0.049,-1.022,0,-0.999 M0.721,0.809 c-0.028,0.015,-0.028,-0.634,0,-0.619 c0.028,-0.015,0.028,0.634,0,0.619 M0.848,0.983 l0,-0.966 h-0.013 l-0.025,0.601,-0.026,-0.601 h-0.013 v0.966 h0.015 v-0.568 l0.02,0.465 h0.007 l0.02,-0.477,0,0.58 h0.015 M0.901,0.017 h-0.016 l-0.031,0.966 h0.016 l0.006,-0.207 h0.032 l0.006,0.207 h0.017 L0.901,0.017 M0.882,0.607 l0.011,-0.37,0.011,0.37 h-0.022 M0.985,0.673 c0.026,-0.162,0.014,-0.694,-0.016,-0.656 c0,0,-0.03,0,-0.03,0 v0.966 h0.016 v-0.269 h0.015 l0.013,0.269 h0.017 l-0.015,-0.311 M0.955,0.536 v-0.337 c0.01,-0.004,0.029,-0.022,0.028,0.168 c0.001,0.19,-0.018,0.173,-0.028,0.168';

  // Animation
  const containerEl = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerEl,
  });
  // const opacity = useTransform(scrollYProgress, [1, 0.5], [1, 0]);
  const clipTranslateX = useTransform(scrollYProgress, [0, 1], [0, -3000]);
  const colorTranslateX = useTransform(scrollYProgress, [0, 1], [0, 3000]);
  return (
    <>
      <div className="h-full">
        <div className="main HERO h-full max-h-screen" ref={containerEl}>
          <div className="content">
            <div className="rail">
              <div className="screen-reader-text">OMAR HABASH</div>
              <div className="rail_container">
                <motion.div
                  className="rail_clip"
                  style={{
                    translateX: clipTranslateX,
                  }}
                >
                  <motion.div
                    className="rail_color"
                    style={{
                      translateX: colorTranslateX,
                    }}
                  >
                    <div className="rail_gradients">
                      {/* put gradients in rail */}
                      {icons.map((icon, i) => {
                        return (
                          <Image
                            key={`${icon.name}-${i}`}
                            src={icon.gradient}
                            width="50"
                            height="50"
                            alt={`${icon.name} Gradient`}
                            className={`rail_gradient -${icon.selector}`}
                          />
                        );
                      })}

                      {/* <Image
                      src={imgGradientOrange}
                      width="50"
                      height="50"
                      alt="Core Gradient"
                      className="rail_gradient -core"
                    />
                    <Image
                      src={imgGradientBlue}
                      width="50"
                      height="50"
                      alt="Pro Gradient"
                      className="rail_gradient -pro"
                    /> */}
                    </div>
                  </motion.div>
                </motion.div>
                <svg
                  width={railWidth}
                  height={railHeight}
                  viewBox={`0 0 ${railWidth} ${railHeight}`}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="rail_sizing"
                ></svg>

                <svg className="rail_mask">
                  <clipPath id="contentTitle" clipPathUnits="objectBoundingBox">
                    <path d={railObb}></path>
                  </clipPath>
                </svg>
              </div>
            </div>
            <div className="boxes">
              {/* put icons in boxes */}
              {icons.map((icon, i) => {
                return (
                  <div key={icon.name} className={`box -${icon.selector}`}>
                    <div className="box_container">
                      <Image
                        src={icon.gradient}
                        width="50"
                        height="50"
                        alt={`${icon.selector} Gradient`}
                        className="box_gradient"
                      />
                      <Image
                        alt={`${icon.name} Icon`}
                        width="900"
                        height="900"
                        src={icon.image}
                        className="box_image"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Fluff />
    </>
  );
};

// fluff component
export const Fluff = () => {
  return (
    <p>
      HABASHLorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum
      maxime eligendi quaerat inventore asperiores voluptatem, sint ab ea
      ducimus veniam sunt libero cumque repudiandae modi eaque eum voluptatibus,
      explicabo nobis.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      Laborum maxime eligendi quaerat inventore asperiores voluptatem, sint ab
      ea ducimus veniam sunt libero cumque repudiandae modi eaque eum
      voluptatibus, explicabo nobis.Lorem ipsum dolor sit amet consectetur,
      adipisicing elit. Laborum maxime eligendi quaerat inventore asperiores
      voluptatem, sint ab ea ducimus veniam sunt libero cumque repudiandae modi
      eaque eum voluptatibus, explicabo nobis.Lorem ipsum dolor sit amet
      consectetur, adipisicing elit. Laborum maxime eligendi quaerat inventore
      asperiores voluptatem, sint ab ea ducimus veniam sunt libero cumque
      repudiandae modi eaque eum voluptatibus, explicabo nobis.Lorem ipsum dolor
      sit amet consectetur, adipisicing elit. Laborum maxime eligendi quaerat
      inventore asperiores voluptatem, sint ab ea ducimus veniam sunt libero
      cumque repudiandae modi eaque eum voluptatibus, explicabo nobis.Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Laborum maxime
      eligendi quaerat inventore asperiores voluptatem, sint ab ea ducimus
      veniam sunt libero cumque repudiandae modi eaque eum voluptatibus,
      explicabo nobis.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      Laborum maxime eligendi quaerat inventore asperiores voluptatem, sint ab
      ea ducimus veniam sunt libero cumque repudiandae modi eaque eum
      voluptatibus, explicabo nobis.Lorem ipsum dolor sit amet consectetur,
      adipisicing elit. Laborum maxime eligendi quaerat inventore asperiores
      voluptatem, sint ab ea ducimus veniam sunt libero cumque repudiandae modi
      eaque eum voluptatibus, explicabo nobis.Lorem ipsum dolor sit amet
      consectetur, adipisicing elit. Laborum maxime eligendi quaerat inventore
      asperiores voluptatem, sint ab ea ducimus veniam sunt libero cumque
      repudiandae modi eaque eum voluptatibus, explicabo nobis.Lorem ipsum dolor
      sit amet consectetur, adipisicing elit. Laborum maxime eligendi quaerat
      inventore asperiores voluptatem, sint ab ea ducimus veniam sunt libero
      cumque repudiandae modi eaque eum voluptatibus, explicabo nobis.Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Laborum maxime
      eligendi quaerat inventore asperiores voluptatem, sint ab ea ducimus
      veniam sunt libero cumque repudiandae modi eaque eum voluptatibus,
      explicabo nobis.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      Laborum maxime eligendi quaerat inventore asperiores voluptatem, sint ab
      ea ducimus veniam sunt libero cumque repudiandae modi eaque eum
      voluptatibus, explicabo nobis.Lorem ipsum dolor sit amet consectetur,
      adipisicing elit. Laborum maxime eligendi quaerat inventore asperiores
      voluptatem, sint ab ea ducimus veniam sunt libero cumque repudiandae modi
      eaque eum voluptatibus, explicabo nobis.Lorem ipsum dolor sit amet
      consectetur, adipisicing elit. Laborum maxime eligendi quaerat inventore
      asperiores voluptatem, sint ab ea ducimus veniam sunt libero cumque
      repudiandae modi eaque eum voluptatibus, explicabo nobis.Lorem ipsum dolor
      sit amet consectetur, adipisicing elit. Laborum maxime eligendi quaerat
      inventore asperiores voluptatem, sint ab ea ducimus veniam sunt libero
      cumque repudiandae modi eaque eum voluptatibus, explicabo nobis.Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Laborum maxime
      eligendi quaerat inventore asperiores voluptatem, sint ab ea ducimus
      veniam sunt libero cumque repudiandae modi eaque eum voluptatibus,
      explicabo nobis.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      Laborum maxime eligendi quaerat inventore asperiores voluptatem, sint ab
      ea ducimus veniam sunt libero cumque repudiandae modi eaque eum
      voluptatibus, explicabo nobis.Lorem ipsum dolor sit amet consectetur,
      adipisicing elit. Laborum maxime eligendi quaerat inventore asperiores
      voluptatem, sint ab ea ducimus veniam sunt libero cumque repudiandae modi
      eaque eum voluptatibus, explicabo nobis.Lorem ipsum dolor sit amet
      consectetur, adipisicing elit. Laborum maxime eligendi quaerat inventore
      asperiores voluptatem, sint ab ea ducimus veniam sunt libero cumque
      repudiandae modi eaque eum voluptatibus, explicabo nobis.Lorem ipsum dolor
      sit amet consectetur, adipisicing elit. Laborum maxime eligendi quaerat
      inventore asperiores voluptatem, sint ab ea ducimus veniam sunt libero
      cumque repudiandae modi eaque eum voluptatibus, explicabo nobis.Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Laborum maxime
      eligendi quaerat inventore asperiores voluptatem, sint ab ea ducimus
      veniam sunt libero cumque repudiandae modi eaque eum voluptatibus,
      explicabo nobis.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      Laborum maxime eligendi quaerat inventore asperiores voluptatem, sint ab
      ea ducimus veniam sunt libero cumque repudiandae modi eaque eum
      voluptatibus, explicabo nobis.Lorem ipsum dolor sit amet consectetur,
      adipisicing elit. Laborum maxime eligendi quaerat inventore asperiores
      voluptatem, sint ab ea ducimus veniam sunt libero cumque repudiandae modi
      eaque eum voluptatibus, explicabo nobis.Lorem ipsum dolor sit amet
      consectetur, adipisicing elit. Laborum maxime eligendi quaerat inventore
      asperiores voluptatem, sint ab ea ducimus veniam sunt libero cumque
      repudiandae modi eaque eum voluptatibus, explicabo nobis.Lorem ipsum dolor
      sit amet consectetur, adipisicing elit. Laborum maxime eligendi quaerat
      inventore asperiores voluptatem, sint ab ea ducimus veniam sunt libero
      cumque repudiandae modi eaque eum voluptatibus, explicabo nobis.Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Laborum maxime
      eligendi quaerat inventore asperiores voluptatem, sint ab ea ducimus
      veniam sunt libero cumque repudiandae modi eaque eum voluptatibus,
      explicabo nobis.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      Laborum maxime eligendi quaerat inventore asperiores voluptatem, sint ab
      ea ducimus veniam sunt libero cumque repudiandae modi eaque eum
      voluptatibus, explicabo nobis.Lorem ipsum dolor sit amet consectetur,
      adipisicing elit. Laborum maxime eligendi quaerat inventore asperiores
      voluptatem, sint ab ea ducimus veniam sunt libero cumque repudiandae modi
      eaque eum voluptatibus, explicabo nobis.Lorem ipsum dolor sit amet
      consectetur, adipisicing elit. Laborum maxime eligendi quaerat inventore
      asperiores voluptatem, sint ab ea ducimus veniam sunt libero cumque
      repudiandae modi eaque eum voluptatibus, explicabo nobis.Lorem ipsum dolor
      sit amet consectetur, adipisicing elit. Laborum maxime eligendi quaerat
      inventore asperiores voluptatem, sint ab ea ducimus veniam sunt libero
      cumque repudiandae modi eaque eum voluptatibus, explicabo nobis.Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Laborum maxime
      eligendi quaerat inventore asperiores voluptatem, sint ab ea ducimus
      veniam sunt libero cumque repudiandae modi eaque eum voluptatibus,
      explicabo nobis.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      Laborum maxime eligendi quaerat inventore asperiores voluptatem, sint ab
      ea ducimus veniam sunt libero cumque repudiandae modi eaque eum
      voluptatibus, explicabo nobis.Lorem ipsum dolor sit amet consectetur,
      adipisicing elit. Laborum maxime eligendi quaerat inventore asperiores
      voluptatem, sint ab ea ducimus veniam sunt libero cumque repudiandae modi
      eaque eum voluptatibus, explicabo nobis.Lorem ipsum dolor sit amet
      consectetur, adipisicing elit. Laborum maxime eligendi quaerat inventore
      asperiores voluptatem, sint ab ea ducimus veniam sunt libero cumque
      repudiandae modi eaque eum voluptatibus, explicabo nobis.Lorem ipsum dolor
      sit amet consectetur, adipisicing elit. Laborum maxime eligendi quaerat
      inventore asperiores voluptatem, sint ab ea ducimus veniam sunt libero
      cumque repudiandae modi eaque eum voluptatibus, explicabo nobis.Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Laborum maxime
      eligendi quaerat inventore asperiores voluptatem, sint ab ea ducimus
      veniam sunt libero cumque repudiandae modi eaque eum voluptatibus,
      explicabo nobis.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      Laborum maxime eligendi quaerat inventore asperiores voluptatem, sint ab
      ea ducimus veniam sunt libero cumque repudiandae modi eaque eum
      voluptatibus, explicabo nobis.Lorem ipsum dolor sit amet consectetur,
      adipisicing elit. Laborum maxime eligendi quaerat inventore asperiores
      voluptatem, sint ab ea ducimus veniam sunt libero cumque repudiandae modi
      eaque eum voluptatibus, explicabo nobis.Lorem ipsum dolor sit amet
      consectetur, adipisicing elit. Laborum maxime eligendi quaerat inventore
      asperiores voluptatem, sint ab ea ducimus veniam sunt libero cumque
      repudiandae modi eaque eum voluptatibus, explicabo nobis.Lorem ipsum dolor
      sit amet consectetur, adipisicing elit. Laborum maxime eligendi quaerat
      inventore asperiores voluptatem, sint ab ea ducimus veniam sunt libero
      cumque repudiandae modi eaque eum voluptatibus, explicabo nobis.Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Laborum maxime
      eligendi quaerat inventore asperiores voluptatem, sint ab ea ducimus
      veniam sunt libero cumque repudiandae modi eaque eum voluptatibus,
      explicabo nobis.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      Laborum maxime eligendi quaerat inventore asperiores voluptatem, sint ab
      ea ducimus veniam sunt libero cumque repudiandae modi eaque eum
      voluptatibus, explicabo nobis.Lorem ipsum dolor sit amet consectetur,
      adipisicing elit. Laborum maxime eligendi quaerat inventore asperiores
      voluptatem, sint ab ea ducimus veniam sunt libero cumque repudiandae modi
      eaque eum voluptatibus, explicabo nobis.Lorem ipsum dolor sit amet
      consectetur, adipisicing elit. Laborum maxime eligendi quaerat inventore
      asperiores voluptatem, sint ab ea ducimus veniam sunt libero cumque
      repudiandae modi eaque eum voluptatibus, explicabo nobis.Lorem ipsum dolor
      sit amet consectetur, adipisicing elit. Laborum maxime eligendi quaerat
      inventore asperiores voluptatem, sint ab ea ducimus veniam sunt libero
      cumque repudiandae modi eaque eum voluptatibus, explicabo nobis.Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Laborum maxime
      eligendi quaerat inventore asperiores voluptatem, sint ab ea ducimus
      veniam sunt libero cumque repudiandae modi eaque eum voluptatibus,
      explicabo nobis.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      Laborum maxime eligendi quaerat inventore asperiores voluptatem, sint ab
      ea ducimus veniam sunt libero cumque repudiandae modi eaque eum
      voluptatibus, explicabo nobis.Lorem ipsum dolor sit amet consectetur,
      adipisicing elit. Laborum maxime eligendi quaerat inventore asperiores
      voluptatem, sint ab ea ducimus veniam sunt libero cumque repudiandae modi
      eaque eum voluptatibus, explicabo nobis.Lorem ipsum dolor sit amet
      consectetur, adipisicing elit. Laborum maxime eligendi quaerat inventore
      asperiores voluptatem, sint ab ea ducimus veniam sunt libero cumque
      repudiandae modi eaque eum voluptatibus, explicabo nobis.Lorem ipsum dolor
      sit amet consectetur, adipisicing elit. Laborum maxime eligendi quaerat
      inventore asperiores voluptatem, sint ab ea ducimus veniam sunt libero
      cumque repudiandae modi eaque eum voluptatibus, explicabo nobis.Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Laborum maxime
      eligendi quaerat inventore asperiores voluptatem, sint ab ea ducimus
      veniam sunt libero cumque repudiandae modi eaque eum voluptatibus,
      explicabo nobis.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      Laborum maxime eligendi quaerat inventore asperiores voluptatem, sint ab
      ea ducimus veniam sunt libero cumque repudiandae modi eaque eum
      voluptatibus, explicabo nobis.Lorem ipsum dolor sit amet consectetur,
      adipisicing elit. Laborum maxime eligendi quaerat inventore asperiores
      voluptatem, sint ab ea ducimus veniam sunt libero cumque repudiandae modi
      eaque eum voluptatibus, explicabo nobis.Lorem ipsum dolor sit amet
      consectetur, adipisicing elit. Laborum maxime eligendi quaerat inventore
      asperiores voluptatem, sint ab ea ducimus veniam sunt libero cumque
      repudiandae modi eaque eum voluptatibus, explicabo nobis.sit amet
      consectetur, adipisicing elit. Laborum maxime eligendi quaerat inventore
      asperiores voluptatem, sint ab ea ducimus veniam sunt libero cumque
      repudiandae modi eaque eum voluptatibus, explicabo nobis.Lorem ipsum dolor
      sit amet consectetur, adipisicing elit. Laborum maxime eligendi quaerat
      inventore asperiores voluptatem, sint ab ea ducimus veniam sunt libero
      cumque repudiandae modi eaque eum voluptatibus, explicabo nobis.Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Laborum maxime
      eligendi quaerat inventore asperiores voluptatem, sint ab ea ducimus
      veniam sunt libero cumque repudiandae modi eaque eum voluptatibus,
      explicabo nobis.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      Laborum maxime eligendi quaerat inventore asperiores voluptatem, sint ab
      ea ducimus veniam sunt libero cumque repudiandae modi eaque eum
      voluptatibus, explicabo nobis.Lorem ipsum dolor sit amet consectetur,
      adipisicing elit. Laborum maxime eligendi quaerat inventore asperiores
      voluptatem, sint ab ea ducimus veniam sunt libero cumque repudiandae modi
      eaque eum voluptatibus, explicabo nobis.Lorem ipsum dolor sit amet
      consectetur, adipisicing elit. Laborum maxime eligendi quaerat inventore
      asperiores voluptatem, sint ab ea ducimus veniam sunt libero cumque
      repudiandae modi eaque eum voluptatibus, explicabo nobis.sit amet
      consectetur, adipisicing elit. Laborum maxime eligendi quaerat inventore
      asperiores voluptatem, sint ab ea ducimus veniam sunt libero cumque
      repudiandae modi eaque eum voluptatibus, explicabo nobis.Lorem ipsum dolor
      sit amet consectetur, adipisicing elit. Laborum maxime eligendi quaerat
      inventore asperiores voluptatem, sint ab ea ducimus veniam sunt libero
      cumque repudiandae modi eaque eum voluptatibus, explicabo nobis.Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Laborum maxime
      eligendi quaerat inventore asperiores voluptatem, sint ab ea ducimus
      veniam sunt libero cumque repudiandae modi eaque eum voluptatibus,
      explicabo nobis.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      Laborum maxime eligendi quaerat inventore asperiores voluptatem, sint ab
      ea ducimus veniam sunt libero cumque repudiandae modi eaque eum
      voluptatibus, explicabo nobis.Lorem ipsum dolor sit amet consectetur,
      adipisicing elit. Laborum maxime eligendi quaerat inventore asperiores
      voluptatem, sint ab ea ducimus veniam sunt libero cumque repudiandae modi
      eaque eum voluptatibus, explicabo nobis.Lorem ipsum dolor sit amet
      consectetur, adipisicing elit. Laborum maxime eligendi quaerat inventore
      asperiores voluptatem, sint ab ea ducimus veniam sunt libero cumque
      repudiandae modi eaque eum voluptatibus, explicabo nobis.sit amet
      consectetur, adipisicing elit. Laborum maxime eligendi quaerat inventore
      asperiores voluptatem, sint ab ea ducimus veniam sunt libero cumque
      repudiandae modi eaque eum voluptatibus, explicabo nobis.Lorem ipsum dolor
      sit amet consectetur, adipisicing elit. Laborum maxime eligendi quaerat
      inventore asperiores voluptatem, sint ab ea ducimus veniam sunt libero
      cumque repudiandae modi eaque eum voluptatibus, explicabo nobis.Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Laborum maxime
      eligendi quaerat inventore asperiores voluptatem, sint ab ea ducimus
      veniam sunt libero cumque repudiandae modi eaque eum voluptatibus,
      explicabo nobis.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      Laborum maxime eligendi quaerat inventore asperiores voluptatem, sint ab
      ea ducimus veniam sunt libero cumque repudiandae modi eaque eum
      voluptatibus, explicabo nobis.Lorem ipsum dolor sit amet consectetur,
      adipisicing elit. Laborum maxime eligendi quaerat inventore asperiores
      voluptatem, sint ab ea ducimus veniam sunt libero cumque repudiandae modi
      eaque eum voluptatibus, explicabo nobis.Lorem ipsum dolor sit amet
      consectetur, adipisicing elit. Laborum maxime eligendi quaerat inventore
      asperiores voluptatem, sint ab ea ducimus veniam sunt libero cumque
      repudiandae modi eaque eum voluptatibus, explicabo nobis.
    </p>
  );
};
