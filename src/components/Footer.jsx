import React from 'react';
import { FaGithub, FaInstagram } from 'react-icons/fa';
import { SiTableau, SiHuggingface } from 'react-icons/si';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="social-links">
                <a href="https://public.tableau.com/app/profile/takougang.kuatse.ronic/vizzes" target="_blank" rel="noopener noreferrer" aria-label="Tableau Public">
                    <SiTableau className="size-6 text-white hover:text-gray-400" />
                </a>
                <a href="https://github.com/ronicTakouugang" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <FaGithub className="size-6 text-white hover:text-gray-400" />
                </a>
                <a href="https://www.instagram.com/ronic_tk/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <FaInstagram className="size-6 text-white hover:text-gray-400" />
                </a>
                <a href="https://huggingface.co/RonicTK89" target="_blank" rel="noopener noreferrer" aria-label="Hugging Face">
                    <SiHuggingface className="size-6 text-white hover:text-gray-400" />
                </a>
            </div>
            <p className="copyright">© {new Date().getFullYear()} Ronic's Portfolio. All rights reserved.</p>
        </footer>
    );
};

export default Footer;