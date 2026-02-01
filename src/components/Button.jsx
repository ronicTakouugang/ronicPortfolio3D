import React from 'react'

const Button = ({ text, containerClass, id }) => {
    const targetId = id || 'counter';

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
            className={`cta-wrapper ${containerClass}`}
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
    )
}
export default Button
