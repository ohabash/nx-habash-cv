import "./Paper.scss"
import Tilt from '../../utils/Tilt';

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const Paper = ({children}: Props) => {
  console.log('Paper')
  return (
    <div className="_level" id="resume-theme-here">
      <div className="level-left"></div>
      <div className="level-right">
        <div className="paper-wrapper">
          <Tilt overwrites={{ perspective: 950 }}>
            <div className="paper-container group">
              <div className="paper-content" tilt-inner_="true">
                {children}
              </div>
              <div className="tilt-shadow-el"></div>
            </div>
          </Tilt>
        </div>
      </div>
    </div>
  );
}

export default Paper
