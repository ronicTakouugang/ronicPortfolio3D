import React, {useEffect, useState} from 'react'
import {navLinks} from "../constants/index.js";
import { useLocation } from 'react-router-dom';
import { getLenis } from '../lib/lenis.js';

const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState(null);
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            if (isHomePage) {
                const isScrolled = window.scrollY > 10;
                setScrolled(isScrolled);
            } else {
                setScrolled(true);
            }
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll)
    }, [isHomePage]);

    // Highlights whichever nav link matches the section currently crossing the
    // middle of the viewport, so the navbar tracks where you actually are on scroll.
    useEffect(() => {
        if (!isHomePage) return;

        const sectionIds = navLinks.map(({ link }) => link.replace('#', ''));
        const sections = sectionIds
            .map((id) => document.getElementById(id))
            .filter(Boolean);
        if (sections.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, [isHomePage]);

    // Lets the mobile menu close with Escape, same as any other dismissible overlay.
    useEffect(() => {
        if (!menuOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setMenuOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [menuOpen]);

    // Stops the page behind the full-screen mobile menu from scrolling while it's
    // open. Lenis intercepts wheel/touch input itself and ignores CSS overflow
    // entirely, so it needs its own stop()/start() — the overflow toggle on
    // <html> (document.scrollingElement here, not <body>) is the fallback for
    // keyboard scrolling and for reduced-motion visitors, who never get a Lenis
    // instance at all.
    useEffect(() => {
        if (!menuOpen) return;
        const root = document.documentElement;
        const previousOverflow = root.style.overflow;
        root.style.overflow = 'hidden';
        const lenis = getLenis();
        lenis?.stop();
        return () => {
            root.style.overflow = previousOverflow;
            lenis?.start();
        };
    }, [menuOpen]);

    const getLink = (link) => isHomePage ? link : `/${link}`;

    return (
        <header className={`navbar ${scrolled ? "scrolled":"not-scrolled"}`}>
            <a
                href="#main-content"
                className="fixed left-4 top-4 z-[200] -translate-y-24 focus:translate-y-0 bg-white text-black px-4 py-2 rounded-md font-semibold transition-transform"
            >
                Skip to content
            </a>
            <div className="inner">
                <a className="logo" href={getLink("#hero")}>
                    Data with Ronic
                </a>
                <nav className="desktop lg:flex hidden">
                    <ul>
                        {navLinks.map(({ link, name}) => {
                            const isActive = activeSection === link.replace('#', '');
                            return (
                                <li key={name} className="group">
                                    <a href={getLink(link)}>
                                        <span className={isActive ? 'text-white' : ''}>{name}</span>
                                        {/* .underline's nested selector outweighs a plain "w-full" utility class
                                            in specificity, so the active state needs an inline style to win. */}
                                        <span className="underline" style={isActive ? { width: '100%' } : undefined} />
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <div className="flex items-center gap-4">
                    <a href={getLink("#contact")} className="contact-btn group">
                        <div className="inner">
                            <span>Contact me !</span>
                        </div>
                    </a>
                    <button
                        className="lg:hidden z-50"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                    >
                        <div className="hamburger-icon">
                            <span className={`line ${menuOpen ? 'line-1-open' : ''}`}></span>
                            <span className={`line ${menuOpen ? 'line-2-open' : ''}`}></span>
                            <span className={`line ${menuOpen ? 'line-3-open' : ''}`}></span>
                        </div>
                    </button>
                </div>
            </div>
            {menuOpen && (
                <div id="mobile-menu" className="mobile-menu" onClick={() => setMenuOpen(false)}>
                    <nav>
                        <ul>
                            {navLinks.map(({ link, name}) => {
                                const isActive = activeSection === link.replace('#', '');
                                return (
                                    <li key={name}>
                                        {/* Dim the non-active links instead of the reverse — the base style is
                                            already bold white, which reads best as the "on" state. Inline style
                                            because ".mobile-menu nav ul li a" outweighs a plain utility class. */}
                                        <a href={getLink(link)} style={!isActive ? { color: '#839cb5' } : undefined}>{name}</a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            )}
        </header>
    )
}
export default NavBar
