import { getSegmentMetadata } from '@/lib/seo-helper';

export async function generateMetadata() {
    return await getSegmentMetadata('CAREERS', 'Career');
}

export default function CareerLayout({ children }) {
    return <>{children}</>;
}
