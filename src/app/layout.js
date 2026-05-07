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

export default async function RootLayout({ children }) {
  // Fetch settings for dynamic tracking scripts
  let settings = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.from('seo_settings').select('ga_tracking_id, fb_pixel_id').eq('id', 1).single();
    settings = data;
  } catch (e) {
    console.error("Failed to fetch tracking settings");
  }

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
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet" />
        
        {/* Google Analytics (GA4) - Dynamic */}
        {settings?.ga_tracking_id && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${settings.ga_tracking_id}`}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${settings.ga_tracking_id}');
                `,
              }}
            />
          </>
        )}

        {/* Facebook Pixel - Dynamic */}
        {settings?.fb_pixel_id && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${settings.fb_pixel_id}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}
      </head>
      <body suppressHydrationWarning>
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
        
        {/* Facebook Pixel Noscript */}
        {settings?.fb_pixel_id && (
          <noscript>
            <img 
              height="1" 
              width="1" 
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${settings.fb_pixel_id}&ev=PageView&noscript=1`}
            />
          </noscript>
        )}
      </body>
    </html>
  );
}
