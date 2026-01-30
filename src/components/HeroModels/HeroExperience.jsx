import React, { Suspense, useRef, useState } from 'react'
import {Canvas, useFrame} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {useMediaQuery} from "react-responsive";
import {Room} from "./Office_room.jsx";

const RotatingGroup = ({ isMobile, isInteracting, children }) => {
    const groupRef = useRef()

    useFrame((state, delta) => {
        if (!isInteracting && groupRef.current) {
            groupRef.current.rotation.y += delta * 0.2 // Rotation lente
        }
    })

    return (
        <group
            ref={groupRef}
            scale={isMobile ? 0.035 : 0.055}
            position={[-2, -10, 0]}
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

    return (
        <Canvas camera={{position : [0, 0, 60], fov:40}}>
            <Suspense fallback={null}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[10, 10, 10]} intensity={1.5}/>
                <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    maxDistance={60}
                    minDistance={5}
                    onStart={() => setIsInteracting(true)}
                    onEnd={() => setIsInteracting(false)}
                />
                <RotatingGroup isMobile={isMobile} isInteracting={isInteracting}>
                    <Room/>
                </RotatingGroup>
            </Suspense>
        </Canvas>
    )
}
export default HeroExperience
