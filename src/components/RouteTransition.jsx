import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '../utils/prefersReducedMotion.js';

// Keyed by pathname in App.jsx so React remounts (and this re-fades) on every
// navigation — softens the otherwise-instant swap between routes, most
// noticeable going into "See more"'s own elaborate gallery entrance.
const RouteTransition = ({ children }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current || prefersReducedMotion()) return;
        gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' });
    }, []);

    return <div ref={ref}>{children}</div>;
};

export default RouteTransition;
