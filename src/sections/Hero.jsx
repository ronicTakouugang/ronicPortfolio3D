import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { words} from "../constants/index.js";
import Button from "../components/Button.jsx";
import HeroExperience from "../components/HeroModels/HeroExperience.jsx";

const Hero = () => {
    const wrapperRef = useRef();

    useGSAP(() => {
        const wrapper = wrapperRef.current;
        const items = wrapper.children;
        const totalItems = items.length;
        const itemHeight = items[0].getBoundingClientRect().height;

        // On crée une timeline pour permettre les pauses
        const tl = gsap.timeline({
            repeat: -1,
        });

        // On anime chaque mot un par un
        // Note: on va jusqu'à totalItems - 1 car le dernier est une copie du premier pour la boucle
        for (let i = 1; i < totalItems; i++) {
            tl.to(wrapper, {
                y: -i * itemHeight,
                duration: 0.8,
                ease: "power2.inOut",
            }, "+=1.5"); // Pause de 1.5 secondes entre chaque mouvement
        }
    }, { scope: wrapperRef });

    return (
        <section id="hero" className="relative overflow-hidden h-screen w-full flex flex-col">
            <div className="absolute top-0 left-0 z-0 w-full h-full">
                <img src="/images/bg.png" alt="background" className="w-full h-full object-cover opacity-50"/>
            </div>

            <div className="w-full mx-auto flex flex-col sm:mt-72 mt-56 px-5 md:pl-10 md:pr-20 gap-4 relative z-10 pointer-events-none">
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
                                            className="xl:size-6 md:size-5 size-4 p-1 rounded-full bg-white-50 object-contain">
                                        </img>
                                        <span>{word.text}</span>
                                    </span>
                                ))}
                            </span>
                        </span>
                    </h1>
                    <h1 className="md:text-4xl text-xl font-bold leading-tight">into Scalable Assets</h1>
                    <h1 className="md:text-4xl text-xl font-bold leading-tight">that Drive Decisions</h1>
                </div>

                <p className='text-white-50 md:text-sm text-[10px] relative z-10 pointer-events-auto max-w-xl'>
                    Hi, I am Ronic, a Data Analyst/Engineer based in France with a passion for turning complex data into actionable intelligence.
                </p>

                <div className="flex pointer-events-auto">
                    <Button
                        containerClass="md:w-56 md:h-11 w-44 h-9 mt-2"
                        text="See my Work!"
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
