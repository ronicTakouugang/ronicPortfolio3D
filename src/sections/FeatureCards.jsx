import React from 'react'
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {abilities} from "../constants/index.js";

gsap.registerPlugin(ScrollTrigger);

const FeatureCards = () => {
    useGSAP(() => {
        gsap.from(".feature-card", {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
                trigger: ".grid-3-cols",
                start: "top 80%",
            },
        })
    }, []);

    return (
        <div className="w-full padding-x-lg">
            <div className="mx-auto grid-3-cols">
                {abilities.map(({imgPath, title, desc})=>(
                    <div key={title} className="feature-card card-border rounded-xl p-8 flex flex-col gap-4">
                        <div className="size-14 flex items-center justify-center rounded-full">
                            <img src={imgPath} alt={title}/>
                        </div>
                        <h3 className="text-white text-2xl font-semibold mt-2">{title}</h3>
                        <p className="text-white-50 text-lg">{desc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default FeatureCards
