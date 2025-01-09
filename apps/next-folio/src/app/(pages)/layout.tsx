
import SessionProvider from '@/components/auth/SessionProvider';
import { ThemeWrapper } from '@/components/layout/Theme';
import { GlobalProvider } from '@/global.context';
import { getServerSession } from 'next-auth';

// global styles
import './../styles.scss';
import QueryProvider from '@/providers/QueryProvider';

export const metadata = {
  title: 'Omar Habash',
  description: 'Omar Habash - Full Stack Developer',
};

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
        <QueryProvider>
          <SessionProvider session={session}>
            <GlobalProvider>
              <ThemeWrapper>
                <main>{children}</main>
              </ThemeWrapper>
            </GlobalProvider>
          </SessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
