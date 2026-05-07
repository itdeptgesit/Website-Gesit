import { createClient } from '@/lib/supabase-server';

export default async function JsonLd() {
    try {
        const supabase = await createClient();
        const { data: seoData } = await supabase
            .from('seo_settings')
            .select('*')
            .eq('id', 1)
            .single();

        if (!seoData) return null;

        const jsonLd = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": seoData.site_title || "The Gesit Companies",
            "url": "https://gesit.co.id",
            "potentialAction": {
                "@type": "SearchAction",
                "target": `https://gesit.co.id/search?q={search_term_string}`,
                "query-input": "required name=search_term_string"
            }
        };

        const organizationJsonLd = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "The Gesit Companies",
            "url": "https://gesit.co.id",
            "logo": "https://gesit.co.id/logo-gesit.png",
            "description": seoData.meta_description || "The Gesit Companies are business leaders in the fields of Property, Trading & Service, Manufacturing, and Natural Resources in Indonesia.",
            "sameAs": [
                "https://www.linkedin.com/company/the-gesit-companies"
            ]
        };

        return (
            <>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
                />
            </>
        );
    } catch (error) {
        console.error("JSON-LD fetch failed", error);
        return null;
    }
}
