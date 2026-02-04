import React, { Suspense, useRef, useState, useEffect } from 'react'
import {Canvas, useFrame} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {useMediaQuery} from "react-responsive";
import {Room} from "./Office_room.jsx";

const FloatingGroup = ({ isMobile, isTablet, isInteracting, children }) => {
    const groupRef = useRef()

    useFrame((state, delta) => {
        if (groupRef.current) {
            // Floating effect
            groupRef.current.position.y = -12 + Math.sin(state.clock.elapsedTime) * 0.5;
        }
    })

    const scale = isMobile ? 0.03 : isTablet ? 0.035 : 0.045;
    const position = isMobile ? [0, -12, 0] : isTablet ? [0, -12, 0] : [1, -12, 0];

    return (
        <group
            ref={groupRef}
            scale={scale}
            position={position}
            rotation={[0, -Math.PI / 4, 0]}
        >
            {children}
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
            <Suspense fallback={null}>
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
                <FloatingGroup isMobile={isMobile} isTablet={isTablet} isInteracting={isInteracting}>
                    <Room/>
                </FloatingGroup>
            </Suspense>
        </Canvas>
    )
}
export default HeroExperience
