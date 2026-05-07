import { createClient } from '@/lib/supabase-server';

export default async function sitemap() {
    const baseUrl = 'https://gesit.co.id';

    // Standard static routes
    const staticRoutes = [
        '',
        '/about-us',
        '/career',
        '/contact-us',
        '/our-business',
        '/our-business/property',
        '/our-business/trading-services',
        '/our-business/manufacturing',
        '/our-business/natural-resources',
        '/news',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic news routes
    try {
        const supabase = await createClient();
        const { data: newsItems } = await supabase
            .from('news')
            .select('slug, updated_at')
            .order('created_at', { ascending: false });

        if (newsItems) {
            const dynamicRoutes = newsItems.map((news) => ({
                url: `${baseUrl}/news/${news.slug}`,
                lastModified: new Date(news.updated_at || new Date()),
                changeFrequency: 'yearly',
                priority: 0.6,
            }));

            return [...staticRoutes, ...dynamicRoutes];
        }
    } catch (err) {
        console.error("Failed to fetch dynamic routes for sitemap:", err);
    }

    return staticRoutes;
}

