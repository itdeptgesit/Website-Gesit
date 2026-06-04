import BodyClassHandler from '../../components/BodyClassHandler';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BackToTop from '../../components/BackToTop';
import { getSegmentMetadata } from '@/lib/seo-helper';

export async function generateMetadata() {
    return await getSegmentMetadata('HOME', 'The Gesit Companies');
}

export default function PublicLayout({ children }) {
    return (
        <>
            <BodyClassHandler />
            {/* Legacy CSS - Only for Public Pages */}
            <link rel="stylesheet" media="all" id="ao_optimized_gfonts" href="https://fonts.googleapis.com/css?family=Lato%3A300%2C400%2C500%2C600%2C700%7CRaleway%3A300%2C400%2C500%2C600%2C700%7CCrimson+Text%3A300%2C400%2C500%2C600%2C700%7CLora%3A300%2C400%2C500%2C600%2C700%7CSource+Sans+Pro%3A300%2C400%2C500%2C600%2C700%7CRoboto%3A100%2C100italic%2C200%2C200italic%2C300%2C300italic%2C400%2C400italic%2C500%2C500italic%2C600%2C600italic%2C700%2C700italic%2C800%2C800italic%2C900%2C900italic%7CRoboto+Slab%3A100%2C100italic%2C200%2C200italic%2C300%2C300italic%2C400%2C400italic%2C500%2C500italic%2C600%2C600italic%2C700%2C700italic%2C800%2C800italic%2C900%2C900italic%7CLora%3A100%2C100italic%2C200%2C200italic%2C300%2C300italic%2C400%2C400italic%2C500%2C500italic%2C600%2C600italic%2C700%2C700italic%2C800%2C800italic%2C900%2C900italic%7CSource+Sans+Pro%3A100%2C100italic%2C200%2C200italic%2C300%2C300italic%2C400%2C400italic%2C500%2C500italic%2C600%2C600italic%2C700%2C700italic%2C800%2C800italic%2C900%2C900italic&amp;display=swap" />
            <link rel="stylesheet" media="all" href="/css/legacy/autoptimize_7d3a2d0d5032d30279d2b7664e7007ac.css" />
            <link rel="stylesheet" media="all" href="/css/legacy/autoptimize_7988092a1679771704b23cec4da4597a.css" />

            <div id="qodef-page-wrapper" className="">
                <Header />
                <div id="qodef-page-outer" suppressHydrationWarning>
                    <div id="qodef-page-inner" className="qodef-content-full-width">
                        {children}
                    </div>
                </div>
                <Footer />
                <BackToTop />
            </div>
        </>
    );
}
