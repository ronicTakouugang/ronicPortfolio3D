import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'
import * as THREE from 'three'

const setSrgb = (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace
    tex.needsUpdate = true
}

const Monitor = ({ imagePath }) => {
    const texture = useTexture(imagePath, setSrgb)

    return (
        <group>
            {/* Desk */}
            <mesh position={[0, -1.85, -0.3]} receiveShadow>
                <boxGeometry args={[4.4, 0.12, 2.2]} />
                <meshStandardMaterial color="#2a2a2e" roughness={0.7} />
            </mesh>
            {/* Stand */}
            <mesh position={[0, -1.35, -0.15]}>
                <boxGeometry args={[0.6, 0.12, 0.5]} />
                <meshStandardMaterial color="#15161a" roughness={0.6} />
            </mesh>
            <mesh position={[0, -1.0, -0.15]}>
                <boxGeometry args={[0.14, 0.75, 0.14]} />
                <meshStandardMaterial color="#15161a" roughness={0.6} />
            </mesh>
            {/* Bezel */}
            <mesh position={[0, 0, -0.12]}>
                <boxGeometry args={[3.05, 1.85, 0.14]} />
                <meshStandardMaterial color="#0d0e11" roughness={0.5} metalness={0.25} />
            </mesh>
            {/* Screen */}
            <mesh position={[0, 0, -0.04]}>
                <planeGeometry args={[2.82, 1.62]} />
                <meshBasicMaterial map={texture} toneMapped={false} />
            </mesh>
            {/* Keyboard */}
            <mesh position={[0, -1.77, 0.65]} rotation={[-0.25, 0, 0]}>
                <boxGeometry args={[1.7, 0.08, 0.6]} />
                <meshStandardMaterial color="#15161a" roughness={0.6} />
            </mesh>
        </group>
    )
}

const ProjectComputer = ({ imagePath }) => {
    return (
        <Canvas camera={{ position: [0, 0.15, 5.2], fov: 32 }} frameloop="demand">
            <ambientLight intensity={1.3} />
            <directionalLight position={[3, 4, 5]} intensity={2} />
            <pointLight position={[-3, 2, 4]} intensity={70} color="#8ab4ff" />
            <pointLight position={[2, -1, 3]} intensity={40} color="#ffffff" />
            <OrbitControls
                enablePan={false}
                enableZoom={false}
                maxPolarAngle={Math.PI / 2.05}
                minPolarAngle={Math.PI / 2.6}
                maxAzimuthAngle={Math.PI / 6}
                minAzimuthAngle={-Math.PI / 6}
            />
            <Suspense fallback={null}>
                <Monitor imagePath={imagePath} />
            </Suspense>
        </Canvas>
    )
}

useTexture.preload('/images/Stockz.png')
useTexture.preload('/images/HR.png')
useTexture.preload('/images/Meteo.png')

export default ProjectComputer
