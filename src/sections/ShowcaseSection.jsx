import React, {useRef} from 'react'
import {projectTechStack, meteoTechStack, hrTechStack} from "../constants/index.js";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";
import SeeMoreButton from '../components/SeeMoreButton.jsx';
gsap.registerPlugin(ScrollTrigger);

const ShowcaseSection = () => {
    const sectionRef = useRef(null);
    const project1Ref = useRef(null)
    const project2Ref = useRef(null)
    const project3Ref = useRef(null)

    useGSAP(() => {
        const projects = [project1Ref.current, project2Ref.current, project3Ref.current];

        projects.forEach((card, index) => {
            if (!card) return;
            gsap.fromTo(
                card,
                {y: 50, opacity: 0},
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power2.inOut",
                    delay: 0.3 * (index + 1),
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom-=100",
                    }
                }
            )
        })

        gsap.fromTo(sectionRef.current, {opacity: 0},
            {opacity: 1, duration: 1.5, ease: "power2.inOut", delay: 0.5})
    }, []);

    return (
        <section id="work" ref={sectionRef} className="app-showcase">
            <div className="w-full">
                <div className="showcaselayout">
                    {/*LEFT*/}
                    <div className="first-project-wrapper" ref={project1Ref}>
                        <div className="image-wrapper">
                            <img src="/images/Stockz.png" alt="Stockz"/>
                        </div>
                        <div className="text-content">
                            <h2 className="text-white font-semibold text-lg mb-2">AI-powered stock analysis platform
                                with predictive forecasting and financial sentiment.</h2>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {projectTechStack.map((tech, index) => (
                                    <span key={index}
                                          className="bg-zinc-900/50 border border-zinc-800 text-white-50 px-2 py-1 rounded-full text-xs hover:bg-zinc-800 transition-colors">
                                    {tech.name}
                                </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-5 mt-6">
                                <a
                                    href="https://stockz.vercel.app/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 text-white hover:text-white-50 transition-colors group"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                        <polyline points="15 3 21 3 21 9"></polyline>
                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                    </svg>
                                </a>

                                <a
                                    href="https://lnkd.in/e2b5Rtwr"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 text-white hover:text-white-50 transition-colors group"
                                >
                                    <p className="font-semibold text-sm">GitHub</p>
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="size-5 fill-current"
                                    >
                                        <path
                                            d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                                        <path d="M9 18c-4.51 2-5-2-7-2"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    {/*RIGHT*/}
                    <div className="project-list-wrapper overflow-hidden">
                        <a
                            href="https://public.tableau.com/app/profile/takougang.kuatse.ronic/viz/TableaudeBordRH/HRSummary"
                            target="_blank"
                            rel="noreferrer"
                            className="project group"
                            ref={project2Ref}
                        >
                            <div className="image-wrapper overflow-hidden">
                                <img src="/images/HR.png" alt="HR Dashboard" className="group-hover:scale-105 transition-transform duration-500 h-80 w-full object-cover"/>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {hrTechStack.map((tech, index) => (
                                    <span key={index}
                                          className="bg-zinc-900/50 border border-zinc-800 text-white-50 px-2 py-1 rounded-full text-xs hover:bg-zinc-800 transition-colors">
                                    {tech.name}
                                </span>
                                ))}
                            </div>
                            <div className="flex items-center justify-between mt-3">
                                <h2 className="text-sm md:text-base lg:text-lg font-semibold">HR Dashboard</h2>
                                <div className="flex items-center gap-1 group/link">
                                    <p className="text-[6px] text-white-50 opacity-0 group-hover:opacity-100 transition-opacity">View Project</p>
                                    <img src="/images/arrow-right.svg" alt="arrow" className="size-[2px] -rotate-45 invert transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>
                                </div>
                            </div>
                        </a>
                        <a
                            href="https://lookerstudio.google.com/reporting/10eb5b17-4356-47c7-8cd1-b2c5fc27cdb2"
                            target="_blank"
                            rel="noreferrer"
                            className="project group"
                            ref={project3Ref}
                        >
                            <div className="image-wrapper overflow-hidden">
                                <img src="/images/Meteo.png" alt="Meteo Dashboard" className="group-hover:scale-105 transition-transform duration-500 h-80 w-full object-cover"/>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {meteoTechStack.map((tech, index) => (
                                    <span key={index}
                                          className="bg-zinc-900/50 border border-zinc-800 text-white-50 px-2 py-1 rounded-full text-xs hover:bg-zinc-800 transition-colors">
                                    {tech.name}
                                </span>
                                ))}
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <h2 className="text-sm md:text-base lg:text-lg font-semibold">Meteo Dashboard</h2>
                                <div className="flex items-center gap-1 group/link">
                                    <p className="text-[6px] text-white-50 opacity-0 group-hover:opacity-100 transition-opacity">View Project</p>
                                    <img src="/images/arrow-right.svg" alt="arrow" className="size-[2px] -rotate-45 invert transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="flex justify-center mt-8">
                    <SeeMoreButton />
                </div>
            </div>
        </section>
    )
}
export default ShowcaseSection
