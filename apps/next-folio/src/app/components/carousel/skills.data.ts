export type SkillCopy = {
  title?: string;
  button?: string;
}
export type Skill = {
  poster: string;
  name: string;
  desc: string;
  url: string;
  icon?: string;
  iconClass?: string;
  copy?: SkillCopy;
  pinned: boolean;
};

const defaultCopy: SkillCopy = {
  title: 'Best video title ever1',
  button: 'Watch now1',
};

export const skills: Skill[] = [
  {
    poster: '/img/posters/openai.webp',
    name: 'OpenAI',
    desc: 'Experience with OpenAI API for building intelligent applications that leverage natural language processing and machine learning.',
    copy: defaultCopy,
    icon: '/img/logos/openai.png',
    url: 'https://beta.openai.com/docs/',
    pinned: true,
  },
  {
    poster: '/img/posters/js.jpg',
    name: 'JavaScript',
    desc: 'Over a decade of experience building dynamic and interactive web applications using JavaScript. Key for creating user-facing elements and handling client-side logic effectively.',
    copy: defaultCopy,
    icon: '/img/logos/js.webp',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    pinned: true,
  },
  {
    poster: '/img/posters/angular.png',
    name: 'Angular',
    desc: 'Expert in Angular, building complex and performant web applications. Leveraged it for projects like eCommerce platforms with dynamic UI and advanced SEO capabilities.',
    copy: defaultCopy,
    icon: '/img/logos/angular.webp',
    url: 'https://angular.io/',
    pinned: true,
  },
  {
    poster: '/img/posters/react.png',
    name: 'React',
    desc: 'Learning React to expand my skillset in component-based frameworks and enhance my ability to create efficient, reusable front-end components.',
    copy: defaultCopy,
    icon: '/img/logos/react.webp',
    url: 'https://reactjs.org/',
    pinned: true,
    iconClass: 'w-[60%]',
  },
  {
    poster: '/img/posters/ts.png',
    name: 'TypeScript',
    desc: 'Extensive experience using TypeScript for writing maintainable and scalable codebases, enabling type safety and reducing runtime errors in complex projects.',
    copy: defaultCopy,
    icon: '/img/logos/ts.png',
    url: 'https://www.typescriptlang.org/',
    pinned: true,
  },
  {
    poster: '/img/posters/nodejs.png',
    name: 'NodeJS',
    desc: 'Proficient in building server-side applications and APIs with NodeJS, ensuring high performance and scalability in backend systems.',
    copy: defaultCopy,
    icon: '/img/logos/nodejs.png',
    url: 'https://nodejs.org/',
    pinned: true,
  },
  {
    poster: '/img/posters/stripe.png',
    name: 'Stripe API',
    desc: 'Integrated Stripe API to enable secure and efficient payment processing across multiple projects, streamlining eCommerce transactions.',
    copy: defaultCopy,
    icon: '/img/logos/stripe.png',
    url: 'https://stripe.com/docs/api',
    pinned: false,
  },
  {
    poster: '/img/posters/mongo.png',
    name: 'MongoDB',
    desc: 'Experience with MongoDB in building NoSQL databases for scalable, real-time applications, optimizing data storage and retrieval.',
    copy: defaultCopy,
    icon: '/img/logos/mongo.webp',
    url: 'https://www.mongodb.com/',
    pinned: true,
  },
  {
    poster: '/img/posters/nextjs.png',
    name: 'NextJs',
    desc: 'Skilled in using Next.js for server-side rendering and building SEO-friendly React applications with fast load times.',
    copy: defaultCopy,
    icon: '/img/logos/nextjs.png',
    url: 'https://nextjs.org/docs',
    pinned: true,
  },
  {
    poster: '/img/posters/amazon.png',
    name: 'Amazon Selling Partner API',
    desc: 'Developed tools to integrate with the Amazon SP-API, automating inventory management and enhancing eCommerce functionalities.',
    copy: defaultCopy,
    icon: '/img/logos/amazon.png',
    url: 'https://developer-docs.amazon.com/sp-api',
    pinned: false,
  },
  {
    poster: '/img/posters/msbc.jpg',
    name: 'Microsoft Business Central',
    desc: 'Implemented custom dashboards and workflows using Microsoft Business Central to streamline ERP operations for enhanced productivity.',
    copy: defaultCopy,
    icon: '/img/logos/msbc.png',
    iconClass: 'w-[80%]',
    url: 'https://dynamics.microsoft.com/en-us/business-central/',
    pinned: false,
  },
  {
    poster: '/img/posters/shopify.jpg',
    name: 'Shopify',
    desc: 'Worked on Shopify integrations, optimizing storefronts and backend systems to align with unique business requirements.',
    copy: defaultCopy,
    icon: '/img/logos/shopify.png',
    url: 'https://www.shopify.com/',
    pinned: false,
  },
  {
    poster: '/img/posters/py.jpg',
    name: 'Python',
    desc: 'Applied Python for scripting and building backend services, leveraging its simplicity and versatility in data processing.',
    copy: defaultCopy,
    icon: '/img/logos/py.png',
    url: 'https://www.python.org/',
    pinned: false,
    iconClass: 'w-[80%] mt-2',
  },
  {
    poster: '/img/posters/firebase.jpg',
    name: 'Firebase',
    desc: 'Utilized Firebase for real-time databases, authentication, and hosting, simplifying app development and deployment.',
    copy: defaultCopy,
    icon: '/img/logos/firebase.webp',
    url: 'https://firebase.google.com/',
    pinned: false,
  },
  {
    poster: '/img/posters/nx.jpg',
    name: 'NX Monorepos',
    desc: 'Experienced in using NX to manage monorepos, improving code reuse and streamlining development workflows in large projects.',
    copy: defaultCopy,
    icon: '/img/logos/nx.png',
    url: 'https://nx.dev/',
    pinned: false,
  },
  {
    poster: '/img/posters/azure.jpg',
    name: 'Azure',
    desc: 'Worked with Azure for cloud solutions, including hosting, serverless computing, and database management.',
    copy: defaultCopy,
    icon: '/img/logos/azure.png',
    url: 'https://azure.microsoft.com/',
    pinned: false,
  },
  {
    poster: '/img/posters/monday.webp',
    name: 'Monday.com App Development',
    desc: 'Developed custom apps on Monday.com to automate workflows and improve team collaboration through tailored solutions.',
    copy: defaultCopy,
    icon: '/img/logos/monday.webp',
    url: 'https://azure.microsoft.com/',
    pinned: false,
  },
];
