import React from 'react'

const Button = ({ text, containerClass, href }) => {
    return (
        <a href={href || "#"} className={`cta-wrapper ${containerClass}`}>
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
