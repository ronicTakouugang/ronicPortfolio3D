import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import SceneEffects from '../../SceneEffects.jsx'
import { prefersReducedMotion } from '../../../utils/prefersReducedMotion.js'

// The desk model's own geometry isn't centered at the scene origin (its true
// bounding-box center, computed from the glTF accessor bounds, sits here) —
// point the camera/controls at this instead of [0,0,0] or they aim at empty space.
const MODEL_CENTER = [-0.389, -0.576, -1.67]

const setSrgb = (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace
    tex.needsUpdate = true
}

const Computer = ({ imagePath }) => {
    const { nodes, materials } = useGLTF('/models/Computer/Computer.gltf')
    const texture = useTexture(imagePath, setSrgb)
    const invalidate = useThree((state) => state.invalidate)

    // frameloop="demand" only re-renders on explicit triggers, so swapping the
    // screen texture needs its own invalidate() or the old image stays on screen
    useEffect(() => {
        invalidate()
    }, [texture, invalidate])

    return (
        <group scale={0.022} position={[0, -0.55, 0]}>
            {/* Matches the exported "Sketchfab_model" root transform; every child node below is otherwise at identity */}
            <group
                position={[-17.296865463256836, -14.286227226257324, -91.37220001220703]}
                rotation={[-1.1248836862495875, 0, 0]}
            >
                <mesh geometry={nodes.GeometryNode_11_0.geometry} material={materials.Material} />
                <mesh geometry={nodes.GeometryNode_11_1.geometry} material={materials.Material} />
                <mesh geometry={nodes.GeometryNode_29_0.geometry} material={materials.corpus} />
                <mesh geometry={nodes.GeometryNode_29_1.geometry} material={materials.corpus} />
                <mesh geometry={nodes.GeometryNode_39_0.geometry} material={materials.keyboard_lamp} />
                <mesh geometry={nodes.GeometryNode_39_1.geometry} material={materials.keyboard_lamp} />
                <mesh geometry={nodes.GeometryNode_50_0.geometry} material={materials.keyboard_layout} />
                <mesh geometry={nodes.GeometryNode_50_1.geometry} material={materials.keyboard_layout} />
                <mesh geometry={nodes.GeometryNode_63_0.geometry} material={materials.keyboard_layout} />
                <mesh geometry={nodes.GeometryNode_63_1.geometry} material={materials.keyboard_layout} />
                <mesh geometry={nodes.GeometryNode_73_0.geometry} material={materials.lamp} />
                <mesh geometry={nodes.GeometryNode_73_1.geometry} material={materials.lamp} />
                <mesh geometry={nodes.GeometryNode_86_0.geometry} material={materials.screen} />
                <mesh geometry={nodes.GeometryNode_86_1.geometry} material={materials.screen} />
                <mesh geometry={nodes.GeometryNode_99_0.geometry} material={materials.speakerPBR} />
                <mesh geometry={nodes.GeometryNode_99_1.geometry} material={materials.speakerPBR} />
                <mesh geometry={nodes.GeometryNode_112_0.geometry} material={materials['speakerPBR.001']} />
                <mesh geometry={nodes.GeometryNode_112_1.geometry} material={materials['speakerPBR.001']} />
                {/* Screen overlay: sized to the "screen" material mesh's own local bounds so the project image sits flush on the monitor */}
                <mesh position={[-0.0238, 0.994, 22.1398]} rotation={[Math.PI / 2, 0, 0]} renderOrder={1}>
                    <planeGeometry args={[49.917, 26.912]} />
                    {/* depthTest off: the plane sits a hair above the model's own "screen" mesh, close enough at this scale to z-fight otherwise */}
                    <meshBasicMaterial map={texture} toneMapped={false} depthTest={false} />
                </mesh>
            </group>
        </group>
    )
}

// Gently swings the camera between the same azimuth limits a user could drag to,
// so the desk feels alive while idle instead of sitting dead-still until touched.
// Drei's own OrbitControls `autoRotate` doesn't work here: it only ever spins one
// way, and with a ±30° limit it would just drift to one edge and stay pinned —
// this ping-pongs within the limit instead, and yields to the user immediately.
const LivingCamera = ({ controlsRef, isInteracting, enabled }) => {
    useFrame((state) => {
        if (!enabled || isInteracting || !controlsRef.current) return
        const amplitude = Math.PI / 6.5
        const target = Math.sin(state.clock.elapsedTime * 0.3) * amplitude
        // Ease toward the sine target instead of snapping straight to it — without
        // this, resuming right after a drag jumps from wherever the user left the
        // camera to whatever phase the sine wave happens to be at.
        const current = controlsRef.current.getAzimuthalAngle()
        controlsRef.current.setAzimuthalAngle(current + (target - current) * 0.04)
        controlsRef.current.update()
        state.invalidate()
    })
    return null
}

const ProjectComputer = ({ imagePath }) => {
    const wrapperRef = useRef(null)
    const controlsRef = useRef(null)
    const resumeTimeoutRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)
    const [isInteracting, setIsInteracting] = useState(false)
    const livingCameraEnabled = useRef(!prefersReducedMotion()).current

    // Same "pause offscreen" pattern as the Hero character: only pay for a
    // continuous render loop while this canvas is actually on screen.
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

    // Same debounced-resume pattern as the Hero character's floating animation:
    // give the user a few quiet seconds after they let go before the camera
    // takes back over, rather than resuming the instant they release the drag.
    const handleInteractionStart = () => {
        if (resumeTimeoutRef.current) {
            clearTimeout(resumeTimeoutRef.current)
            resumeTimeoutRef.current = null
        }
        setIsInteracting(true)
    }
    const handleInteractionEnd = () => {
        if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
        resumeTimeoutRef.current = setTimeout(() => setIsInteracting(false), 4000)
    }
    useEffect(() => () => {
        if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    }, [])

    return (
        <div ref={wrapperRef} className="w-full h-full">
            <Canvas
                camera={{ position: [-0.39, -0.04, 2.16], fov: 20 }}
                gl={{ toneMappingExposure: 1.5 }}
                frameloop={livingCameraEnabled && isVisible ? 'always' : 'demand'}
            >
                <ambientLight intensity={3.6} />
                <directionalLight position={[3, 4, 5]} intensity={5} />
                <directionalLight position={[-3, 3, 2]} intensity={3} />
                <pointLight position={[-3, 2, 4]} intensity={45} color="#8ab4ff" />
                <pointLight position={[2, -1, 3]} intensity={35} color="#ffffff" />
                <pointLight position={[0, 1.2, 2.2]} intensity={35} color="#ffffff" />
                <OrbitControls
                    ref={controlsRef}
                    makeDefault
                    target={MODEL_CENTER}
                    enablePan={false}
                    enableZoom={false}
                    maxPolarAngle={1.536}
                    minPolarAngle={1.309}
                    maxAzimuthAngle={Math.PI / 6}
                    minAzimuthAngle={-Math.PI / 6}
                    onStart={handleInteractionStart}
                    onEnd={handleInteractionEnd}
                />
                <Suspense fallback={null}>
                    <Computer imagePath={imagePath} />
                </Suspense>
                <LivingCamera controlsRef={controlsRef} isInteracting={isInteracting} enabled={livingCameraEnabled && isVisible} />
                {/* Screenshots have large bright/white areas, so keep the bloom threshold
                    high — this should only catch the brightest highlights, not the whole screen. */}
                <SceneEffects bloomIntensity={0.35} vignetteDarkness={0.45} />
            </Canvas>
        </div>
    )
}

useTexture.preload('/images/Stockz.jpg')
useTexture.preload('/images/ShopWise.png')
useTexture.preload('/images/JobMarket.png')
useGLTF.preload('/models/Computer/Computer.gltf')

export default ProjectComputer
