import BodyClassHandler from '../../components/BodyClassHandler';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BackToTop from '../../components/BackToTop';

export default function PublicLayout({ children }) {
    return (
        <>
            <BodyClassHandler />
            {/* Legacy CSS - Only for Public Pages */}
            {/* Reverted BUG-07: Restore exact original font string because legacy CSS relies on specific weights/italics */}
            <link rel="stylesheet" media="all" href="https://fonts.googleapis.com/css?family=Lato%3A100%2C100italic%2C300%2C300italic%2C400%2C400italic%2C700%2C700italic%2C900%2C900italic%7CLora%3A100%2C100italic%2C300%2C300italic%2C400%2C400italic%2C700%2C700italic%2C900%2C900italic%7CRaleway%3A100%2C100italic%2C300%2C300italic%2C400%2C400italic%2C700%2C700italic%2C900%2C900italic%7CSource+Sans+Pro%3A100%2C100italic%2C300%2C300italic%2C400%2C400italic%2C700%2C700italic%2C900%2C900italic%7CCrimson+Text%3A100%2C100italic%2C300%2C300italic%2C400%2C400italic%2C700%2C700italic%2C900%2C900italic%7CRoboto+Slab%3A100%2C100italic%2C300%2C300italic%2C400%2C400italic%2C700%2C700italic%2C900%2C900italic&subset=latin%2Clatin-ext&display=swap" />
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
