import React from 'react'
import { getLenis } from '../lib/lenis.js'

const Button = ({ text, containerClass, id, type = "link", onClick }) => {
    const targetId = id || 'counter';

    const commonProps = {
        className: `cta-wrapper ${containerClass}`,
    };

    if (type === "submit") {
        return (
            <button type="submit" onClick={onClick} {...commonProps}>
                <div className="cta-button group">
                    <div className="btn-bg" />
                    <p className="text flex items-center">
                        {text}
                    </p>
                    <div className="arrow-wrapper">
                        <img src="/images/arrow-down.svg" alt="arrow" />
                    </div>
                </div>
            </button>
        );
    } else {
        if (type !== "link") {
            console.warn(`Invalid Button type: '${type}'. Defaulting to 'link'.`);
        }
        return (
            <a
                href={`#${targetId}`}
                onClick={(e) =>{
                    e.preventDefault();
                    // Stop the click from also reaching Lenis' own anchor listener on window,
                    // which would otherwise start a second, competing scrollTo for the same target.
                    e.stopPropagation();

                    const target = document.getElementById(targetId)
                    if (!target) return;

                    const offset = window.innerHeight * 0.15;
                    const lenis = getLenis();
                    if (lenis) {
                        lenis.scrollTo(target, { offset: -offset, duration: 1.2 });
                    } else {
                        const top = target.getBoundingClientRect().top + window.scrollY - offset;
                        window.scrollTo({ top, behavior: 'smooth' });
                    }
                }}
                {...commonProps}
            >
                <div className="cta-button group">
                    <div className="btn-bg" />
                    <p className="text flex items-center">
                        {text}
                    </p>
                    <div className="arrow-wrapper">
                        <img src="/images/arrow-down.svg" alt="arrow" />
                    </div>
                </div>
            </a>
        );
    }
};

export default Button
