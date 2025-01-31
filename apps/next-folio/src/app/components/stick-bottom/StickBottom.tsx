import { RefObject } from 'react';
import { Button } from '../button/Button';
import { PiOpenAiLogo } from 'react-icons/pi';
import { StickBottomMotion } from './StickBottom.motion';

type Props = {
  mainWrapperRef?: RefObject<HTMLDivElement | null>;
};
export const StickBottom = ({ mainWrapperRef }: Props) => {
  return (
    <StickBottomMotion target={ mainWrapperRef as any} className=" sticky bottom-6 z-50 level items-start_ justify-center gap-2 mx-5">
        <Button blur={true} icon={<PiOpenAiLogo />}> Interview Me </Button>
        {/* <Button blur={true} icon={<BsWechat />}> Contact Me</Button> */}
    </StickBottomMotion>
  );
};

const Btn = () => {
  return <Button blur={true} icon={<PiOpenAiLogo />}> Interview Me </Button>
};

