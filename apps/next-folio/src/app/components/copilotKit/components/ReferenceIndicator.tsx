'use client';
import { useState, useEffect } from 'react';
import { AiOutlineLoading3Quarters, AiFillCheckCircle } from "react-icons/ai";

interface ReferenceIndicatorProps {
  dataType: string;
}

export const ReferenceIndicator = ({ dataType }: ReferenceIndicatorProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const wrapperClass = "flex items-center gap-2 rounded-lg my-2";
  const loadingConfig = {
    colorClass: "text-blue-600 bg-blue-50",
    icon: <AiOutlineLoading3Quarters className="spin" />,
    text: `Referencing ${dataType} data`
  };
  const successConfig = {
    colorClass: "text-green-600 bg-green-50", 
    icon: <AiFillCheckCircle className="text-accent3 text-lg" />,
    text: `Referenced ${dataType} data`
  };

  const config = isLoading ? loadingConfig : successConfig;

  return (
    <div className={`${wrapperClass} ${config.colorClass}`}>
      {config.icon}
      <span className="italic text-white/50">{config.text}</span>
    </div>
  );
};
