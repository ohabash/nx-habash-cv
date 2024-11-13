import { FaAngleDoubleRight } from 'react-icons/fa';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import { FadeIn } from '../animation/FadeIn';
type Props = {
  mode: 'next' | 'prev';
};
export const Arrows = ({ mode }: Props) => {
  console.log(`🚀 => Arrows => mode:`, mode)
  // wrapperClassName;
  let wrapperClassName = 'group cursor-pointer z-30 absolute bg-darken-5 hover:bg-darken-7 active:bg-darken-9 ease-in-out duration-200 w-[10vw] h-full top-0 flex items-center justify-center align-middle ';
  wrapperClassName += mode === 'prev' ? 'LEFT-HANDLE right-0' : 'RIGHT-HANDLE left-0';
  return (
    <div className={wrapperClassName}>
          <div className="ease-in-out duration-200 opacity-50 group-hover:opacity-100 text-center">
            {(mode==='next') && <FadeIn className='text-left'>
              <FaAngleDoubleRight className="text-lg mb-2" />
              <p className="font-black text-xs">NEXT</p>
            </FadeIn>}
            {(mode==='prev') && <FadeIn className='text-left'>
              <FaAngleDoubleLeft className="text-lg mb-2" />
              <p className="font-black text-xs">PREV</p>
            </FadeIn>}
          </div>
      </div>
  );
};
