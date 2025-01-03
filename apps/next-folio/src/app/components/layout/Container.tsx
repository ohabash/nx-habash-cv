import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  className?: string;
}

export const Container = ({children, className}:Props) => {
  return (
    <div className={twMerge(`CONTAINER mx-auto w-[1200px] px-6_ overflow-hidden_`, className)}>
      {children}
    </div>
  )
}

