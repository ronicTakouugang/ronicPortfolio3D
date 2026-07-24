import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setLenis } from '../lib/lenis.js'
import { prefersReducedMotion } from '../utils/prefersReducedMotion.js'

gsap.registerPlugin(ScrollTrigger)

// Drives page scroll through Lenis for inertia/easing, then keeps
// ScrollTrigger and the browser's native scroll events (NavBar, anchors) in sync with it.
export const useSmoothScroll = () => {
    useEffect(() => {
        // Inertial/eased scrolling is exactly the kind of motion prefers-reduced-motion
        // asks for less of — fall back to plain native scroll (ScrollTrigger still
        // works fine off native scroll events without Lenis in the loop).
        if (prefersReducedMotion()) return

        const lenis = new Lenis({
            duration: 1.1,
            easing: (t) => 1 - Math.pow(1 - t, 3),
            smoothWheel: true,
            anchors: true,
        })

        setLenis(lenis)
        lenis.on('scroll', ScrollTrigger.update)

        const tick = (time) => lenis.raf(time * 1000)
        gsap.ticker.add(tick)
        gsap.ticker.lagSmoothing(0)

        return () => {
            gsap.ticker.remove(tick)
            setLenis(null)
            lenis.destroy()
        }
    }, [])
}
