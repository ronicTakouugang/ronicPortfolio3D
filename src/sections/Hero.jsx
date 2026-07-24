import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { words} from "../constants/index.js";
import Button from "../components/Button.jsx";
import HeroExperience from "../components/HeroModels/HeroExperience.jsx";
import { prefersReducedMotion } from "../utils/prefersReducedMotion.js";

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
    const sectionRef = useRef();
    const containerRef = useRef();
    const wrapperRef = useRef();

    useGSAP(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;
        const items = wrapper.children;
        if (items.length === 0) return;

        const totalItems = items.length;
        const itemHeight = items[0].getBoundingClientRect().height;

        // Entrance animation for the titles
        gsap.fromTo('.hero-text h1',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: "power2.out" }
        )

        // Ties directly to scroll position (not autoplaying), so this runs
        // regardless of prefers-reduced-motion: the hero text dissolves and
        // lifts away as you scroll past it, instead of just vanishing when
        // Work's own reveal happens to fire — the two sections hand off to
        // each other rather than acting independently.
        gsap.to(containerRef.current, {
            opacity: 0,
            y: -60,
            ease: "none",
            scrollTrigger: {
                // A ref, not the "#hero" string: useGSAP's scope only resolves
                // string selectors against containerRef's descendants, and #hero
                // is containerRef's ancestor — the string form silently failed
                // to find it and fell back to a much smaller implicit trigger.
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        })

        // The word cycler and flag wiggle repeat forever, which is exactly the kind
        // of motion prefers-reduced-motion asks to skip — leave the first word and
        // a still flag in place instead of looping them.
        if (prefersReducedMotion()) return;

        // Vertical word animation
        const tl = gsap.timeline({
            repeat: -1,
        });

        for (let i = 1; i <= totalItems; i++) {
            tl.to(wrapper, {
                y: -i * itemHeight,
                duration: 0.8,
                ease: "power2.inOut",
            }, "+=1.5");
        }

        // Flag oscillation animation
        gsap.to('.flag-oscillation', {
            rotate: 15,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            skewX: 5
        })
    }, { scope: containerRef });

    return (
        <section id="hero" ref={sectionRef} className="relative h-screen w-full flex flex-col">
            <div className="absolute top-0 left-0 z-0 w-full h-full">
                <img src="/images/bg.png" alt="background" className="w-full h-full object-cover opacity-50"/>
            </div>

            <div ref={containerRef} className="w-full mx-auto flex flex-col sm:mt-72 mt-56 px-5 md:pl-10 md:pr-20 gap-4 relative z-10 pointer-events-none">
                <div className="hero-text text-white flex flex-col gap-y-2 pointer-events-auto w-fit">
                    <h1 className="md:text-4xl text-xl font-bold flex flex-wrap items-baseline gap-x-3 leading-tight">
                        Building
                        <span className="inline-flex overflow-hidden h-[1.1em]">
                            <span ref={wrapperRef} className="flex flex-col">
                                {words.map((word, index) => (
                                    <span key={index} className="flex items-center md:gap-2 gap-1 h-[1.1em]">
                                        <img
                                            src={word.imgPath}
                                            alt={word.text}
                                            className="xl:size-6 md:size-5 size-4 p-1 rounded-full bg-white-50 object-contain"
                                        />
                                        <span>{word.text}</span>
                                    </span>
                                ))}
                                {/* Dupliquer le premier mot pour un loop fluide */}
                                <span className="flex items-center md:gap-2 gap-1 h-[1.1em]">
                                    <img
                                        src={words[0].imgPath}
                                        alt={words[0].text}
                                        className="xl:size-6 md:size-5 size-4 p-1 rounded-full bg-white-50 object-contain"
                                    />
                                    <span>{words[0].text}</span>
                                </span>
                            </span>
                        </span>
                    </h1>
                    <h1 className="md:text-4xl text-xl font-bold leading-tight">into Scalable Assets</h1>
                    <h1 className="md:text-4xl text-xl font-bold leading-tight">that Drive Decisions</h1>
                </div>

                <p className='text-white-50 md:text-sm text-[10px] relative z-10 pointer-events-auto max-w-xl'>
                    Hi, I am Ronic, a Data Analyst/Engineer based in <span className="inline-block origin-bottom-center flag-oscillation">🇫🇷</span> with a passion for turning complex data into actionable intelligence.
                </p>

                <div className="flex pointer-events-auto">
                    <Button
                        containerClass="md:w-56 md:h-11 w-44 h-9 mt-2"
                        text="See my Work!"
                        id="work"
                    />
                </div>
            </div>

            {/* 3D Model Section */}
            <div className="hero-3d-layout">
                <HeroExperience/>
            </div>
        </section>
    )
}
export default Hero
