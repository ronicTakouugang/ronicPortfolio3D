import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { words} from "../constants/index.js";
import Button from "../components/Button.jsx";

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

            <div className="w-full mx-auto flex flex-col sm:mt-52 mt-36 px-5 md:pl-10 md:pr-20 gap-5 relative z-10">
                <div className="hero-text text-white flex flex-col gap-y-3">
                    <h1 className="md:text-5xl text-2xl font-bold flex flex-wrap items-baseline gap-x-3 leading-tight">
                        Building
                        <span className="inline-flex overflow-hidden h-[1.1em]">
                            <span ref={wrapperRef} className="flex flex-col">
                                {words.map((word, index) => (
                                    <span key={index} className="flex items-center md:gap-2 gap-1 h-[1.1em]">
                                        <img
                                            src={word.imgPath}
                                            alt={word.text}
                                            className="xl:size-8 md:size-6 size-5 p-1 rounded-full bg-white-50 object-contain">
                                        </img>
                                        <span>{word.text}</span>
                                    </span>
                                ))}
                            </span>
                        </span>
                    </h1>
                    <h1 className="md:text-5xl text-2xl font-bold leading-tight">into Scalable Assets</h1>
                    <h1 className="md:text-5xl text-2xl font-bold leading-tight">that Drive Decisions</h1>
                </div>

                <p className='text-white-50 md:text-base text-xs relative z-10 pointer-events-none max-w-2xl'>
                    Hi, I am Ronic, a Data Analyst/Engineer based in France with a passion for turning complex data into actionable intelligence.
                </p>

                <Button
                    containerClass="md:w-64 md:h-12 w-52 h-10 mt-4"
                    text="See my Work!"
                />
            </div>
        </section>
    )
}
export default Hero
