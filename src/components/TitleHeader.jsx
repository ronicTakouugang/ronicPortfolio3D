import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { prefersReducedMotion } from '../utils/prefersReducedMotion.js'

gsap.registerPlugin(ScrollTrigger, SplitText)

const TitleHeader = ({title, sub, icon: Icon}) => {
    const titleRef = useRef(null)

    useGSAP(() => {
        if (!titleRef.current || prefersReducedMotion()) return

        const split = new SplitText(titleRef.current, { type: 'words' })
        gsap.from(split.words, {
            opacity: 0,
            y: 24,
            stagger: 0.04,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: titleRef.current,
                start: 'top 85%',
            },
        })

        return () => split.revert()
    }, [title])

    return (
        <div className="flex flex-col items-center gap-5">
            <div className="hero-badge flex items-center gap-2">
                {Icon && <Icon className="size-4 shrink-0" />}
                <p>{sub}</p>
            </div>
            <div ref={titleRef} className="font-semibold md:text-5xl text-3xl text-center">
                {title}
            </div>
        </div>
    )
}
export default TitleHeader
