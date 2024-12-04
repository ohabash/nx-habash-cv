
import { Header } from '@/components/header/Header';
import { ThemeWrapper } from '@/components/layout/Theme';
import { GlobalProvider } from '@/global.context';
import './../styles.scss';

export const metadata = {
  title: 'Omar Habash',
  description: 'Omar Habash - Full Stack Developer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="MODAL"></div>
        <GlobalProvider>
          <ThemeWrapper>
            <main>
              {children}
            </main>
          </ThemeWrapper>
        </GlobalProvider>
      </body>
    </html>
  );
}
