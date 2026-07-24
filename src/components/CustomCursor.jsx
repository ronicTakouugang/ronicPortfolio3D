import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../utils/prefersReducedMotion.js';

const HOVER_SELECTOR = 'a, button, [role="button"], canvas';

// A dot + lagging ring cursor, only for devices with an actual mouse — touch
// devices have no hover concept, and a following cursor is exactly the sort
// of persistent motion prefers-reduced-motion asks to skip.
const CustomCursor = () => {
    const [enabled] = useState(() =>
        typeof window !== 'undefined' &&
        window.matchMedia('(pointer: fine)').matches &&
        !prefersReducedMotion()
    );
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        if (!enabled) return;

        document.body.classList.add('custom-cursor-active');

        const dot = dotRef.current;
        const ring = ringRef.current;
        const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const ringPos = { ...mouse };

        const handleMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
        };

        const handleOver = (e) => {
            if (e.target.closest?.(HOVER_SELECTOR)) ring.classList.add('cursor-ring--active');
        };
        const handleOut = (e) => {
            if (e.target.closest?.(HOVER_SELECTOR)) ring.classList.remove('cursor-ring--active');
        };

        let rafId;
        const tick = () => {
            // Lerp toward the real pointer so the ring trails slightly behind the dot.
            ringPos.x += (mouse.x - ringPos.x) * 0.18;
            ringPos.y += (mouse.y - ringPos.y) * 0.18;
            ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
            rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);

        window.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseover', handleOver);
        document.addEventListener('mouseout', handleOut);

        return () => {
            document.body.classList.remove('custom-cursor-active');
            cancelAnimationFrame(rafId);
            window.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseover', handleOver);
            document.removeEventListener('mouseout', handleOut);
        };
    }, [enabled]);

    if (!enabled) return null;

    return (
        <>
            <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
            <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
        </>
    );
};

export default CustomCursor;
