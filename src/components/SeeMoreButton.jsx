import React from 'react';
import { Link } from 'react-router-dom';

const SeeMoreButton = () => {
    return (
        <Link to="/all-projects" className="cta-wrapper w-64">
            <div className="cta-button group">
                <div className="btn-bg" />
                <p className="text flex items-center">
                    See More
                </p>
                <div className="arrow-wrapper">
                    <img src="/images/arrow-right.svg" alt="arrow" className="size-3.5 -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform invert" />
                </div>
            </div>
        </Link>
    );
};

export default SeeMoreButton;
