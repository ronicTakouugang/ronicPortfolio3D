import { Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Scene3D from "../../Scene3D.jsx";

const TechIconCardExperience = ({ model }) => {
    const scene = useGLTF(model.modelPath);
    const [isVisible, setIsVisible] = useState(false);
    const wrapperRef = useRef(null);

    // Only run this canvas's render loop while it's actually on screen -
    // each tech icon has its own Canvas, and left unchecked they all render forever.
    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        let newMaterial;
        if (model.name === "Data Architecture") {
            scene.scene.traverse((child) => {
                if (child.isMesh) {
                    if (child.name === "Object_5") {
                        if (child.material) {
                            child.material.dispose();
                        }
                        newMaterial = new THREE.MeshStandardMaterial({ color: "white" });
                        child.material = newMaterial;
                    }
                }
            });
        }

        return () => {
            if (newMaterial) {
                newMaterial.dispose();
            }
        };
    }, [scene, model.name]);

    return (
        <div ref={wrapperRef} className="w-full h-full">
            <Scene3D>
                <Canvas frameloop={isVisible ? 'always' : 'never'}>
                    <ambientLight intensity={0.3} />
                    <directionalLight position={[5, 5, 5]} intensity={1} />
                    <spotLight
                        position={[10, 15, 10]}
                        angle={0.3}
                        penumbra={1}
                        intensity={2}
                    />
                    <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
                        <group scale={model.scale} rotation={model.rotation}>
                            <primitive object={scene.scene} />
                        </group>
                    </Float>

                    <OrbitControls enableZoom={false} />
                </Canvas>
            </Scene3D>
        </div>
    );
};

export default TechIconCardExperience;