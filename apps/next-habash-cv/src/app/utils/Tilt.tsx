'use client';
/* eslint-disable @typescript-eslint/no-var-requires */
import './Tilt.scss';
import { Children, cloneElement, MouseEvent, useEffect, useRef } from 'react';
import { tiltOptions } from './Tilt.options';
import { TiltOptions } from 'vanilla-tilt';
const VanillaTilt =  require('vanilla-tilt');
const isServer = typeof window === 'undefined';

interface Props {
  children: string | JSX.Element | JSX.Element[];
  onClick?: (e: MouseEvent) => void;
  overwrites?: Partial<TiltOptions>;
}

export const initTiltEffect = (overwrites: Partial<TiltOptions>, el: Element) => {
  if (isServer) return; // do nothing on server renders
  // setTimeout(() => {
    VanillaTilt.init(el, { ...tiltOptions, ...overwrites });
  // }, 300);
};

const Tilt = ({ children, onClick, overwrites={} }: Props) => {
  // Create a ref to hold the reference to the DOM element
  const firstChildRef = useRef(null);

  // get first child
  const firstChild = Children.toArray(children)[0];

  // Clone the first child and add the ref and attributes
  const clonedFirstChild = cloneElement(firstChild as any, {
    ref: firstChildRef,
    'data-tilter': 'true',
    onClick: onClick,
  });

  // Initialize the tilt effect on the cloned element
  useEffect(() => {
    const firstChildElement = firstChildRef.current;
    initTiltEffect(overwrites, firstChildElement as any);
  }, []);

  return <>{clonedFirstChild}</>;
};

export default Tilt;
