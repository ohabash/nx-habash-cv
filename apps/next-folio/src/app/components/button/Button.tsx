"use client";
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { cn } from '../utils/utils';
import Link from 'next/link';

type Props = {
  children: ReactNode;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  href?: string;
  iconClassName?: string;
  icon?: ReactNode;
  blur?: boolean;
  onClick?: () => void;
};

export const Button = ({
  children,
  size = 'medium',
  className,
  icon,
  blur = false,
  iconClassName,
  href,
  onClick
}: Props) => {
  const sizeClassNames = {
    small: 'text-xs px-2 py-1',
    medium: 'text-sm px-5 py-2',
    large: 'text-base px-8 py-4',
  };

  return (
    <LinkWrapper href={href}>
      <button
        onClick={e => onClick && onClick()}
        className={cn(
          'rounded-lg flex items-center justify-center group font-medium',
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
              'text-lg ml-3 group-hover:rotate-180 bouncey duration-700 w-8 h-8 bg-blue rounded-full flex justify-center items-center',
              iconClassName
            )}
          >
            {icon}
          </span>
        )}
      </button>
    </LinkWrapper>
  );
};

export const LinkWrapper = ({ children, href }: {children: ReactNode, href?: string}) => {
  return href ? <Link href={href}>{children}</Link> : <>{children}</>;
};