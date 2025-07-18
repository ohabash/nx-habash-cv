import SessionProvider from '@/components/auth/SessionProvider';
import { ThemeWrapper } from '@/components/layout/Theme';
import { GlobalProvider } from '@/global.context';
import { getServerSession } from 'next-auth';
import { CopilotKit } from '@copilotkit/react-core';
import QueryProvider from '@/providers/QueryProvider';
import { CopilotSidebar } from '@copilotkit/react-ui';
import '@copilotkit/react-ui/styles.css';
import { CopilotKitCSSProperties } from '@copilotkit/react-ui';
import { Theme } from '../../../theme/theme-vars';
import AiBody from '@/components/copilotKit/components/AiBody';
import { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';

// global styles
import './../styles.scss';

const title = 'Omar Habash | Full Stack Engineer';
const description = 'Senior Full Stack Engineer specializing in UX and Developer experience, and AI-driven solutions, React, Node.js, and cloud architecture.';
const images = [
  {
    url: '/img/auth_poster.webp',
    width: 1200,
    height: 630,
    alt: 'Omar Habash - Full Stack Engineer'
  }
];

export const metadata: Metadata = {
  title,
  description: `${description} Building innovative, scalable applications with modern tech.`,
  openGraph: {
    title,
    description,
    url: 'https://omarhabash.com',
    siteName: 'Omar Habash Portfolio',
    images,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: images.map(img => img.url),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // verification: {
  //   google: 'your-google-verification-code', // Add this if you have one
  // },
};

const theme = new Theme();

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MWD4424C');
          `}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-MWD4424C"
            height="0" 
            width="0" 
            style={{
              display: 'none',
              visibility: 'hidden'
            }}
          />
        </noscript>
        <div id="MODAL"></div>
        <CopilotKit 
          publicApiKey="ck_pub_d9dbf528536f4e9f115badfc68eb13cc"
        >
          <QueryProvider>
            <SessionProvider session={session}>
              <GlobalProvider>
                <ThemeWrapper>
                  <div
                    style={
                      {
                        "--copilot-kit-primary-color": theme.colors.blue,
                        "--copilot-kit-contrast-color": theme.colors.dark,
                        "--copilot-kit-background-color": theme.colors.darker,
                        "--copilot-kit-input-background-color": theme.colors.dark,
                        "--copilot-kit-secondary-color": theme.colors.dark,
                        "--copilot-kit-secondary-contrast-color": '#ffffff',
                        "--copilot-kit-separator-color": theme.vars['lighten-25'],
                        "--copilot-kit-muted-color": theme.colors.subtle,
                      } as CopilotKitCSSProperties
                    }
                  >
                    <CopilotSidebar
                      defaultOpen={false}
                      labels={{
                        title: 'Interview Omar Habash',
                        initial: 'Hi! 👋 What would you like to know about me?',
                      }}
                      className="[&>button]:hidden"
                    >
                      <AiBody />
                      <main>{children}</main>
                    </CopilotSidebar>
                  </div>
                </ThemeWrapper>
              </GlobalProvider>
            </SessionProvider>
          </QueryProvider>
        </CopilotKit>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
