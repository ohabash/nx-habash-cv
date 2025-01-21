import { Header } from '@/components/header/Header';

export const metadata = {
  title: 'Omar Habash',
  description: 'Omar Habash - Full Stack Developer',
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="MainLayout z-0 relative">{children}</div>
    </>
  );
}
