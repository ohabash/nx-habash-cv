"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn } from "../animation/FadeIn";
import { Container } from "../layout/Container";
import { useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { useWindowSize } from '@nx-habash/react-lib';

// logos
import logoFN from "@public/img/fn.png";
import logoJoma from "@public/img/joma.png";
import logoSP from "@public/img/sp.png";


type Project = {
  name: string;
  desc: string;
  images?: string[];
}
type TimelineItem = {
  title: string;
  date: string;
  description: string;
  company: string;
  logo: StaticImageData;
  projects?: Project[];
};
const data: TimelineItem[] = [
  {
    title: 'Senior Software Developer',
    date: 'Jun 2018 — Jul 2024',
    description:
      'Trained and managed a team of developers, played a central role in launching the company’s ecommerce & ERP software stack. My tenure was marked by achievements that transformed Fornida’s autonomous software landscape, Angular, NodeJS, Stripe, Mongo, Amazon SP-API, Microsoft Graph, BigCommerce',
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
      'Built an award-winning CMS and e-commerce theming platform. It used BigCommerce API’s and Google’s Angular to provide JOMA Tech’s clients with advanced control over content and design of their storefronts. This unique combination of tools allowed for ultra-modern features which reinvented how store owners interact with their customers on the web.',
    company: 'JOMA Tech',
    logo: logoJoma,
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
    title: 'Frontend Developer',
    date: 'Mar 2015 — Feb 2018',
    description:
      'Frontend Developer specializing in creating user-facing elements for ecommerce sites, with a strong foundation in development and design. Successfully designed, developed, and maintained over 30 ecommerce sites on Magento and BigCommerce. Led the migration of 14 Magento sites to BigCommerce, and developed a unique BigCommerce app that converts user ‘points’ into discounts, automatically syncing with accounting records. Used javascript and PHP',
    company: 'SUCCESS Partners',
    logo: logoSP,
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
];


export const Timeline = () => {
  const screen = useWindowSize();
  const wrapperEl = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperEl,
    offset: ['start start', 'end start'],
  });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const titleScale = useTransform(scrollYProgress, [0, 0.1], [0.8, 1]);
  const skillsX = useTransform(scrollYProgress, [0.8, 1], [0, screen.width]);
  return (
    <div
      className="py-[15vh] [--borderW:8px] bg-darker__ dark-shadow__ overflow-clip w-full"
      ref={wrapperEl}
    >
      <Container className="font-semibold space-y-12 relative z-10 px-[7vw]_">
        <motion.h1
          className="sticky top-[8.9rem] text-dark text-[3.5rem]"
          style={{
            opacity: titleOpacity,
            // scale: titleScale
          }}
        >
          EXPERIENCE
        </motion.h1>
        {data.map((item, index) => (
          <FadeIn key={'e-' + index}>
            <div className="flex border-b-[0px] border-subtle pb-16 ">
              {/* logo // company // time  */}
              <div className="flex pr-4 sticky top-14 self-start text-right">
                {/* company // Time */}
                <div className="flex items-center bg-gray-800 border-[var(--borderW)] border-white h-[6rem] border-r-0 mr-[-3rem] px-[5rem]">
                  <div>
                    <p className="font-bold">{item.date}</p>
                    <span className="text-lighten-7 font-medium">
                      {item.company}
                    </span>
                  </div>
                </div>

                {/* logo */}
                <div className="flex-shrink-0">
                  <div className="rounded-r-full overflow-clip bg-gray-800 border-[var(--borderW)] border-white border-l-0 p-2 flex items-center h-[6rem] w-[6rem]">
                    <Image
                      src={item.logo}
                      alt={`${item.company} logo`}
                      className="w-full h-full mr-4"
                    />
                  </div>
                </div>
              </div>

              {/* Copy */}
              <div className="flex-1">
                {/* title */}
                <div className="flex items-center mb-2">
                  <h3 className="text-lg font-semibold text-accent2">
                    {item.title}
                  </h3>
                </div>

                {/* desc */}
                <p className=" ">{item.description}</p>

                {/* projects */}
                <div className="flex-1">
                  {item.projects?.map((project, idx) => (
                    <FadeIn key={'p-' + idx}>
                      <div className="mt-4">
                        <p className="font-bold text-accent3">{project.name}</p>
                        <p className="">{project.desc}</p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </Container>
      <div className="blurrr bottom-[-14vh] absolute left-0 w-screen overflow-clip">
        <motion.div
          className="text-accent1 drop-shadow-lg shad font-black text-[9rem] pt-3 py-4"
          style={{
            x: skillsX,
            // scale: skillsScale
          }}
        >
          <h1>SKILLS</h1>
        </motion.div>
      </div>
    </div>
  );
};