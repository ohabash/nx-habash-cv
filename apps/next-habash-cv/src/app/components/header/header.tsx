import { TextLogo } from '../logos/text-logo';
export const Header = () => {
  return (
    <div className='absolute border-b-[1px] px-8 border-b-subtle top-0 left-0 w-full bg-dark text-white z-20'>
      <div className="level is-gapless m-0">
        <div className="level-left my-3">
          <TextLogo/>
        </div>
        <div className="level-right"></div>
      </div>
    </div>
  )
}

