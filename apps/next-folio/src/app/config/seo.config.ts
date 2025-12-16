import { Metadata } from 'next';

/**
 * Centralized SEO Configuration
 * All metadata and structured data definitions in one place
 */

// Site-wide constants
export const SITE_CONFIG = {
  name: 'Omar Habash Portfolio',
  author: 'Omar Habash',
  url: 'https://omarhabash.com',
  email: 'omar@omarhabash.com',
  phone: '+1-XXX-XXX-XXXX', // Replace with actual
  linkedin: 'https://www.linkedin.com/in/omar-habash-71877b40/',
  github: 'https://github.com/omarhabash',
  twitter: '@omarhabash',
  image: '/img/auth_poster.webp',
  imageWidth: 1200,
  imageHeight: 630,
} as const;

// Base metadata for root layout
export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  applicationName: SITE_CONFIG.name,
  referrer: 'origin-when-cross-origin',
  authors: [{ name: SITE_CONFIG.author, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.author,
  publisher: SITE_CONFIG.author,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  manifest: '/manifest.json',
};

// Homepage metadata
export const homeMetadata: Metadata = {
  title: 'Omar Habash | Full Stack Engineer - Web Development & Automation Expert',
  description:
    'Hire Omar Habash for web development, automation, and AI integration. Expert in React, Node.js, TypeScript. Specializing in custom web applications, workflow automation, e-commerce solutions, and modern full-stack development. Available for consulting and full-time positions.',
  keywords: [
    // Primary Services
    'Web Development Services',
    'Web Automation Expert',
    'Full Stack Developer for Hire',
    'Hire Full Stack Engineer',
    'Web Programming Services',
    'Custom Web Application Development',
    'Workflow Automation Consultant',

    // Technologies - High Value
    'React Developer',
    'Next.js Developer',
    'Node.js Developer',
    'TypeScript Expert',
    'JavaScript Developer',

    // Automation & AI
    'n8n Automation Expert',
    'Process Automation Developer',
    'AI Integration Services',
    'OpenAI Integration',
    'Workflow Automation Solutions',
    'Business Process Automation',

    // E-commerce
    'E-commerce Developer',
    'BigCommerce Developer',
    'Shopify Developer',
    'Headless Commerce',

    // Cloud & DevOps
    'Cloud Architecture',
    'Azure Developer',
    'AWS Developer',
    'DevOps Engineer',

    // Full Stack
    'MongoDB Developer',
    'API Development',
    'REST API Development',
    'Database Design',
    'Microservices Architecture',

    // Business Terms
    'Senior Software Engineer',
    'Technical Consultant',
    'Web Design Services',
    'UX Developer',
    'Software Architect',
  ],
  authors: [{ name: SITE_CONFIG.author }],
  creator: SITE_CONFIG.author,
  publisher: SITE_CONFIG.author,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Hire Omar Habash | Full Stack Engineer - Web Development & Automation',
    description:
      'Looking for a Full Stack Engineer? Omar specializes in web development, automation, and AI integration. Expert in React, Node.js, n8n automation, and e-commerce solutions. Available for consulting and full-time positions.',
    url: SITE_CONFIG.url,
    siteName: 'Omar Habash - Full Stack Engineer',
    images: [
      {
        url: SITE_CONFIG.image,
        width: SITE_CONFIG.imageWidth,
        height: SITE_CONFIG.imageHeight,
        alt: 'Omar Habash - Full Stack Engineer specializing in Web Development and Automation',
      },
    ],
    locale: 'en_US',
    type: 'profile',
    countryName: 'United States',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hire Omar Habash | Full Stack Engineer - Web Development & Automation',
    description:
      'Full Stack Engineer specializing in web development, automation, AI integration. Expert in React, Node.js, n8n. Available for hire.',
    images: [SITE_CONFIG.image],
    creator: SITE_CONFIG.twitter,
    site: SITE_CONFIG.twitter,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  category: 'technology',
  classification: 'Professional Services, Web Development, Software Engineering',
  other: {
    'contact:email': SITE_CONFIG.email,
    'contact:phone_number': SITE_CONFIG.phone,
    availability: 'Available for hire',
    'service:type': 'Web Development, Automation, AI Integration',
    'service:location': 'United States',
  },
};

// Structured Data / JSON-LD Schemas
export const structuredDataSchemas = [
  // Person Schema
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_CONFIG.url}/#person`,
    name: SITE_CONFIG.author,
    jobTitle: 'Senior Full Stack Engineer',
    description:
      'Senior Full Stack Engineer specializing in web automation, AI-driven solutions, and modern web development.',
    url: SITE_CONFIG.url,
    image: `${SITE_CONFIG.url}${SITE_CONFIG.image}`,
    sameAs: [SITE_CONFIG.linkedin, SITE_CONFIG.github],
    knowsAbout: [
      'Web Development',
      'Full Stack Development',
      'Web Automation',
      'Process Automation',
      'React',
      'Next.js',
      'Node.js',
      'TypeScript',
      'JavaScript',
      'AI Integration',
      'Cloud Architecture',
      'MongoDB',
      'API Development',
      'n8n Automation',
      'E-commerce Development',
    ],
  },
  // ProfessionalService Schema
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_CONFIG.url}/#service`,
    name: 'Omar Habash - Web Development & Automation Services',
    description: 'Professional web development, automation, and AI integration services.',
    url: SITE_CONFIG.url,
    image: `${SITE_CONFIG.url}${SITE_CONFIG.image}`,
    priceRange: '$$$$',
    serviceType: ['Web Development', 'Web Automation', 'AI Integration', 'E-commerce Development'],
    provider: { '@id': `${SITE_CONFIG.url}/#person` },
  },
  // WebSite Schema
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.url}/#website`,
    url: SITE_CONFIG.url,
    name: 'Omar Habash - Full Stack Engineer Portfolio',
    publisher: { '@id': `${SITE_CONFIG.url}/#person` },
  },
  // WebPage Schema
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_CONFIG.url}/#webpage`,
    url: SITE_CONFIG.url,
    name: 'Omar Habash | Full Stack Engineer',
    isPartOf: { '@id': `${SITE_CONFIG.url}/#website` },
    about: { '@id': `${SITE_CONFIG.url}/#person` },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${SITE_CONFIG.url}${SITE_CONFIG.image}`,
      width: SITE_CONFIG.imageWidth,
      height: SITE_CONFIG.imageHeight,
    },
  },
] as const;








