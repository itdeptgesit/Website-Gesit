import { getSegmentMetadata } from '@/lib/seo-helper';

export async function generateMetadata() {
    return await getSegmentMetadata('NEWS', 'News');
}

export default function NewsLayout({ children }) {
    return <>{children}</>;
}
