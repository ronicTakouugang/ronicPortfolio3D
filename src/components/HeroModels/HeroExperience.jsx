import React, { Suspense, useRef, useState, useEffect } from 'react'
import {Canvas, useFrame} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {useMediaQuery} from "react-responsive";
import {BusinessMan} from "./BusinessMan.jsx";
import DashboardScreen from "./DashboardScreen.jsx";

const FloatingGroup = ({ isMobile, isTablet, isInteracting, children }) => {
    const groupRef = useRef()
    const baseY = isMobile ? -4 : isTablet ? -4.5 : -5;

    useFrame((state) => {
        if (groupRef.current && !isInteracting) {
            // Floating effect
            groupRef.current.position.y = baseY + Math.sin(state.clock.elapsedTime) * 0.4;
        }
    })

    const scale = isMobile ? 0.8 : isTablet ? 0.9 : 1;
    const position = isMobile ? [0, baseY, 0] : isTablet ? [0, baseY, 0] : [1, baseY, 0];

    return (
        <group
            ref={groupRef}
            scale={scale}
            position={position}
            rotation={[0, -Math.PI / 6, 0]}
        >
            {children}
        </group>
    )
}

const DataAnalyst = () => {
    return (
        <group>
            <BusinessMan scale={9.5} />
            <DashboardScreen position={[3.2, 8.6, 1.2]} rotation={[0, -Math.PI / 6, 0]} scale={3.5} />
        </group>
    )
}

const HeroExperience = () => {
    const isTablet = useMediaQuery({query: '(max-width: 1024px)'})
    const isMobile = useMediaQuery({query: '(max-width: 768px)'})
    const [isInteracting, setIsInteracting] = useState(false)
    const timeoutRef = useRef(null)

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
        <Canvas camera={{position : [0, 0, 60], fov:40}}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[10, 10, 12 ]} intensity={1.5}/>
            <OrbitControls
                enablePan={false}
                enableZoom={true}
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
    )
}
export default HeroExperience
