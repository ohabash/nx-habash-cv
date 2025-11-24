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
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleTagManager } from '@next/third-parties/google';
import { URLTracker } from '@/components/URLTracker';
import { Suspense } from 'react';
import { baseMetadata } from '@/config/seo.config';

// global styles
import './../styles.scss';

// Base metadata imported from centralized SEO config
export const metadata = baseMetadata;

const theme = new Theme();

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-MWD4424C" />
      <body>
        {/* URL Tracker for webhook */}
        <Suspense fallback={null}>
          <URLTracker />
        </Suspense>
        <div id="MODAL"></div>
        <CopilotKit publicApiKey="ck_pub_d9dbf528536f4e9f115badfc68eb13cc">
          <QueryProvider>
            <SessionProvider session={session}>
              <GlobalProvider>
                <ThemeWrapper>
                  <div
                    style={
                      {
                        '--copilot-kit-primary-color': theme.colors.blue,
                        '--copilot-kit-contrast-color': theme.colors.dark,
                        '--copilot-kit-background-color': theme.colors.darker,
                        '--copilot-kit-input-background-color':
                          theme.colors.dark,
                        '--copilot-kit-secondary-color': theme.colors.dark,
                        '--copilot-kit-secondary-contrast-color': '#ffffff',
                        '--copilot-kit-separator-color':
                          theme.vars['lighten-25'],
                        '--copilot-kit-muted-color': theme.colors.subtle,
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
