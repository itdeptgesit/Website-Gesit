import './globals.css';
import PageTracker from '@/components/PageTracker';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { createClient } from '@/lib/supabase-server';

export async function generateMetadata() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('seo_settings')
      .select('*')
      .eq('id', 1)
      .single();

    if (data) {
      return {
        title: {
          default: data.site_title || 'The Gesit Companies',
          template: data.title_template || '%s | The Gesit Companies',
        },
        description: data.meta_description || 'The Gesit Companies are business leaders in the fields of Property, Trading & Service, Manufacturing, and Natural Resources in Indonesia.',
        keywords: data.meta_keywords || '',
        openGraph: {
          images: data.og_image ? [data.og_image] : [],
        },
        icons: {
          icon: [
            { url: '/logos/cropped-gesit-favicon-1-32x32-1.webp', sizes: '32x32', type: 'image/webp' },
            { url: '/logos/cropped-gesit-favicon-1-192x192-1.webp', sizes: '192x192', type: 'image/webp' }
          ],
          apple: [
            { url: '/logos/cropped-gesit-favicon-1-180x180-1.webp', sizes: '180x180', type: 'image/webp' },
          ]
        },
      };
    }
  } catch (error) {
    console.error("Layout SEO fetch failed (table might be missing), falling back to defaults.", error.message);
  }

  // Default fallback if DB is empty or fails
  return {
    title: {
      default: 'The Gesit Companies',
      template: '%s | The Gesit Companies',
    },
    description: 'The Gesit Companies are business leaders in the fields of Property, Trading & Service, Manufacturing, and Natural Resources in Indonesia.',
    icons: {
      icon: [
        { url: '/logos/cropped-gesit-favicon-1-32x32-1.webp', sizes: '32x32', type: 'image/webp' },
        { url: '/logos/cropped-gesit-favicon-1-192x192-1.webp', sizes: '192x192', type: 'image/webp' }
      ],
      apple: [
        { url: '/logos/cropped-gesit-favicon-1-180x180-1.webp', sizes: '180x180', type: 'image/webp' },
      ]
    },
  };
}

export default function RootLayout({ children }) {
  // Structured Data for Google Sitelinks
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'The Gesit Companies',
    url: 'https://gesit.co.id',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://gesit.co.id/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'The Gesit Companies',
    url: 'https://gesit.co.id',
    logo: 'https://gesit.co.id/logos/logos.png',
    description: 'The Gesit Companies are business leaders in the fields of Property, Trading & Service, Manufacturing, and Natural Resources in Indonesia.',
    sameAs: [
      'https://www.linkedin.com/company/the-gesit-companies',
      // 'https://www.instagram.com/...',
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <PageTracker />
        <Analytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
