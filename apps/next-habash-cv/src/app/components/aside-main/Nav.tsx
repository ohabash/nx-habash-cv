import { INavItem } from './nav.interface';
import { NavItem } from './NavItem';
import { IoIosHome } from 'react-icons/io';
import { FaCircleUser } from 'react-icons/fa6';
import { BiSolidUserAccount } from 'react-icons/bi';
import { IoSchoolSharp } from 'react-icons/io5';
import { MdPhonelink } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
import { FaUserNinja } from 'react-icons/fa';
import { SiAdobeillustrator } from 'react-icons/si';
import { FaReact } from 'react-icons/fa';
import { FaFilePen } from 'react-icons/fa6';
import { MdDocumentScanner } from 'react-icons/md';
import { IoDocumentsSharp } from 'react-icons/io5';
import { RiLayout5Fill } from 'react-icons/ri';
import { BsOpencollective } from 'react-icons/bs';
import { FaMobile } from 'react-icons/fa';

// data
const menu: Array<INavItem> = [
  {
    title: 'Home',
    icon: <IoIosHome />,
    subMenu: [
      {
        title: 'About Me',
        icon: <FaCircleUser />,
      },
      {
        title: 'Experience',
        icon: <BiSolidUserAccount />,
      },
      {
        title: 'Education',
        icon: <IoSchoolSharp />,
      },
      {
        title: 'Links',
        icon: <MdPhonelink />,
      },
      {
        title: 'References',
        icon: <FaUsers />,
      },
      {
        title: 'Skills',
        icon: <FaUserNinja />,
      },
    ],
  },
  {
    title: 'Documents',
    icon: <IoDocumentsSharp />,
    subMenu: [
      {
        title: 'Resume',
        icon: <SiAdobeillustrator />,
      },
      {
        title: 'Resume - CV',
        icon: <MdDocumentScanner />,
      },
      {
        title: 'Resume - React',
        icon: <FaReact />,
      },
      {
        title: 'Cover Letter',
        icon: <FaFilePen />,
      },
    ],
  },
  {
    title: 'Projects',
    icon: <RiLayout5Fill />,
  },
  {
    title: 'Blog',
    icon: <BsOpencollective />,
  },
  {
    title: 'Contact',
    icon: <FaMobile />,
  },
];

// component <Nav/>
export const Nav = () => {
  return (
    <ul className="nav p-4 ">
      {menu.map((item, i) => (
        <NavItem isChild={false} item={item} key={i+'p'}>
          {item.subMenu && (
            <ul className="submenu">
              {item.subMenu.map((subItem, ii) => (
                <NavItem key={ii+i+'s'} isChild={true} item={subItem}></NavItem>
              ))}
            </ul>
          )}
        </NavItem>
      ))}
    </ul>
  );
};
