import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  className?: string;
}

export const Container = ({children, className}:Props) => {
  return (
    <div className={twMerge('mx-auto max-w-[1200px] px-6', className)}>
      {children}
    </div>
  )
}

