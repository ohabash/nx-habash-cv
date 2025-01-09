import { motion } from "framer-motion";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { Skill } from "../carousel/skills.data";

type Props = {
  item: Skill;
  ID: number | string;
};
export const LogoCard = ({ item, ID }: Props) => {
  return (
    <a
      className={twMerge(
        'w-[15vw] fadeInUp overflow-clip1 shrink-0 aspect-video relative rounded-xl block'
      )}
      href={item.url}
      target="_blank"
      rel="noreferrer"
      style={
        {
          // backgroundImage: `url(${item.poster})`,
          // backgroundSize: 'cover',
        }
      }
    >
      {/* overlay */}
      <div className="absolute top-0 left-0 w-full h-full z-10 p-2__ flex items-center text-center justify-center">
        <motion.div
          className={twMerge(
            'bg-dark/80 backdrop-blur-[0px] h-full rounded-xl overflow-clip1 w-full relative',
          )}
          title={item.desc}
        >
          <Image
            className={twMerge(
              'drop-shadow-2xl w-[40%] h-full object-contain inline',
              item.iconClass
            )}
            width="150"
            height="150"
            src={item.icon || '/img/logos/angular.webp'}
            alt={item.name}
          />
          {/* <Tooltip
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            items={[
              {
                id: ID as any,
                name: item.name,
                designation: 'Data Scientist',
                image: item.icon || '/img/logos/angular.webp',
              },
            ]}
          /> */}
        </motion.div>
      </div>
    </a>
  );
};

