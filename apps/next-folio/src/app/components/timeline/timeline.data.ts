import { StaticImageData } from "next/image";
// logos
import logoFN from "@public/img/fn.png";
import logoJoma from "@public/img/joma.png";
import logoSP from "@public/img/sp.png";

export type Project = {
  name: string;
  desc: string;
  images?: string[];
};

export type TimelineItem = {
  title: string;
  date: string;
  description: string;
  company: string;
  logo: StaticImageData;
  projects?: Project[];
  reasonForLeaving: string; // (AI only)
};
export const experience: TimelineItem[] = [
  {
    title: 'Senior Software Developer',
    date: 'Jun 2018 — Jul 2024',
    description:
      'Trained and managed a team of developers, played a central role in launching the company’s ecommerce & ERP software stack. My tenure was marked by achievements that transformed Fornida’s autonomous software landscape, Angular, NodeJS, Stripe, Mongo, Amazon SP-API, Microsoft Graph, BigCommerce',
    reasonForLeaving: 'TODO',
    company: 'Fornida',
    logo: logoFN,
    projects: [
      {
        name: 'ZaynTek.com & Fornida.com',
        desc: 'Leveraged Angular to build dynamic E-commerce storefronts - featuring a one-ofa- kind frontend editing experience that redefined product management for site administrators. Our NestJS backend facilitated integrations, including BigCommerce, for enhanced e-commerce capabilities. With tens of thousands of carefully categorized products we had to build robust SEO features which provided google with the latest product descriptions, reviews, prices, images and even stock levels. Today we proudly occupy first page results in google for most of our industries top products',
      },
      {
        name: 'Internal Listing Dashboard*',
        desc: 'This dashboard allowed admins to add 1000s of products to our e-com stores with ease. By providing a list of part numbers this tool would reach out to various APIs to combine product images, descriptions, tech specs, downloads, stock levels and sales history to create product pages which then automatically updated each sites’ sitemap and informed google of new data.',
      },
      {
        name: 'Microsoft Business Central ERP Dashboard',
        desc: 'Today, Fornida’s employees all use “DASH,” a custom ERP dashboard that combines all our major business processes in one software. It gives salespeople instant access to their performance metrics, quotes, orders, and invoices. Admins can tailor access per role, enhancing each user’s experience. DASH integrates with platforms like BigCommerce, Amazon, Shopify, and eBay, centralizing orders into standardized sales orders. For warehouse staff, it provides live KPIs like open orders and pending shipments, and for drop-shipped orders, it automatically updates the BuyReport, advising on procurement and streamlining purchase order creation.',
      },
    ],
  },
  {
    title: 'Senior Software Developer',
    date: 'Feb 2018 — Oct 2020',
    description:
      'Co-founded JOMA Tech with two former colleagues, building on our shared experience at SUCCESS Partners to address the unique challenges of the eCommerce industry. At JOMA Tech, we delivered tailored eCommerce solutions that set us apart—no two sites were alike, each featuring completely unique capabilities designed to fit our clients’ business needs like a glove. This position taught me the importance of leadership in a technical role, as many relied on me to deliver solutions that seemed impossible at the time. By adopting cutting-edge technologies and crafting innovative tools, we consistently exceeded expectations. I’m proud to say we delivered on our promise, creating a service that was unmatched in the industry. Our success enabled us to sustain a team of five full-time employees for over two years before joining Fornida to bring our expertise to an enterprise level.',
    reasonForLeaving: 'TODO',
    company: 'JOMA Tech',
    logo: logoJoma,
    projects: [
      {
        name: 'Meteorite CMS',
        desc: 'Meteorite CMS was built to transform headless eCommerce by addressing the limitations of the BigCommerce API. The system leveraged a PostgreSQL database, synchronized in real-time via webhooks, to provide developers with instant access to data, enabling them to work with unmatched efficiency. Meteorite unlocked the potential for advanced features, seamless workflow automation, and dynamic UI experiences, while extending functionality to include theming and page control. This project not only powered effortless SEO optimization for sites still thriving today but also ignited a deep passion in me to build tools that supercharge developer workflows, allowing them to do more with less effort! Available for a live demo upon request.',
      },
      {
        name: 'AMEC Home Loans',
        desc: 'Developed a custom website for AMEC Home Loans, designed to reflect their professionalism and build trust with customers seeking mortgage solutions. The site featured advanced home mortgage calculators, enabling customers to gain clear expectations and a deeper understanding of their mortgage qualifications and status. A geolocation-based agent finder connected users with local agents, each of whom was provided a personalized subdomain (e.g., bob.amec.com). Administrators could seamlessly manage these agent sites through the Meteorite CMS, while agents had tools to customize their pages for a tailored client experience. Each subdomain operated as a standalone entity in Google search rankings, boosting visibility and supporting AMEC’s mission to connect customers with reliable loan solutions.',
      },
      {
        name: 'Fornida Custom Server Builder',
        desc: 'At Fornida, I developed a powerful server configurator to simplify the complex process of building custom servers, ensuring compatibility across components and addressing the unique needs of customers. This tool tackled significant challenges, including creating an intuitive interface to display thousands of configuration possibilities and enabling administrators to set up and manage configurations effortlessly. It also facilitated seamless client interaction before purchase, providing customers with confidence in their multi-thousand-dollar investments. Overcoming BigCommerce’s SKU limitations, the configurator efficiently handled over 100,000 potential configurations while maintaining an exceptional user experience. The result was a tool that empowered both administrators and customers—check it out at Fornida.com.',
      },
    ],
  },
  {
    title: 'eCommerce Developer',
    date: 'Mar 2015 — Feb 2018',
    description:
      'Frontend Developer specializing in creating user-facing elements for ecommerce sites, with a strong foundation in development and design. Successfully designed, developed, and maintained over 30 ecommerce sites on Magento and BigCommerce. Led the migration of 14 Magento sites to BigCommerce, and developed a unique BigCommerce app that converts user ‘points’ into discounts, automatically syncing with accounting records. Used javascript and PHP',
    reasonForLeaving: 'TODO',
    company: 'SUCCESS Partners',
    logo: logoSP,
    projects: [
      {
        name: 'Launched 20 BigCommerce Stores in 6 Months',
        desc: 'Transitioned from Magento to BigCommerce, launching 20 new eCommerce stores within just six months. The cornerstone of this achievement was a custom-built code generator that scaffolded a new store, complete with all business logic, in a single command. This approach streamlined the process, leaving only theming as the final step for each store. A critical feature for these stores was Print on Demand (POD), allowing customers to customize products digitally, review proofs, and approve designs before completing their purchase. To handle the dynamic and evolving nature of the POD feature, we developed a centralized BigCommerce app. This app enabled us to push updates and bug fixes across all stores simultaneously, ensuring consistency and efficiency in operations. This innovative approach allowed us to deliver high-quality, fully functional eCommerce stores at an unprecedented pace.',
      },
      {
        name: 'Magento Monorepo',
        desc: "Spearheaded the development of a PHP monorepo engineered to streamline and standardize the operation of 25 Magento websites. Upon arrival, I identified an urgent need to eliminate developer overhead caused by maintaining separate codebases for each site. My solution was to create a centralized codebase that housed 90% of the business logic required for these websites, with individual sites differing only in their theming. By the project's completion, SUCCESS Partners could spin up a new website with the majority of the work already complete. The process was simplified to applying a unique theme and configuring deployment scripts with environment-specific credentials. This monorepo significantly increased efficiency, reduced maintenance overhead, and empowered the team to launch new projects quickly and consistently.",
      },
    ],
  },
];
