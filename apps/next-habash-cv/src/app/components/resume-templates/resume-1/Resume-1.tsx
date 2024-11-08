import profilePic from '../../../assets/img/profile.webp';
import Image from 'next/image';
import './Resume-1.scss';
import { ThemerService, ITheme } from '../../../services/themer.service';
import ContactInfo1 from '../widgets/Contact-1.widget';
import Education2 from '../widgets/Education-2.widget';
import Experience1 from '../widgets/Experience-1.widget';

export class Theme implements ITheme {
  colors = {
    red: '#cd5f5a',
    green: '#18db93',
  };
  vars = {
    accent1: this.colors.red,
    dark: '#2c2c2c',
  };
  // Define a type that includes keys from both vars and colors
  bg(key: keyof typeof this.vars | keyof typeof this.colors) {
    const vals = { ...this.vars, ...this.colors };
    return `bg-[${vals[key]}]`;
  }
  text(key: keyof typeof this.vars | keyof typeof this.colors) {
    const vals = { ...this.vars, ...this.colors };
    return `bg-[${vals[key]}]`;
  }
  sec = {
    accent1: {
      background: this.vars.accent1,
      color: '#ffffff',
    },
    light: {
      background: '#ffffff',
      color: '#000000',
    },
    dark: {
      background: this.vars.dark,
      color: '#ffffff',
    },
    grey: {
      background: '#f3f4f6',
      color: '#000000',
    },
  };
}

interface Props {
  // isFocused: boolean;
}

const Resume1 = ({}: Props) => {
  
  // skip theme on server
  const isServer = typeof window === 'undefined';
  console.log(`🚀 => Resume1 => isServer:`, isServer)

  // theme instance
  const theme = new Theme();

  // set theme variables
  // useEffect(() => {
    // create themer service instance
    const themerService: ThemerService = new ThemerService();

    // skip theme on server
    if (!isServer) {
      // choose element to bind theme
      const el: HTMLElement = document.getElementById(
        'resume-theme-here'
      ) as HTMLElement;
  
      // bind theme to element
      themerService.bindThemeToTemplate(el, theme);
      // }, [theme]);
      console.log(`🚀 => //useEffect => theme:`, theme)
    }
  // }, []);

  // template
  return (
    <div className={'resume-1 h-full'}>
      <div className="grid grid-rows-[1fr,1.5fr,1fr] h-full">
        {/* row 1 */}
        <div className="row grid grid-cols-3">
          <section className={' flex items-center'} style={theme.sec.accent1}>
            <div className="copy -mt-2">
              <h1>Omar Habash</h1>
              <h2 className=" text-lg mt-2">Senior UI Developer</h2>
            </div>
          </section>
          <section className="bg-blue-950 m-0 p-0">
            <Image
              className="w-full h-full object-cover opacity-90"
              src={profilePic}
              alt="Description"
              width={500}
              height={300}
            />
          </section>
          <section className={''} style={theme.sec.accent1}>
            <ContactInfo1></ContactInfo1>
          </section>
        </div>

        {/* row 2 */}
        <div className="row grid grid-cols-3">
          <section className={''}>
            <Education2 theme={theme}></Education2>
          </section>
          <section className={''} style={theme.sec.dark}>
            <Title color="white">Skills</Title>
          </section>
          <section className={''}>
            <Experience1 theme={theme}></Experience1>
          </section>
        </div>

        {/* row 3 */}
        <div className="row grid grid-cols-3">
          <section className={''} style={theme.sec.grey}>
            <Title>Mission</Title>
            <p className="key text-justify_">
              To contribute experience, code, design, and leadership within a
              talented team dedicated to creating an impactful product at a
              rapidly growing company. I’m no stranger to fast-paced
              environments where time is money and quality is paramount.
            </p>
          </section>
          <section className={''} style={theme.sec.light}>
            <Title>References</Title>
          </section>
          <section className={''} style={theme.sec.grey}>
            <Title>Links</Title>
          </section>
        </div>
      </div>
    </div>
  );
};



// section Title component
interface TitleProps {
  children: string | JSX.Element | JSX.Element[];
  color?: string
}
export const Title = ({ children, color}: TitleProps) => {
  const theme = new Theme();
  color ??= theme.vars.accent1;
  return <h4
    className="mb-3"
    style={{ color }}
  >{children}</h4>;
};



export default Resume1;
