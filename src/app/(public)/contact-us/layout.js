import { getSegmentMetadata } from '@/lib/seo-helper';

export async function generateMetadata() {
    return await getSegmentMetadata('CONTACT', 'Contact Us');
}

export default function ContactLayout({ children }) {
    return <>{children}</>;
}
