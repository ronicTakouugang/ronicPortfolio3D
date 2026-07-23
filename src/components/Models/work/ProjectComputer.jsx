import { Suspense, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'

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

const ProjectComputer = ({ imagePath }) => {
    return (
        <Canvas
            camera={{ position: [-0.39, -0.04, 2.16], fov: 20 }}
            gl={{ toneMappingExposure: 1.5 }}
            frameloop="demand"
        >
            <ambientLight intensity={3.6} />
            <directionalLight position={[3, 4, 5]} intensity={5} />
            <directionalLight position={[-3, 3, 2]} intensity={3} />
            <pointLight position={[-3, 2, 4]} intensity={45} color="#8ab4ff" />
            <pointLight position={[2, -1, 3]} intensity={35} color="#ffffff" />
            <pointLight position={[0, 1.2, 2.2]} intensity={35} color="#ffffff" />
            <OrbitControls
                makeDefault
                target={MODEL_CENTER}
                enablePan={false}
                enableZoom={false}
                maxPolarAngle={1.536}
                minPolarAngle={1.309}
                maxAzimuthAngle={Math.PI / 6}
                minAzimuthAngle={-Math.PI / 6}
            />
            <Suspense fallback={null}>
                <Computer imagePath={imagePath} />
            </Suspense>
        </Canvas>
    )
}

useTexture.preload('/images/Stockz.png')
useTexture.preload('/images/HR.png')
useTexture.preload('/images/Meteo.png')
useGLTF.preload('/models/Computer/Computer.gltf')

export default ProjectComputer
