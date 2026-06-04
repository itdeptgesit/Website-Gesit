import { getSegmentMetadata } from '@/lib/seo-helper';

export async function generateMetadata() {
    return await getSegmentMetadata('HOME', 'The Gesit Companies');
}

export default function HomeLayout({ children }) {
    return <>{children}</>;
}
