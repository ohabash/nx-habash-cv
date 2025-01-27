export type SkillCopy = {
  title?: string;
  button?: string;
}
export type Skill = {
  poster: string;
  name: string;
  desc: string;
  desc2: string;
  url: string;
  icon?: string;
  iconClass?: string;
  copy?: SkillCopy;
  pinned: boolean;
};

export const skills: Skill[] = [
  {
    poster: '/img/posters/openai.webp',
    name: 'OpenAI',
    desc: 'Experience with OpenAI API for building intelligent applications that leverage natural language processing and machine learning.',
    desc2:
      "I used OpenAI's GPT-3 to generate human-like text, enabling chatbots, content creation, and more for this portfolio. I used it to automate listing creation at HabashRVs ",
    icon: '/img/logos/openai.png',
    url: 'https://beta.openai.com/docs/',
    pinned: true,
  },
  {
    poster: '/img/posters/js.jpg',
    name: 'JavaScript',
    desc: 'Over a decade of experience building dynamic and interactive web applications using JavaScript. Key for creating user-facing elements and handling client-side logic effectively.',
    desc2:
      "JavaScript is the foundation of my web development journey. I've used it for 12 years now. ",
    icon: '/img/logos/js.webp',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    pinned: true,
  },
  {
    poster: '/img/posters/angular.png',
    name: 'Angular',
    desc: 'Expert in Angular, building complex and performant web applications. Leveraged it for projects like eCommerce platforms with dynamic UI and advanced SEO capabilities.',
    desc2:
      'I have used Angular for 7 years now. Back when it was called AngularJS even. When it first came out I remember how exciting and different it was to code within a reactive SPA.',
    icon: '/img/logos/angular.webp',
    url: 'https://angular.io/',
    pinned: true,
  },
  {
    poster: '/img/posters/react.png',
    name: 'React',
    desc: 'Learning React to expand my skillset in component-based frameworks and enhance my ability to create efficient, reusable front-end components.',
    desc2:
      "React is my most recent addition to my skillset. I've been using it for 1 years now. I never remember a time choosing Angular over React. Angular was simply the one i learned first and kept building on to it; making that my go-to. However now that I know both very well I can easily say that they both have pros and cons. There are features from both that i never want to code without. I especially love how portable and loose React components are.",
    icon: '/img/logos/react.webp',
    url: 'https://reactjs.org/',
    pinned: true,
    iconClass: 'w-[60%]',
  },
  {
    poster: '/img/posters/ts.png',
    name: 'TypeScript',
    desc: 'Extensive experience using TypeScript for writing maintainable and scalable codebases, enabling type safety and reducing runtime errors in complex projects.',
    desc2:
      "Learning Typescript was a game changer for me. I've been using it for 5 years now. I remember how much I struggled with JavaScript and how much I loved it. I remember not knowing why i needed TypeScript. However now days i never want to go back to programming without Type safety again. It's a must for me now.",
    icon: '/img/logos/ts.png',
    url: 'https://www.typescriptlang.org/',
    pinned: true,
  },
  {
    poster: '/img/posters/nodejs.png',
    name: 'NodeJS',
    desc: 'Proficient in building server-side applications and APIs with NodeJS, ensuring high performance and scalability in backend systems.',
    desc2:
      'Ive been using NodeJS for almost as long as ive been using JavaScript. Years ago PHP was my go-to for backend. However now days using TypeScript on the front and back is a must for me. Combine that with a mono repo you have a stack that is hard to beat and easy to learn.',
    icon: '/img/logos/nodejs.png',
    url: 'https://nodejs.org/',
    pinned: true,
  },
  {
    poster: '/img/posters/stripe.png',
    name: 'Stripe API',
    desc: 'Integrated Stripe API to enable secure and efficient payment processing across multiple projects, streamlining eCommerce transactions.',
    desc2:
      "I started using stripe to make custom carts and checkouts for various projects. I love their API and how easy it is to use. I've been using it for 3 years now.",
    icon: '/img/logos/stripe.png',
    url: 'https://stripe.com/docs/api',
    pinned: false,
  },
  {
    poster: '/img/posters/mongo.png',
    name: 'MongoDB',
    desc: 'Experience with MongoDB in building NoSQL databases for scalable, real-time applications, optimizing data storage and retrieval.',
    desc2:
      'MongoDB was a game changer for me. I love the flexibility and speed of it. It has been my go to database for 5 years now. I have so much reusable code to jump start a backend or frontend project with. Let me know if you would like for me to share some of it with you.',
    icon: '/img/logos/mongo.webp',
    url: 'https://www.mongodb.com/',
    pinned: true,
  },
  {
    poster: '/img/posters/nextjs.png',
    name: 'NextJs',
    desc: 'Skilled in using Next.js for server-side rendering and building SEO-friendly React applications with fast load times.',
    desc2:
      "After using Angular for so many years struggling to render pages server side. I was so happy to find NextJs. I've been using it for a year now. I love how easy it is to use and how fast it is to render pages server side. Bluring the lines between frontend and backend is something i thought about long before being introduced to next. I honestly wish i started it sooner.",
    icon: '/img/logos/nextjs.png',
    url: 'https://nextjs.org/docs',
    pinned: true,
  },
  {
    poster: '/img/posters/amazon.png',
    name: 'Amazon Selling Partner API',
    desc: 'Developed tools to integrate with the Amazon SP-API, automating inventory management and enhancing eCommerce functionalities.',
    desc2:
      "I have extensive experience building custom applications using the Amazon Selling Partner API (SP-API). My projects include solutions for fulfillment, inventory tracking, automated listing creation, and pricing algorithms that outperformed the competition. Several of these applications are still actively in production. I'd be happy to showcase them upon request.",
    icon: '/img/logos/amazon.png',
    url: 'https://developer-docs.amazon.com/sp-api',
    pinned: false,
  },
  {
    poster: '/img/posters/msbc.jpg',
    name: 'Microsoft Business Central',
    desc: 'I have hands-on experience working with Microsoft Business Central, leveraging its robust ERP capabilities to streamline business processes and drive operational efficiency during my time at Fornida. One standout project involved using event listeners to build replica databases in MongoDB for nearly every major dataset in Business Central. This enabled real-time synchronization, enhanced reporting, and seamless custom integrations. Additionally, I implemented tailored workflows, automated reporting, and configured modules for finance, inventory management, and sales to align with organizational needs. My expertise also includes creating custom APIs and integrating third-party tools to ensure scalability and agility. I’d be happy to provide a demo showcasing these solutions upon request.',
    desc2: 'defaultCopy',
    icon: '/img/logos/msbc.png',
    iconClass: 'w-[80%]',
    url: 'https://dynamics.microsoft.com/en-us/business-central/',
    pinned: false,
  },
  {
    poster: '/img/posters/shopify.jpg',
    name: 'Shopify',
    desc: 'Worked on Shopify integrations, optimizing storefronts and backend systems to align with unique business requirements.',
    desc2:
      'I used Shopify to build custom eCommerce solutions for clients, including theme development, app integrations, and API customizations. I have experience with Shopify Plus and have developed scalable solutions for high-volume stores. I also created custom apps to automate workflows, enhance customer experiences, and improve operational efficiency. I’d be happy to provide a demo of these projects upon request.',
    icon: '/img/logos/shopify.png',
    url: 'https://www.shopify.com/',
    pinned: false,
  },
  {
    poster: '/img/posters/bigcommerce.jpeg',
    name: 'BigCommerce',
    desc: 'At JOMA Tech, BigCommerce’s go-to partner, I built innovative tools like a server builder, headless commerce solutions, and dynamic B2B features.',
    desc2:
      'At JOMA Tech, a certified BigCommerce partner and their trusted agency for complex challenges, I led the development of innovative eCommerce solutions that set new standards for the industry. As a co-founder alongside two colleagues from SUCCESS Partners, I helped establish JOMA Tech to address the limitations of the eCommerce tools available at the time. We provided clients with speed, control, and beautiful designs by creating tools that served their unique needs while maintaining individuality across sites. One of our flagship innovations was Meteorite CMS, a headless solution that overcame the limitations of the BigCommerce API by syncing datasets to a Postgres SQL database with webhooks for real-time updates. This allowed us to query and join datasets, automate workflows, and enable non-commerce features like theming and page control. Meteorite not only gave developers the freedom to build any feature but also provided unparalleled SEO capabilities, with several of our sites still performing exceptionally today. In addition to my work at JOMA Tech, I also led groundbreaking projects at SUCCESS Partners and Fornida. At SUCCESS Partners, I created a monorepo architecture to support 25 Magento sites, consolidating 90% of business logic into a single codebase. This streamlined development, allowing new sites to be launched with minimal effort by simply adding a theme and deployment configuration. Later, I spearheaded the migration of 20 Magento stores to BigCommerce in just six months. I developed a code generator that scaffolded stores with all business logic in one command, leaving only the theming to be customized. To support features like Print on Demand (POD), I built a centralized BigCommerce app that allowed for real-time digital customizations and seamless updates across all stores. At Fornida, I tackled the complexities of custom server configurations by building a robust server configurator. This tool allowed administrators to easily set up and manage configurations, interact with clients during the pre-purchase process, and handle thousands of potential component combinations through a user-friendly Angular interface. By overcoming BigCommerce’s SKU limitations and integrating real-time client collaboration, the configurator empowered customers to confidently invest in high-value, custom-built servers. Through these projects, I demonstrated a consistent ability to leverage cutting-edge technologies, streamline development workflows, and deliver innovative solutions that met complex client needs while maintaining scalability and efficiency.',
    icon: '/img/logos/bigcommerce.png',
    url: 'https://developer.bigcommerce.com/docs/api',
    pinned: false,
  },
  {
    poster: '/img/posters/py.jpg',
    name: 'Python',
    desc: 'Applied Python for scripting and building backend services, leveraging its simplicity and versatility in data processing.',
    desc2:
      'python was my first backend experience. I used it with drupal and flask apps. I even used it to build custom Alexa apps.',
    icon: '/img/logos/py.png',
    url: 'https://www.python.org/',
    pinned: false,
    iconClass: 'w-[80%] mt-2',
  },
  {
    poster: '/img/posters/firebase.jpg',
    name: 'Firebase',
    desc: 'Utilized Firebase for real-time databases, authentication, and hosting, simplifying app development and deployment.',
    desc2:
      'Firebase has been my go-to backend-as-a-service solution for the past five years, especially for small to medium-sized projects requiring real-time features. It excels in providing quick and reliable storage, authentication, hosting, and cloud functions, making it a powerful tool when time is of the essence. While it may not be the right fit for every project, I fully appreciate its ease of use and flexibility, and I know I can always count on it to deliver when needed. Im not the type of developer that will deny it extreme convenience and cost savings.',
    icon: '/img/logos/firebase.webp',
    url: 'https://firebase.google.com/',
    pinned: false,
  },
  {
    poster: '/img/posters/nx.jpg',
    name: 'NX Monorepos',
    desc: 'Experienced in using NX to manage monorepos, improving code reuse and streamlining development workflows in large projects.',
    desc2:
      'Oh my god I love using NX to manage monorepos. I have been using it for 4 years now. I love how easy it is to use and how much time it saves me. I have so much reusable code to jump start a backend or frontend project with. I love the code generators that i use to scaffold and maintain consistency on my teams.',
    icon: '/img/logos/nx.png',
    url: 'https://nx.dev/',
    pinned: false,
  },
  {
    poster: '/img/posters/azure.jpg',
    name: 'Azure',
    desc: 'Worked with Azure for cloud solutions, including hosting, serverless computing, and database management.',
    desc2:
      'Azure is my go-to cloud solution for enterprise projects. I have been using it for 5 years now. I love how easy it is to use and how much time it saves me. ',
    icon: '/img/logos/azure.png',
    url: 'https://azure.microsoft.com/',
    pinned: false,
  },
  {
    poster: '/img/posters/monday.webp',
    name: 'Monday.com App Development',
    desc: 'Developed custom apps on Monday.com to automate workflows and improve team collaboration through tailored solutions.',
    desc2:
      'I helped automate the family business with monday.com. I have been using it for 2 years now. I love how easy it is to customize the views and extract data from it. Ask about a project i made that allowed HabashRVs to manage their WIX inventory with monday. In terms of Micro SaaS I would start here.',
    icon: '/img/logos/monday.webp',
    url: 'https://azure.microsoft.com/',
    pinned: false,
  },
];
