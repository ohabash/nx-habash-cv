"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Register GSAP plugins
gsap.registerPlugin(CustomEase, MotionPathPlugin);

export const CannonAnimation = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Custom easing functions
    const customEase = CustomEase.create("custom", "M0,0 C0.2,0 0.432,0.147 0.507,0.374 0.59,0.629 0.822,1 1,1");
    const customEase2 = CustomEase.create("custom2", "M0,0 C0.266,0.412 0.297,0.582 0.453,0.775 0.53,0.87 0.78,1 1,1");
    const customEase3 = CustomEase.create("custom3", "M0,0 C0.594,0.062 0.79,0.698 1,1");

    // Get all ellipses
    const ellipses = gsap.utils.toArray(".cannon-ell") as Element[];
    const colorInterpolate = gsap.utils.interpolate(["#359EEE", "#FFC43D", "#EF476F", "#03CEA4"]);

    // Set initial visibility
    gsap.set(svgRef.current, { visibility: "visible" });

    // Animation function for each ellipse
    const animateEllipse = (ellipse: Element, index: number) => {
      const timeline = gsap.timeline({
        defaults: { ease: customEase },
        repeat: -1
      });

      gsap.set(ellipse, {
        opacity: 1 - index / ellipses.length,
        stroke: colorInterpolate(index / ellipses.length)
      });

      timeline
        .to(ellipse, {
          attr: {
            ry: `-=${index * 2.3}`,
            rx: `+=${index * 1.4}`
          },
          ease: customEase3
        })
        .to(ellipse, {
          attr: {
            ry: `+=${index * 2.3}`,
            rx: `-=${index * 1.4}`
          },
          ease: customEase2
        })
        .to(ellipse, {
          duration: 1,
          rotation: -180,
          transformOrigin: "50% 50%"
        }, 0)
        .timeScale(0.5);
    };

    // Animate each ellipse with delay
    ellipses.forEach((ellipse, index) => {
      gsap.delayedCall(index / (ellipses.length - 1), animateEllipse, [ellipse, index + 1]);
    });

    // Animate the gradient
    gsap.to("#cannonAiGrad", {
      duration: 4,
      delay: 0.75,
      attr: {
        x1: "-=300",
        x2: "-=300"
      },
      scale: 1.2,
      transformOrigin: "50% 50%",
      repeat: -1,
      ease: "none"
    });

    // Animate the AI icon
    gsap.to("#cannonAi", {
      duration: 1,
      scale: 1.1,
      transformOrigin: "50% 50%",
      repeat: -1,
      yoyo: true,
      ease: customEase
    });

    // Cleanup function
    return () => {
      gsap.killTweensOf(svgRef.current);
      gsap.killTweensOf(".cannon-ell");
      gsap.killTweensOf("#cannonAiGrad");
      gsap.killTweensOf("#cannonAi");
    };
  }, []);

  return (
    <div className=" aspect-square w-full flex items-center justify-center">
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 600"
        className="w-full h-full"
        style={{ visibility: 'hidden' }}
      >
        <defs>
          <linearGradient
            id="cannonAiGrad"
            x1="513.98"
            y1="290"
            x2="479.72"
            y2="320"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#000" stopOpacity="0" />
            <stop offset=".15" stopColor="#EF476F" />
            <stop offset=".4" stopColor="#359eee" />
            <stop offset=".6" stopColor="#03cea4" />
            <stop offset=".78" stopColor="#FFC43D" />
            <stop offset="1" stopColor="#000" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Generate 30 ellipses */}
        {Array.from({ length: 30 }).map((_, i) => (
          <ellipse
            key={i}
            className="cannon-ell"
            cx="400"
            cy="300"
            rx="80"
            ry="80"
            fill="none"
          />
        ))}

        <path
          id="cannonAi"
          opacity="0"
          d="m417.17,323.85h-34.34c-3.69,0-6.67-2.99-6.67-6.67v-34.34c0-3.69,2.99-6.67,6.67-6.67h34.34c3.69,0,6.67,2.99,6.67,6.67v34.34c0,3.69-2.99,6.67-6.67,6.67Zm-5.25-12.92v-21.85c0-.55-.45-1-1-1h-21.85c-.55,0-1,.45-1,1v21.85c0,.55.45,1,1,1h21.85c.55,0,1-.45,1-1Zm23.08-16.29h-11.15m-47.69,0h-11.15m70,10.73h-11.15m-47.69,0h-11.15m40.37,29.63v-11.15m0-47.69v-11.15m-10.73,70v-11.15m0-47.69v-11.15"
          stroke="url(#cannonAiGrad)"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
}; 