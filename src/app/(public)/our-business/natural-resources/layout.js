import { getSegmentMetadata } from '@/lib/seo-helper';

export async function generateMetadata() {
    return await getSegmentMetadata('NATURAL RESOURCES', 'Natural Resources');
}

export default function NaturalResourcesLayout({ children }) {
    return <>{children}</>;
}
