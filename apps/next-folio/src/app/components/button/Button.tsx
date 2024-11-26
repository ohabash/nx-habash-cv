import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  iconClassName?: string;
  icon?: ReactNode;
  blur?: boolean;
};

export const Button = ({
  children,
  size = 'medium',
  className,
  icon,
  blur = false,
  iconClassName,
}: Props) => {
  const sizeClassNames = {
    small: 'text-xs px-2 py-1',
    medium: 'text-sm px-5 py-2',
    large: 'text-base px-8 py-4',
  };

  return (
    <button
      className={twMerge(
        'rounded-full flex items-center justify-center group font-medium',
        sizeClassNames[size],
        blur ? 'blurrr text-white' : 'bg-white text-black',
        icon && 'pr-2',
        className
      )}
    >
      {children}
      {icon && (
        <span
          className={twMerge(
            'text-lg ml-3 group-hover:rotate-180 bouncey duration-700 w-8 h-8 bg-accent3 rounded-full flex justify-center items-center',
            iconClassName
          )}
        >
          {icon}
        </span>
      )}
    </button>
  );
};