import { createClient } from "@/lib/supabase-server";

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const supabase = await createClient();

    const { data: news } = await supabase
        .from('news')
        .select('title, meta_title, meta_description, image_url')
        .eq('slug', slug)
        .single();

    if (!news) return { title: 'News Detail' };

    const title = news.meta_title || news.title;
    const description = news.meta_description || `Read the latest update about ${news.title} from The Gesit Companies.`;

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            images: news.image_url ? [news.image_url] : [],
        },
    };
}

export default function NewsDetailLayout({ children }) {
    return <>{children}</>;
}
