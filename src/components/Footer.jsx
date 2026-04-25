import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <div>
        <footer id="qodef-page-footer" className="qodef--light-footer">
          <div id="qodef-page-footer-top-area">
            <div id="qodef-page-footer-top-area-inner" className="qodef-content-grid">
              <div className="qodef-grid qodef-layout--columns qodef-responsive--custom qodef-col-num--3 qodef-col-num--768--1 qodef-col-num--680--1 qodef-col-num--480--1">
                <div className="qodef-grid-inner clear">
                  <div className="qodef-grid-item">
                    <div id="nav_menu-2" className="widget widget_nav_menu" data-area="footer_top_area_column_1">
                      <h5 className="qodef-widget-title">Company Links</h5>
                      <div className="menu-gesit-footer-menu-container">
                        <ul id="menu-gesit-footer-menu" className="menu">
                          <li id="menu-item-4530" className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-4530">
                            <Link href="/" aria-current="page">Home</Link>
                          </li>
                          <li id="menu-item-6511" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6511">
                            <Link href="/about-us">About Us</Link>
                          </li>
                          <li id="menu-item-6512" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6512">
                            <Link href="/csr">CSR</Link>
                          </li>
                          <li id="menu-item-6513" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6513">
                            <Link href="/news">News</Link>
                          </li>
                          <li id="menu-item-6515" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6515">
                            <Link href="/career">Career</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div id="custom_html-3" className="widget_text widget widget_custom_html" data-area="footer_top_area_column_1">
                      <div className="textwidget custom-html-widget" />
                    </div>
                  </div>
                  <div className="qodef-grid-item">
                    <div id="nav_menu-3" className="widget widget_nav_menu" data-area="footer_top_area_column_2">
                      <h5 className="qodef-widget-title">Our Business</h5>
                      <div className="menu-gesit-footer-categories-container">
                        <ul id="menu-gesit-footer-categories" className="menu">
                          <li id="menu-item-6532" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6532">
                            <Link href="/our-business/property">Property</Link>
                          </li>
                          <li id="menu-item-6531" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6531">
                            <Link href="/our-business/trading-services">Trading &amp; Services</Link>
                          </li>
                          <li id="menu-item-6530" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6530">
                            <Link href="/our-business/manufacturing">Manufacturing</Link>
                          </li>
                          <li id="menu-item-6533" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6533">
                            <Link href="/our-business/natural-resources">Natural Resources</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="qodef-grid-item">
                    <div id="text-2" className="widget widget_text" data-area="footer_top_area_column_3">
                      <div className="textwidget">
                        <h5 style={{ color: '#fff', margin: '0 0 22px', fontWeight: 500 }}>
                          Find Us
                        </h5>
                        <p>
                          <a href="https://www.google.com/maps/place/The+City+Tower/@-6.199216,106.8213135,17z/data=!4m12!1m6!3m5!1s0x2e69f41f2b24b18b:0xb5cb3eba60efb71e!2sThe+City+Tower!8m2!3d-6.1991991!4d106.8235192!3m4!1s0x2e69f41f2b24b18b:0xb5cb3eba60efb71e!8m2!3d-6.1991991!4d106.8235192" target="_blank" rel="noopener nofollow">The City Tower, 27th Floor<br />
                            Jl. M.H. Thamrin No 81<br />
                            Menteng, Jakarta Pusat<br />
                            DKI Jakarta 10310 – Indonesia</a>
                        </p>
                        <p>
                          <a href="tel:+62213101601">Phone : +62 21 3101601</a>
                        </p>
                        <p>
                          <a href="mailto:contact@gesit.co.id">Mail : contact@gesit.co.id</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="qodef-page-footer-bottom-area">
            <div id="qodef-page-footer-bottom-area-inner" className="qodef-content-grid">
              <div className="qodef-grid qodef-layout--columns qodef-responsive--custom qodef-col-num--1">
                <div className="qodef-grid-inner clear">
                  <div className="qodef-grid-item" style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
                      <Link href="/" style={{ textDecoration: 'none' }}>
                        <img src="/images/logo.png" alt="Gesit Logo" style={{ height: '55px', width: 'auto', display: 'block' }} />
                      </Link>
                    </div>
                    <div id="text-3" className="widget widget_text" data-area="footer_bottom_area_column_1">
                      <div className="textwidget">
                        <p className="qodef-shortcode qodef-m qodef-custom-font qodef-custom-font-4 qodef-layout--simple" style={{ fontFamily: '"Source Sans Pro", sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.7)', textAlign: 'center', letterSpacing: '0.5px' }}>
                          © 2026 THE GESIT COMPANIES. ALL RIGHTS RESERVED
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <div id="qodef-fullscreen-area">
          <div className="qodef-content-holder">
            <div id="qodef-fullscreen-area-inner">
              <nav className="qodef-fullscreen-menu">
                <ul id="menu-gesit-menu-4" className="menu">
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-215 current_page_item menu-item-4422">
                    <Link href="/"><span className="qodef-menu-item-text">Home</span></Link>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6112">
                    <Link href="/about-us"><span className="qodef-menu-item-text">About Us</span></Link>
                  </li>
                  <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-5695 qodef-menu-item--narrow">
                    <a href="#"><span className="qodef-menu-item-text">Our Business</span></a>
                    <div className="qodef-drop-down-second">
                      <div className="qodef-drop-down-second-inner">
                        <ul className="sub-menu">
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-5136">
                            <Link href="/our-business/property"><span className="qodef-menu-item-text">Property</span></Link>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-5161">
                            <Link href="/our-business/trading-services"><span className="qodef-menu-item-text">Trading
                              &amp; Services</span></Link>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-5212">
                            <Link href="/our-business/manufacturing"><span className="qodef-menu-item-text">Manufacturing</span></Link>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-5120">
                            <Link href="/our-business/natural-resources"><span className="qodef-menu-item-text">Natural
                              Resources</span></Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-5538">
                    <Link href="/csr"><span className="qodef-menu-item-text">CSR</span></Link>
                  </li>
                  <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4426">
                    <Link href="/news"><span className="qodef-menu-item-text">News</span></Link>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6461">
                    <Link href="/career"><span className="qodef-menu-item-text">Career</span></Link>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-10265">
                    <Link href="/contact-us"><span className="qodef-menu-item-text">Contact Us</span></Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div></div>

    </>
  );
}
