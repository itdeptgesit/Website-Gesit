import { getSegmentMetadata } from '@/lib/seo-helper';

export async function generateMetadata() {
    return await getSegmentMetadata('TRADING & SERVICES', 'Trading & Services');
}

export default function TradingServicesLayout({ children }) {
    return <>{children}</>;
}
