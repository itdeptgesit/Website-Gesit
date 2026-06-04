import { createClient } from '@/lib/supabase-server';

export async function getSegmentMetadata(segment, defaultTitle) {
    try {
        const supabase = await createClient();
        const { data } = await supabase.from('page_seo').select('*').eq('segment', segment).single();
        if (data && (data.title || data.description)) {
            const metadata = {
                title: data.title || defaultTitle,
            };
            if (data.description) metadata.description = data.description;
            if (data.keywords) metadata.keywords = data.keywords;
            return metadata;
        }
    } catch (e) {
        console.error(`Error fetching SEO metadata for segment ${segment}:`, e);
    }
    return { title: defaultTitle };
}
