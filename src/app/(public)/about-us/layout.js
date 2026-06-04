import { getSegmentMetadata } from '@/lib/seo-helper';

export async function generateMetadata() {
    return await getSegmentMetadata('ABOUT US', 'About Us');
}

export default function AboutLayout({ children }) {
    return <>{children}</>;
}
