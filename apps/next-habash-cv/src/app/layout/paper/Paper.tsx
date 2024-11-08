'use client'
import "./Paper.scss"
import Tilt from '../../utils/Tilt';
import { usePaperContext } from "./Paper.context";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}


export const Paper = ({children}: Props) => {
  const c = usePaperContext(); 
  return (
    <div className="_level" id="resume-theme-here">
      <div className="level-left"></div>
      <div className="level-right">
        <div className="paper-wrapper">
          <div className={`paper-container ${c.isFocused ? 'focused' : ''}`}>
            <Tilt overwrites={{ perspective: 950 }}>
              <div className="paper-content" tilt-inner_="true">
                {children}
              </div>
            </Tilt>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Paper
