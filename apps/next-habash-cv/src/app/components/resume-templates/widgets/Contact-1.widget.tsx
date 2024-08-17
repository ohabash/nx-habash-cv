import { FiSmartphone } from 'react-icons/fi';
import { BsEnvelope, BsLinkedin, BsGlobe } from 'react-icons/bs';
import './Contact-1.scss';

const data = [
  {
    icon: <FiSmartphone />,
    key: 'Phone',
    value: '+1 (123) 456-7890',
    href: 'tel:+11234567890',
  },
  {
    icon: <BsEnvelope />,
    key: 'Email',
    value: 'example@example.com',
    href: 'mailto:example@example.com',
  },
  {
    icon: <BsLinkedin />,
    key: 'LinkedIn',
    value: 'LinkedIn.com/in/yourprofile',
    href: 'https://www.linkedin.com/in/yourprofile',
    isLink: true,
  },
  {
    icon: <BsGlobe />,
    key: 'Portfolio',
    value: 'yourportfolio.com',
    href: 'https://www.yourportfolio.com',
    isLink: true,
  },
];

const ContactInfo1 = () => {
  return (
    <div className="grid grid-rows-4 h-full" id="widget-contact-1">
      {/* loop */}
      {data.map((item, index) => (
        <a
          href={item.href}
          key={index}
          className="item flex h-full items-center"
          target='_blank'
        >
          {item.icon}
          <div className="copy">
            <p className="sm key">{item.key}</p>
            <p className="sm val">{item.value}</p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default ContactInfo1;