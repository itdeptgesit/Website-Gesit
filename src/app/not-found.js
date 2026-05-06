import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './not-found.css';

export const metadata = {
    title: '404 - Page Not Found | The Gesit Companies',
    description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
    return (
        <div id="qodef-page-wrapper">
            <Header />
            <main id="qodef-page-outer">
                <div className="gs-404-wrapper">
                    {/* Background Logo Overlay */}
                    <div className="gs-404-bg-logo">
                        <img src="/logos/logos.png" alt="" width="400" height="400" />
                    </div>

                    <div className="gs-404-container">
                        <div className="gs-404-number">404</div>
                        <h1 className="gs-404-title">This page could not be found.</h1>
                        <p className="gs-404-text">
                            We're sorry, but the page you requested was not found on our server. 
                            It may have been moved or deleted.
                        </p>
                        <Link href="/" className="gs-404-button">
                            Return to Home
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
