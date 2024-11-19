import { FaAngleDoubleRight } from 'react-icons/fa';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import { FadeIn } from '../animation/FadeIn';
type Props = {
  mode: 'next' | 'prev';
  onClick: (value: any) => void;
  className?: string;
};
export const Arrows2 = ({ mode, onClick, className }: Props) => {
  console.log(`🚀 => Arrows => mode:`, mode)
  // wrapperClassName;
  let wrapperClassName = 'group p-8 cursor-pointer z-30 absolute bg-dark/50 hover:bg-dark/80 active:bg-dark ease-in-out duration-[800ms] w-full h-full top-0 flex items-center justify-center__ align-middle ';
  wrapperClassName += mode === 'prev' ? 'LEFT-HANDLE justify-end ' : 'RIGHT-HANDLE justify-start';
  return (
    <div className={wrapperClassName} onClick={onClick}>
      <div className="ease-in-out duration-200 opacity-50 group-hover:opacity-100 text-center ">
        <div className={className}>
          {mode === 'next' && <FaAngleDoubleRight className="text-lg mb-2" />}
          {mode === 'prev' && <FaAngleDoubleLeft className="text-lg mb-2" />}
        </div>
      </div>
    </div>
  );
};
