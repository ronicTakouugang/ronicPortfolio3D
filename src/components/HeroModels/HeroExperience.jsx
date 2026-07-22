import React, { Suspense, useRef, useState, useEffect } from 'react'
import {Canvas, useFrame} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {useMediaQuery} from "react-responsive";
import {BusinessMan} from "./BusinessMan.jsx";
import DashboardScreen from "./DashboardScreen.jsx";

const FloatingGroup = ({ isMobile, isTablet, isInteracting, children }) => {
    const groupRef = useRef()
    const baseY = isMobile ? -11.5 : isTablet ? -12 : -13;

    useFrame((state) => {
        if (groupRef.current && !isInteracting) {
            // Floating effect
            groupRef.current.position.y = baseY + Math.sin(state.clock.elapsedTime) * 0.4;
        }
    })

    const scale = isMobile ? 1.3 : isTablet ? 1.45 : 1.6;
    const position = isMobile ? [0, baseY, 0] : isTablet ? [0, baseY, 0] : [1, baseY, 0];

    return (
        <group
            ref={groupRef}
            scale={scale}
            position={position}
            rotation={[0, -Math.PI / 12, 0]}
        >
            {children}
        </group>
    )
}

const DataAnalyst = () => {
    return (
        <group>
            <BusinessMan scale={9.5} rotation={[0, Math.PI / 5, 0]} />
            <DashboardScreen position={[4.6, 11.5, 2.2]} rotation={[0, Math.PI / 12, 0]} scale={2.6} />
        </group>
    )
}

const HeroExperience = () => {
    const isTablet = useMediaQuery({query: '(max-width: 1024px)'})
    const isMobile = useMediaQuery({query: '(max-width: 768px)'})
    const [isInteracting, setIsInteracting] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const wrapperRef = useRef(null)
    const timeoutRef = useRef(null)

    // Stop the render loop entirely once the hero scrolls out of view, so the
    // animated character/dashboard don't keep costing frame time on the rest of the page.
    useEffect(() => {
        const el = wrapperRef.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    const handleInteractionStart = () => {
        setIsInteracting(true)
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
    }

    const handleInteractionEnd = () => {
        // Clear any existing timeout just in case
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        
        // Start a 10 seconds timer before resuming rotation
        timeoutRef.current = setTimeout(() => {
            setIsInteracting(false)
        }, 10000)
    }

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <div ref={wrapperRef} className="w-full h-full">
            <Canvas camera={{position : [0, 0, 60], fov:40}} frameloop={isVisible ? 'always' : 'never'}>
                <ambientLight intensity={1.5} />
                <directionalLight position={[10, 10, 12 ]} intensity={2.4}/>
                <pointLight position={[8, 4, 25]} intensity={260} color="#ffffff" />
                <pointLight position={[-10, 8, 15]} intensity={150} color="#8ab4ff" />
                <pointLight position={[5, 15, 10]} intensity={120} color="#ffffff" />
                <OrbitControls
                    enablePan={false}
                    enableZoom={false}
                    maxDistance={60}
                    minDistance={5}
                    onStart={handleInteractionStart}
                    onEnd={handleInteractionEnd}
                />
                <Suspense fallback={null}>
                    <FloatingGroup isMobile={isMobile} isTablet={isTablet} isInteracting={isInteracting}>
                        <DataAnalyst/>
                    </FloatingGroup>
                </Suspense>
            </Canvas>
        </div>
    )
}
export default HeroExperience
