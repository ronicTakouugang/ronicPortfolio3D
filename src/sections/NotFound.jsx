import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <section className="min-h-[80vh] w-full flex-center flex-col gap-6 text-center px-5">
            <p className="text-white-50 font-semibold tracking-widest">404</p>
            <h1 className="text-white text-3xl md:text-5xl font-bold">Page not found</h1>
            <p className="text-white-50 max-w-md">
                The page you're looking for doesn't exist or has moved.
            </p>
            <Link to="/" className="cta-wrapper w-56 mt-4">
                <div className="cta-button group">
                    <div className="btn-bg" />
                    <p className="text flex items-center">Back to home</p>
                    <div className="arrow-wrapper">
                        <img src="/images/arrow-right.svg" alt="arrow" className="size-3.5 -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform invert" />
                    </div>
                </div>
            </Link>
        </section>
    );
};

export default NotFound;
