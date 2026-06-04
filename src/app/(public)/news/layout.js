import { getSegmentMetadata } from '@/lib/seo-helper';

export async function generateMetadata() {
    return await getSegmentMetadata('NEWS ARCHIVE', 'News');
}

export default function NewsLayout({ children }) {
    return <>{children}</>;
}
