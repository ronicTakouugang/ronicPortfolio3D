import React, { useEffect, useState } from 'react';
import { getLenis } from '../lib/lenis.js';
import { prefersReducedMotion } from '../utils/prefersReducedMotion.js';

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => setVisible(window.scrollY > 600);
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = () => {
        const lenis = getLenis();
        if (lenis) {
            lenis.scrollTo(0, { duration: 1.2 });
        } else {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
        }
    };

    if (!visible) return null;

    return (
        <button
            onClick={handleClick}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-50 size-11 rounded-full bg-zinc-900/70 border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 transition-colors backdrop-blur-sm"
        >
            <img src="/images/arrow-down.svg" alt="" className="size-4 invert rotate-180" />
        </button>
    );
};

export default ScrollToTop;
