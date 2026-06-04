import { getSegmentMetadata } from '@/lib/seo-helper';

export async function generateMetadata() {
    return await getSegmentMetadata('PROPERTY', 'Property');
}

export default function PropertyLayout({ children }) {
    return <>{children}</>;
}
