import { Header } from '@/components/header/Header';
import { homeMetadata, structuredDataSchemas } from '@/config/seo.config';

// Homepage metadata imported from centralized SEO config
export const metadata = homeMetadata;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* SEO: JSON-LD Structured Data */}
      {structuredDataSchemas.map((schema, index) => (
        <script
          key={`jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      
      {/* Content */}
      <Header />
      <div className="MainLayout z-0 relative">{children}</div>
    </>
  );
}
