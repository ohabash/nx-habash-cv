import { ReactNode } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { set } from 'firebase/database';

export interface BoxItem {
  id: string;
  content: ReactNode;
  selected: boolean;
  className?: string;
}

export const BoxGroup = ({ items, setItems }: { 
  items: Array<BoxItem>,
  setItems: (items: Array<BoxItem>) => void;
}) => {
  const toggleItem = (item: BoxItem) => {
    const newItems = items.map((i) => {
      if (i.id === item.id) {
        return { ...i, selected: !i.selected };
      }
      return i;
    });
    setItems(newItems);
  };
  return (
    <div className="flex flex-wrap w-full gap-3 justify-center max-lg:flex-col ">
      {items.map((item) => (
        <Box onClick={toggleItem} key={item.id} item={item} />
      ))}
    </div>
  );
};

export const Box = ({ item, onClick }: {
  item: BoxItem;
  onClick?: (item: BoxItem) => void;
}) => {
  return (
    <a
      className={twMerge(
        'flex-1 group cursor-pointer py-[5rem] font-medium text-center rounded-md border-2 inline-block relative bg-darker/80 max-lg:py-10',
        item.className,
        item.selected ? 'border-blue' : 'border-darkBlue hover:border-blue/30'
      )}
      onClick={() => onClick && onClick(item)}
    >
      <div
        className={twMerge(
          'absolute top-0 p-4 right-0',
        )}
      >
        <AiFillCheckCircle
          className={twMerge(
            'group-hover:scale-125 bouncey',
            item.selected ? 'text-blue' : 'text-darkBlue group-hover:text-blue/40'
          )}
        />
      </div>
      <div className="-mt-3">
        <p className="f">{item.content}</p>
      </div>
    </a>
  );
}

