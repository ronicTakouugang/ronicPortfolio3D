import React, { useEffect, useRef, useState } from 'react';
import { useProgress } from '@react-three/drei';
import gsap from 'gsap';
import './LoadingScreen.css';

const LoadingScreen = () => {
    const { progress, active } = useProgress();
    const [visible, setVisible] = useState(true);
    const containerRef = useRef(null);
    const barRef = useRef(null);
    const percentageRef = useRef(null);

    useEffect(() => {
        if (barRef.current) {
            gsap.to(barRef.current, {
                width: `${progress}%`,
                ease: 'power2.inOut',
                duration: 0.5
            });
        }

        if (percentageRef.current) {
            const percentage = { value: parseFloat(percentageRef.current.textContent) || 0 };
            gsap.to(percentage, {
                value: progress,
                roundProps: "value",
                onUpdate: () => {
                    if(percentageRef.current) {
                        percentageRef.current.textContent = `${Math.round(percentage.value)}%`;
                    }
                },
                ease: 'power2.inOut',
                duration: 0.5
            });
        }

        if (progress === 100 && !active) {
            gsap.to(containerRef.current, {
                opacity: 0,
                duration: 1,
                delay: 0.5,
                onComplete: () => setVisible(false)
            });
        }
    }, [progress, active]);

    if (!visible) return null;

    return (
        <div className="loading-screen" ref={containerRef}>
            <div className="loading-container">
                <div className="bar-chart-container">
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
                <div className="loading-bar">
                    <div className="loading-bar-inner" ref={barRef}></div>
                </div>
                <div className="loading-percentage" ref={percentageRef}>0%</div>
            </div>
        </div>
    );
};

export default LoadingScreen;
