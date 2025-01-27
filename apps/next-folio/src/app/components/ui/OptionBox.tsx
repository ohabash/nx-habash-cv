import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const OptionBox = ({
  children,
  onClick,
  className,
}: {
  children: ReactNode;
  onClick?: (value: any) => any;
  className?: string;
}) => {
  return (
    <a
      className={twMerge(
        'mr-2 cursor-pointer inline-block mb-2 border-[1px] border-blue/75 rounded-md bg-darkBlue p-3 hover:border-blue',
        className
      )}
      onClick={onClick}
    >
      {children}
    </a>
  );
};