import { StaticImageData } from 'next/image';
// logos
import logoFN from '@public/img/fn.png';
import logoJoma from '@public/img/joma.png';
import logoSP from '@public/img/sp.png';
import logoFoodReady from '@public/img/FoodReady.jpeg';

export type Project = {
  name: string;
  desc: string;
  images?: string[];
};

export type TimelineItem = {
  title: string;
  date: string;
  shortDate: string;
  description: string;
  company: string;
  logo: StaticImageData;
  projects?: Project[];
  reasonForLeaving: string; // (AI only)
};
export const experience: TimelineItem[] = [
  {
    title: 'Senior Software Developer',
    date: 'Dec 2024 — Jul 2025',
    shortDate: '12/24 — 7/25',
    description:
      "Architected scalable backend infrastructure replacing monolithic systems with event-driven microservices. Delivered enterprise-grade authentication, integration platform, and developer tooling that accelerated feature delivery while maintaining SOC2 compliance. TypeScript, Express, NX, BetterAuth, N8N, OAuth workflows.",
    reasonForLeaving: 'TODO',
    company: 'FoodReady.ai',
    logo: logoFoodReady, // You'll need to import this
    projects: [
      {
        name: 'Scalable Backend Infrastructure',
        desc: 'Replaced monolithic architecture with TypeScript Express monorepo using NX generators. Created scaffolding system enabling developers to generate complete SDKs with routes, tests, and services in consistent patterns. Implemented decorator-based routing (@GET/@POST) and validation (@validate) reducing boilerplate code by 70%.',
      },
      {
        name: 'Enterprise Authentication & RBAC',
        desc: 'Built headless SaaS authentication hub using BetterAuth supporting multiple services including legacy APIs, N8N workflows, and MCP servers. Developed reusable NPM authentication modules enabling seamless login integration across infrastructure while maintaining SOC2 compliance and role-based access control.',
      },
      {
        name: 'Pulse Event Orchestration Platform',
        desc: 'Designed event-driven programming library enabling real-time business process automation. System allows users to define database events triggering HTTP requests, N8N workflows, or cloud functions. Built management UI empowering customers to configure custom event-action workflows for compliance monitoring and operational automation.',
      },
      {
        name: 'Universal Integration Platform',
        desc: 'Developed ground-up integration system addressing customer demand for external software connectivity. Created OAuth workflow engine with reusable authentication patterns and visual N8N-based data flows. Platform supports complex logging across system, organization, and execution levels enabling seamless third-party integrations like QuickBooks.',
      },
    ],
  },
  {
    title: 'Senior Software Developer',
    date: 'Jun 2018 — Jul 2024',
    shortDate: '6/18 — 7/24',
    description:
      "Trained and managed a team of developers, played a central role in launching the company's ecommerce & ERP software stack. My tenure was marked by achievements that transformed Fornida's autonomous software landscape, Angular, NodeJS, Stripe, Mongo, Amazon SP-API, Microsoft Graph, BigCommerce.",
    reasonForLeaving: 'TODO',
    company: 'Fornida',
    logo: logoFN,
    projects: [
      {
        name: 'ZaynTek.com & Fornida.com',
        desc: 'Leveraged Angular to build dynamic E-commerce storefronts with unique frontend editing experience. NestJS backend facilitated BigCommerce integrations. Robust SEO features provided Google with latest product data, achieving first-page results for industry products.',
      },
      {
        name: 'Internal Listing Dashboard*',
        desc: 'Dashboard allowed admins to add thousands of products easily. By providing part numbers, tool reached out to APIs combining product images, descriptions, specs, stock levels creating pages that automatically updated sitemaps and informed Google.',
      },
      {
        name: 'Microsoft Business Central ERP Dashboard',
        desc: 'A React dashboard. "DASH" is a custom ERP dashboard combining major business processes. Integrated BigCommerce, Amazon, Shopify, eBay centralizing orders. Provided live KPIs, automated BuyReport updates, streamlined purchase order creation for warehouse operations.',
      },
    ],
  },
  {
    title: 'Senior Software Developer',
    date: 'Feb 2018 — Oct 2020',
    shortDate: '2/18 — 10/20',
    description:
      "Co-founded JOMA Tech with two former colleagues, building on shared experience to address unique eCommerce challenges. Delivered tailored solutions with completely unique capabilities designed to fit clients' business needs. Led technical innovation using cutting-edge technologies, sustaining five full-time employees.",
    reasonForLeaving: 'TODO',
    company: 'JOMA Tech',
    logo: logoJoma,
    projects: [
      {
        name: 'Meteorite CMS',
        desc: 'Built headless eCommerce CMS addressing BigCommerce API limitations. PostgreSQL database synchronized via real-time webhooks provided instant data access. Enabled advanced features, workflow automation, dynamic UI experiences while extending functionality for theming and page control.',
      },
      {
        name: 'AMEC Home Loans',
        desc: 'Developed custom website with advanced mortgage calculators and geolocation-based agent finder. Personalized agent subdomains managed through Meteorite CMS. Each subdomain operated as standalone entity in Google search rankings, boosting visibility.',
      },
      {
        name: 'Fornida Custom Server Builder',
        desc: 'Developed server configurator simplifying complex component compatibility while handling thousands of configuration possibilities. Overcame BigCommerce SKU limitations, efficiently managing 100,000+ potential configurations while maintaining exceptional user experience for multi-thousand-dollar investments.',
      },
    ],
  },
  {
    title: 'eCommerce Developer',
    date: 'Mar 2015 — Feb 2018',
    shortDate: '3/15 — 2/18',
    description:
      'Frontend Developer specializing in creating user-facing elements for ecommerce sites. Successfully designed, developed, and maintained over 30 ecommerce sites on Magento and BigCommerce. Led migration of 14 Magento sites to BigCommerce, developed unique BigCommerce app.',
    reasonForLeaving: 'TODO',
    company: 'SUCCESS Partners',
    logo: logoSP,
    projects: [
      {
        name: 'Launched 20 BigCommerce Stores in 6 Months',
        desc: 'Transitioned from Magento to BigCommerce, launching 20 stores within six months. Built custom code generator scaffolding new stores with business logic in single command. Developed centralized BigCommerce app for Print on Demand features enabling simultaneous updates.',
      },
      {
        name: 'Magento Monorepo',
        desc: 'Spearheaded PHP monorepo development streamlining 25 Magento websites. Created centralized codebase housing 90% of business logic, eliminating developer overhead from separate codebases. Enabled rapid deployment with unique theming and environment-specific configurations.',
      },
    ],
  },
];
