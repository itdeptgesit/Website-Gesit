import { getSegmentMetadata } from '@/lib/seo-helper';

export async function generateMetadata() {
    return await getSegmentMetadata('MANUFACTURING', 'Manufacturing');
}

export default function ManufacturingLayout({ children }) {
    return <>{children}</>;
}
