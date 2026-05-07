import BodyClassHandler from '../../components/BodyClassHandler';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BackToTop from '../../components/BackToTop';

export default function PublicLayout({ children }) {
    return (
        <>
            <BodyClassHandler />
            <link rel="stylesheet" media="all" href="/wp-content/cache/autoptimize/css/autoptimize_7d3a2d0d5032d30279d2b7664e7007ac.css" />
            <link rel="stylesheet" media="all" href="/wp-content/cache/autoptimize/css/autoptimize_7988092a1679771704b23cec4da4597a.css" />


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
