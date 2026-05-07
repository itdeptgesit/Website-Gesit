'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onScroll = () => {
      const sticky = window.scrollY > 80;
      setIsSticky(sticky);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname?.startsWith(path);
  };

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about-us' },
    {
      label: 'Our Business',
      href: '#',
      hasChildren: true,
      children: [
        { label: 'Property', href: '/our-business/property' },
        { label: 'Trading & Services', href: '/our-business/trading-services' },
        { label: 'Manufacturing', href: '/our-business/manufacturing' },
        { label: 'Natural Resources', href: '/our-business/natural-resources' },
      ],
    },
    { label: 'CSR', href: '/csr' },
    { label: 'News', href: '/news' },
    { label: 'Career', href: '/career' },
    { label: 'Contact Us', href: '/contact-us' },
  ];

  return (
    <>
      <header id="qodef-page-header" className={isSticky ? 'gs-is-sticky' : ''} suppressHydrationWarning>
        <div id="qodef-page-header-inner">
          <Link href="/" className="gs-logo-link">
            <Image src="/logo-gesit.svg" alt="The Gesit Companies logo" width={150} height={180} />
            <span className="gs-logo-text">THE GESIT COMPANIES</span>
          </Link>

          <nav className="qodef-header-navigation">
            <ul className="menu">
              {menuItems.map((item) => (
                <li
                  key={item.label}
                  className={`menu-item ${item.hasChildren ? 'gs-has-children' : ''} ${isActive(item.href) ? 'gs-current-item' : ''}`}
                >
                  <Link href={item.href} className="gs-nav-link">
                    {item.label}
                  </Link>
                  {item.hasChildren && (
                    <div className="gs-dropdown">
                      <ul className="gs-submenu">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link href={child.href}>{child.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <header id="gs-custom-mobile-header" className={isSticky ? 'gs-is-sticky' : ''} suppressHydrationWarning>
        <div className="gs-mobile-header-inner">
          <Link href="/" className="gs-mobile-logo">
            <Image src="/logo-gesit.svg" alt="The Gesit Companies logo" width={150} height={180} />
            <span className="gs-logo-text">THE GESIT COMPANIES</span>
          </Link>
          <div
            className={`gs-mobile-opener ${mounted && mobileMenuOpen ? 'gs-is-open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
      </header>

      <div className={`gs-mobile-overlay ${mounted && mobileMenuOpen ? 'gs-is-open' : ''}`} suppressHydrationWarning>
        <ul className="gs-mobile-menu">
          {menuItems.map((item) => (
            <li key={item.label}>
              {item.hasChildren ? (
                <>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenSubmenus(prev => ({
                        ...prev,
                        [item.label]: !prev[item.label]
                      }));
                    }}
                  >
                    {item.label} <span>{mounted && openSubmenus[item.label] ? '−' : '+'}</span>
                  </a>
                  <ul className={`gs-mobile-submenu ${mounted && openSubmenus[item.label] ? 'gs-is-open' : ''}`}>
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link href={child.href} onClick={() => setMobileMenuOpen(false)}>
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link href={item.href} onClick={() => setMobileMenuOpen(false)}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
