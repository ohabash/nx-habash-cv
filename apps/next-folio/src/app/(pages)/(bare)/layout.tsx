import './bare.layout.scss';
export const metadata = {
  title: 'Omar Habash',
  description: 'Omar Habash - Full Stack Developer',
};

export default function BareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="BareLayout">{children}</div>;
}
