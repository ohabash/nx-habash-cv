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

// global styles
import './../styles.scss';

export const metadata = {
  title: 'Omar Habash',
  description: 'Omar Habash - Full Stack Developer',
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
      <body>
        <div id="MODAL"></div>
        <CopilotKit 
          publicApiKey="ck_pub_d9dbf528536f4e9f115badfc68eb13cc"
          enableDebug={true}
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
      </body>
    </html>
  );
}
