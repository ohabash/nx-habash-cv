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
  reasonForLeaving: string; // (AI only)
};
const data: TimelineItem[] = [
  {
    title: 'Senior Software Developer',
    date: 'Jun 2018 — Jul 2024',
    description:
      'Trained and managed a team of developers, played a central role in launching the company’s ecommerce & ERP software stack. My tenure was marked by achievements that transformed Fornida’s autonomous software landscape, Angular, NodeJS, Stripe, Mongo, Amazon SP-API, Microsoft Graph, BigCommerce',
    reasonForLeaving: "TODO",
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
    reasonForLeaving: "TODO",
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
    reasonForLeaving: "TODO",
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


export const Timeline = () => {
  const screen = useWindowSize();
  const wrapperEl = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperEl,
    offset: ['start start', 'end start'],
  });
  const dialEl = useRef<HTMLDivElement>(null);
  const { scrollYProgress:dialScrollYProgress } = useScroll({
    target: dialEl,
    offset: ['start start', 'end start'],
  });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const titleScale = useTransform(scrollYProgress, [0, 0.1], [0.8, 1]);
  const copyScale = useTransform(
    dialScrollYProgress,
    [0, 0.5, 1],
    [0.6, 1, 0.6]
  );
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
                <p className=" ">*{item.description}</p>

                {/* projects */}
                <div className="flex-1">
                  {item.projects?.map((project, idx) => (
                    <FadeIn scale={false} key={'p-' + idx} ref={dialEl}>
                      <motion.div
                        className="mt-4"
                        // style={{ scale: copyScale }}
                      >
                        <p className="font-bold text-accent3">{project.name}</p>
                        <p className="">{project.desc}</p>
                      </motion.div>
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
          style={
            {
              // x: skillsX,
              // scale: skillsScale
            }
          }
        >
          <h1>SKILLS</h1>
        </motion.div>
      </div>
    </div>
  );
};