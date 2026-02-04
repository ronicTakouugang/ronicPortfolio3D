import React from 'react'

const Button = ({ text, containerClass, id, type = "link", onClick }) => {
    const targetId = id || 'counter';

    const commonProps = {
        className: `cta-wrapper ${containerClass}`,
    };

    if (type === "link") {
        return (
            <a 
                href={`#${targetId}`}
                onClick={(e) =>{
                    e.preventDefault();

                    const target = document.getElementById(targetId)
                    if (target){
                        const offset = window.innerHeight * 0.15;
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
    } else if (type === "submit") {
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
    }
};

export default Button
