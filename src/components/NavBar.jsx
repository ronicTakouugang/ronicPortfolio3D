import React, {useEffect, useState} from 'react'
import {navLinks} from "../constants/index.js";
import { useLocation } from 'react-router-dom';

const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
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
    
    const getLink = (link) => isHomePage ? link : `/${link}`;

    return (
        <header className={`navbar ${scrolled ? "scrolled":"not-scrolled"}`}>
            <div className="inner">
                <a className="logo" href={getLink("#hero")}>
                    Data with Ronic
                </a>
                <nav className="desktop lg:flex hidden">
                    <ul>
                        {navLinks.map(({ link, name}) =>(
                            <li key={name} className="group">
                                <a href={getLink(link)}>
                                    <span>{name}</span>
                                    <span className="underline"/>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="flex items-center gap-4">
                    <a href={getLink("#contact")} className="contact-btn group">
                        <div className="inner">
                            <span>Contact me !</span>
                        </div>
                    </a>
                    <button className="lg:hidden z-50" onClick={() => setMenuOpen(!menuOpen)}>
                        <div className="hamburger-icon">
                            <span className={`line ${menuOpen ? 'line-1-open' : ''}`}></span>
                            <span className={`line ${menuOpen ? 'line-2-open' : ''}`}></span>
                            <span className={`line ${menuOpen ? 'line-3-open' : ''}`}></span>
                        </div>
                    </button>
                </div>
            </div>
            {menuOpen && (
                <div className="mobile-menu">
                    <nav>
                        <ul>
                            {navLinks.map(({ link, name}) =>(
                                <li key={name} onClick={() => setMenuOpen(false)}>
                                    <a href={getLink(link)}>{name}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            )}
        </header>
    )
}
export default NavBar
