import { motion, MotionValue, useInView, useScroll, useTransform } from "framer-motion";
import { Skill } from "../carousel2/skills.data";
import { twMerge } from "tailwind-merge";
import { RefObject, useEffect, useRef } from "react";

type Props = {
  item: Skill;
};
export const LogoCard = ({ item }: Props) => {
  return (
    <a
      className={twMerge(
        'w-[15vw] overflow-clip shrink-0 aspect-video relative rounded-xl block'
      )}
      href={item.url}
      target="_blank"
      rel="noreferrer"
      style={{
        backgroundImage: `url(${item.poster})`,
        backgroundSize: 'cover',
      }}
    >
      {/* overlay */}
      <div className="absolute top-0 left-0 w-full h-full z-10 p-2__ flex items-center text-center justify-center">
        <motion.div
          className={twMerge(
            'bg-dark/80 backdrop-blur-[2px] h-full rounded-xl overflow-clip w-full fadeInUp',
          )}
        >
          <img
            className={twMerge(
              'drop-shadow-2xl w-[40%] h-full object-contain inline',
              item.iconClass
            )}
            src={item.icon || '/img/logos/angular.webp'}
            alt=""
          />
        </motion.div>
      </div>
    </a>
  );
};

