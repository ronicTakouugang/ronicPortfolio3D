import React, { useRef } from 'react'
import TitleHeader from "../components/TitleHeader.jsx"
import { expCards } from "../constants/index.js"
import GlowCard from "../components/GlowCard.jsx"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FaBriefcase, FaRegCalendarAlt } from "react-icons/fa"

gsap.registerPlugin(ScrollTrigger)

const ExperienceSection = () => {
    const sectionRef = useRef(null)

    useGSAP(() => {
        // Fades this section out as Skills arrives below — same handoff pattern
        // as Hero→Work and Work→Experience, concentrated near the boundary so
        // it doesn't dim the timeline while it's still being read.
        gsap.to(sectionRef.current, {
            opacity: 0,
            y: -60,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "bottom bottom",
                end: "bottom top",
                scrub: true,
            },
        })

        // Animation pour les cartes timeline
        gsap.utils.toArray(".timeline-card").forEach((card) => {
            gsap.from(card, {
                xPercent: -100,
                opacity: 0,
                transformOrigin: "left left",
                duration: 1,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%"
                }
            })
        })

        // Animation pour la timeline verticale
        gsap.to(".timeline", {
            transformOrigin: "bottom bottom",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: ".timeline",
                start: "top center",
                end: "70% center",
                onUpdate: (self) => {
                    gsap.to(".timeline", {
                        scaleY: 1 - self.progress,
                    })
                }
            },
        })

        // Animation pour le texte d'expérience
        gsap.utils.toArray(".expText").forEach((text) => {
            gsap.from(text, {
                xPercent: 0,
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: text,
                    start: "top 60%"
                }
            })
        })
    }, [])

    return (
        <section id='experience' ref={sectionRef} className="w-full md:mt-40 mt-20 section-padding xl:px-0">
            <div className="w-full h-full md:px-20 px-5">
                <TitleHeader title="Professional Work Experience" sub="My career Overview" icon={FaBriefcase} />
                <div className="mt-32 relative">
                    <div className="relative z-50 xl:space-y-32 space-y-10">
                        {expCards.map((card, index) => (
                            <div key={card.title} className="exp-card-wrapper">
                                <div className="xl:w-2/6 overflow-hidden">
                                    <GlowCard card={card} index={index}>
                                        <div className="w-28 h-28">
                                            <img src={card.imgPath} alt={card.title} loading="lazy" />
                                        </div>
                                    </GlowCard>
                                </div>
                                <div className="xl:w-4/6">
                                    <div className="flex items-start">
                                        <div className="timeline-wrapper">
                                            <div className="timeline" />
                                            <div className="gradient-line w-1 h-full" />
                                        </div>
                                        <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-20">
                                            <div className="timeline-logo">
                                                <img
                                                    src={card.logoPath}
                                                    alt="logo"
                                                    className={`w-full h-full object-contain ${index === 0 || index === 2 ? 'p-1' : ''}`}
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div>
                                                <h1 className="font-semibold text-3xl">{card.title}</h1>
                                                <p className="my-5 text-white-50 flex items-center gap-2">
                                                    <FaRegCalendarAlt className="shrink-0" /> {card.date}
                                                </p>
                                                <p className="text-[#839cb5] italic">
                                                    Responsibilities
                                                </p>
                                                <ul className="list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50">
                                                    {card.responsibilities.map((responsibility) => (
                                                        <li key={responsibility} className="text-lg">
                                                            {responsibility}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ExperienceSection