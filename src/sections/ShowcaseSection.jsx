import React, {useRef, useState} from 'react'
import {projectTechStack, jobMarketTechStack, shopWiseTechStack} from "../constants/index.js";
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import ProjectComputer from "../components/Models/work/ProjectComputer.jsx";
import SeeMoreButton from '../components/SeeMoreButton.jsx';
import TitleHeader from "../components/TitleHeader.jsx";
import { FaTools } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const showcaseProjects = [
    {
        title: "AI-powered stock analysis platform with predictive forecasting and financial sentiment.",
        tech: projectTechStack,
        image: "/images/Stockz.jpg",
        link: "https://stockz.vercel.app/",
        github: "https://github.com/ronicTakouugang/stockz",
        linkType: "app",
    },
    {
        title: "Multi-retailer price comparison platform with live price tracking and drop alerts.",
        tech: shopWiseTechStack,
        image: "/images/ShopWise.png",
        link: "https://shopwise-client.onrender.com/",
        github: "https://github.com/ronicTakouugang/ShopWise",
        linkType: "app",
    },
    {
        title: "ETL pipeline and Tableau dashboard analyzing France's Data & BI job market.",
        tech: jobMarketTechStack,
        image: "/images/JobMarket.png",
        link: "https://public.tableau.com/app/profile/takougang.kuatse.ronic/viz/Projet_Visualisation_17740458603320/Job_Market",
        github: "https://github.com/ronicTakouugang/Job_Scrappers",
        linkType: "dashboard",
    },
];

const ShowcaseSection = () => {
    const sectionRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const active = showcaseProjects[activeIndex];

    useGSAP(() => {
        gsap.fromTo(sectionRef.current,
            {opacity: 0, y: 60},
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
            })
    }, []);

    const goTo = (index) => {
        setActiveIndex((index + showcaseProjects.length) % showcaseProjects.length);
    };

    // A quick, mostly-horizontal drag switches projects; slower/short drags are
    // left alone so they still orbit the 3D model (OrbitControls) as expected.
    const swipeStart = useRef(null);

    const handlePointerDown = (e) => {
        swipeStart.current = { x: e.clientX, y: e.clientY, time: Date.now() };
    };

    const handlePointerUp = (e) => {
        const start = swipeStart.current;
        swipeStart.current = null;
        if (!start) return;

        const dx = e.clientX - start.x;
        const dy = e.clientY - start.y;
        const dt = Date.now() - start.time;

        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5 && dt < 600) {
            goTo(activeIndex + (dx < 0 ? 1 : -1));
        }
    };

    return (
        <section id="work" ref={sectionRef} className="app-showcase">
            <div className="w-full max-w-4xl mx-auto px-5">
                <TitleHeader title="My Work" sub="A Selection of My Projects" icon={FaTools} />

                <div className="flex items-center justify-center gap-3 md:gap-8 mt-10">
                    <button
                        onClick={() => goTo(activeIndex - 1)}
                        aria-label="Previous project"
                        className="flex-none size-10 md:size-12 rounded-full bg-zinc-900/50 border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 transition-colors"
                    >
                        <img src="/images/arrow-down.svg" alt="previous" className="size-4 invert rotate-90" />
                    </button>

                    <div
                        className="w-full h-[320px] md:h-[440px] cursor-grab active:cursor-grabbing"
                        onPointerDown={handlePointerDown}
                        onPointerUp={handlePointerUp}
                    >
                        <ProjectComputer imagePath={active.image} />
                    </div>

                    <button
                        onClick={() => goTo(activeIndex + 1)}
                        aria-label="Next project"
                        className="flex-none size-10 md:size-12 rounded-full bg-zinc-900/50 border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 transition-colors"
                    >
                        <img src="/images/arrow-down.svg" alt="next" className="size-4 invert -rotate-90" />
                    </button>
                </div>

                <div className="text-center mt-6 md:mt-10">
                    <h2 className="text-white font-semibold text-lg md:text-xl max-w-2xl mx-auto">{active.title}</h2>

                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                        {active.tech.map((tech, index) => (
                            <span key={index}
                                  className="bg-zinc-900/50 border border-zinc-800 text-white-50 px-2 py-1 rounded-full text-xs">
                                {tech.name}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center justify-center gap-5 mt-5">
                        <a
                            href={active.link}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-white hover:text-white-50 transition-colors"
                        >
                            {active.linkType === "dashboard" ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 3v18h18" />
                                    <path d="M18 17V9" />
                                    <path d="M13 17V5" />
                                    <path d="M8 17v-3" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                    <polyline points="15 3 21 3 21 9"></polyline>
                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                            )}
                            <p className="font-semibold text-sm">
                                {active.linkType === "dashboard" ? "View Dashboard" : "View Project"}
                            </p>
                        </a>

                        {active.github && (
                            <a
                                href={active.github}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 text-white hover:text-white-50 transition-colors"
                            >
                                <p className="font-semibold text-sm">GitHub</p>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fill-current">
                                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                                    <path d="M9 18c-4.51 2-5-2-7-2"/>
                                </svg>
                            </a>
                        )}
                    </div>

                    <div className="flex items-center justify-center gap-2 mt-8">
                        {showcaseProjects.map((project, index) => (
                            <button
                                key={project.title}
                                onClick={() => goTo(index)}
                                aria-label={`Go to ${project.title}`}
                                className={`h-2 rounded-full transition-all ${index === activeIndex ? 'w-6 bg-white' : 'w-2 bg-zinc-700 hover:bg-zinc-500'}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex justify-center mt-10">
                    <SeeMoreButton />
                </div>
            </div>
        </section>
    )
}
export default ShowcaseSection
