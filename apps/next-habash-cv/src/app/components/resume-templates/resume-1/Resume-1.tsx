import profilePic from '../../../assets/img/profile.webp';
import Image from 'next/image';
import './Resume-1.scss';
import { ThemerService } from '../../../services/themer.service';
import ContactInfo1 from '../widgets/Contact-1.widget';
import Education1 from '../widgets/Education-1.widget';
import Education2 from '../widgets/Education-2.widget';


export class Theme {
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
    accent1: `${this.bg('red')} text-white`,
    light: `bg-gray-100 text-${this.text('dark')}  `,
    dark: `${this.bg('dark')} text-white `,
    grey: `bg-gray-300 text-black `,
  };
}

const Resume1 = () => {
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
    };


  // template
  return (
    <div className="resume-1 h-full">
      <div className="text-white bg-[#cd5f5a] bg-[#2c2c2c]"></div>
      <div className="grid grid-rows-[1fr,1.75fr,1fr] h-full">
        
        {/* row 1 */}
        <div className="grid grid-cols-3">
          <div className={theme.sec.accent1 + ' p-4 flex items-center'}>
            <div className="copy -mt-2">
              <h1>Omar Habash</h1>
              <h2 className="mt-2">Senior UI Developer</h2>
            </div>
          </div>
          <div className="bg-blue-950">
            <Image
              className="w-full h-full object-cover opacity-90"
              src={profilePic}
              alt="Description"
              width={500}
              height={300}
            />
          </div>
          <div className={theme.sec.accent1 + ' p-4'}>
            <ContactInfo1></ContactInfo1>
          </div>
        </div>

        {/* row 2 */}
        <div className="grid grid-cols-3">
          <div className={theme.sec.light + 'p-4'}>
            <Education2></Education2>
          </div>
          <div className={theme.sec.dark + ' text-white p-4'}>
            <div tilt-inner="true">
              <h3>Skills</h3>
            </div>
          </div>
          <div className={theme.sec.light + 'p-4'}>
            <div tilt-inner="true">
              <h3>Experience</h3>
            </div>
          </div>
        </div>

        {/* row 3 */}
        <div className="grid grid-cols-3">
          <div className={theme.sec.grey + 'p-4'}>
            <h3>Mission</h3>
          </div>
          <div className={theme.sec.light + 'p-4'}>
            <h3>References</h3>
          </div>
          <div className={theme.sec.grey + 'p-4'}>
            <h3>Links</h3>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Resume1;
