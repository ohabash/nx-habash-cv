'use client';
import { useEffect } from 'react';
import { skills } from '../data/data-skills';

export const CarouselTEST = () => {
  // useEffect(() => {
  //   console.log( `🚀 => useEffect => skills:`, skills.map((item) => item.name) );
  // }, [skills]);

  return (
    <div className="overflow-clip h-full">
      {skills.map((item, idx) => (
        <h1 key={idx}>{item.name}</h1>
      ))}
    </div>
  );
};
