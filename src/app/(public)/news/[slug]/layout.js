import { createClient } from "@/lib/supabase-server";

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const supabase = await createClient();

    const { data: news } = await supabase
        .from('news')
        .select('title')
        .eq('slug', slug)
        .single();

    return {
        title: news?.title || 'News Detail',
    };
}

export default function NewsDetailLayout({ children }) {
    return <>{children}</>;
}
