import { Header } from './components/header/Header';
import { ThemeWrapper } from './components/layout/Theme';
import './styles.scss';

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
        <ThemeWrapper>
          <Header />
          <main>
            {children}
          </main>
        </ThemeWrapper>
      </body>
    </html>
  );
}
