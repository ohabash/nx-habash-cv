import { useEffect, useRef, useState } from 'react';
import { cn } from '../utils/utils';
import { Skill } from '../carousel/skills.data';
import { LogoCard } from '../logo-card/LogoCard';

type Props = {
  items: Skill[];
  groupId: string;
  // scrollYProgress: MotionValue<number>,
  direction?: 'left' | 'right';
  speed?: 'fast' | 'normal' | 'slow' | string;
  pauseOnHover?: boolean;
  shadow?: boolean;
  className?: string;
};

export const InfiniteMovingCards = ({
  items,
  groupId,
  direction = 'left',
  speed = 'fast',
  pauseOnHover = true,
  shadow = false,
  className,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);

  useEffect(() => addAnimation(), []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === 'left') {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'forwards'
        );
      } else {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'reverse'
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      let duration;
      switch (speed) {
        case 'fast':
          duration = '75s';
          break;
        case 'normal':
          duration = '90s';
          break;
        case 'slow':
          duration = '105s';
          break;
        default:
          duration = speed;
          break;
      }
      containerRef.current.style.setProperty('--animation-duration', duration);
    }
  };
  return (
    <div className="wrapper" ref={wrapperRef}>
      <div
        ref={containerRef}
        className={cn(
          'scroller relative z-20  max-w-screen overflow-clip',
          shadow &&
            '[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
          className
        )}
      >
        <ul
          ref={scrollerRef}
          className={cn(
            ' flex min-w-full shrink-0 gap-5 w-max flex-nowrap pb-2',
            start && 'animate-scroll ',
            pauseOnHover && 'hover:[animation-play-state:paused]'
          )}
        >
          {items.map((item, idx) => (
            <LogoCard
              key={`${groupId}_${idx}`}
              ID={`${groupId}_${idx}`}
              item={item}
              // containerRef={wrapperRef}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
