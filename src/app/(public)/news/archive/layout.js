import { getSegmentMetadata } from '@/lib/seo-helper';

export async function generateMetadata() {
    return await getSegmentMetadata('NEWS ARCHIVE', 'News Archive');
}

export default function NewsArchiveLayout({ children }) {
    return <>{children}</>;
}
