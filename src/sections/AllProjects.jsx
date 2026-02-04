import React, { useEffect, useRef, useState } from 'react';
import { projects } from '../constants/projects';
import '../all-projects.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useMediaQuery } from 'react-responsive';

const ProjectDetails = ({ project, handleBack }) => (
    <>
        {project && (
            <>
                <button onClick={handleBack} className="back-button">
                    <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                </button>
                <div className='project-details-content'>
                    <div className="flex items-center gap-4 mb-4">
                        <h2 className='project-details-title'>{project.title}</h2>
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 text-white hover:text-gray-400">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                        </a>
                    </div>
                    <div className="project-tech-list">
                        {project.tech.map((tech, index) => (
                            <span key={index}  className="bg-zinc-900/50 border border-zinc-800 text-white-50 px-2 py-1 rounded-full text-xs hover:bg-zinc-800 transition-colors">{tech}</span>
                        ))}
                    </div>
                    <p className='project-details-description'>{project.description}</p>
                </div>
            </>
        )}
    </>
);

const AllProjects = () => {
    const containerRef = useRef(null);
    const dragRef = useRef(null);
    const spinRef = useRef(null);
    const detailsRef = useRef(null);
    const sceneRef = useRef(null);

    const [selectedProject, setSelectedProject] = useState(null);
    const selectedProjectRef = useRef(null);
    const [timeline, setTimeline] = useState(null);
    const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });

    useGSAP(() => {
        const tl = gsap.timeline({ paused: true });

        if (isMobile) {
            tl.to(detailsRef.current, {
                right: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        } else {
            tl.to(sceneRef.current, {
                x: "-30%",
                scale: 0.8,
                opacity: 0.3,
                duration: 1,
                ease: "power3.inOut"
            }).to(detailsRef.current, {
                right: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.8");
        }

        setTimeline(tl);

    }, { scope: containerRef, dependencies: [isMobile] });

    useEffect(() => {
        selectedProjectRef.current = selectedProject;
        const ospin = spinRef.current;
        if (!ospin) return;

        if (selectedProject) {
            ospin.style.animationPlayState = 'paused';
            timeline && timeline.play();
        } else {
            timeline && timeline.reverse();
            setTimeout(() => {
                if (ospin) {
                    ospin.style.animationPlayState = 'running';
                }
            }, 800); // Corresponds to the duration of the reverse animation
        }
    }, [selectedProject, timeline]);

    useEffect(() => {
        let radius = 250;
        const autoRotate = true;
        const rotateSpeed = -60;
        const imgWidth = 150;
        const imgHeight = 210;

        let tX = 0;
        let tY = 10;
        let desX = 0;
        let desY = 0;

        const odrag = dragRef.current;
        const ospin = spinRef.current;

        if (!ospin || !odrag) return;

        const aEle = Array.from(ospin.children);

        ospin.style.width = `${imgWidth}px`;
        ospin.style.height = `${imgHeight}px`;

        /**
         * Position carousel items in a circular layout around the Z-axis and set their transition timing.
         * @param {string|number} [delayTime] - Optional transition-delay to apply to each element; if omitted, a per-item delay of `(aEle.length - i) / 4s` is used.
         */
        function init(delayTime) {
            for (let i = 0; i < aEle.length; i++) {
                aEle[i].style.transform = `rotateY(${i * (360 / aEle.length)}deg) translateZ(${radius}px)`;
                aEle[i].style.transition = 'transform 1s';
                aEle[i].style.transitionDelay = delayTime || `${(aEle.length - i) / 4}s`;
            }
        }

        setTimeout(() => init(100), 0);

        /**
         * Apply the current rotation values to a DOM element, constraining the vertical angle.
         *
         * Clamps `tY` to the range 0–180 and sets the element's CSS `transform` to
         * `rotateX(-tYdeg) rotateY(tXdeg)`, where `tX` and `tY` are external rotation state.
         *
         * @param {HTMLElement} obj - The element whose transform will be updated.
         */
        function applyTransform(obj) {
            if (tY > 180) tY = 180;
            if (tY < 0) tY = 0;
            obj.style.transform = `rotateX(${-tY}deg) rotateY(${tX}deg)`;
        }

        /**
         * Toggle the carousel spin animation on the `ospin` element.
         * @param {boolean} yes - `true` to resume the spin animation, `false` to pause it.
         */
        function playSpin(yes) {
            ospin.style.animationPlayState = yes ? 'running' : 'paused';
        }

        if (autoRotate) {
            const animationName = rotateSpeed > 0 ? 'spin' : 'spinRevert';
            ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
        }

        let sX, sY, nX, nY;

        const onPointerDown = function (e) {
            if (selectedProjectRef.current) return;
            clearInterval(odrag.timer);
            e = e || window.event;
            sX = e.clientX;
            sY = e.clientY;

            this.onpointermove = function (e) {
                e = e || window.event;
                nX = e.clientX;
                nY = e.clientY;
                desX = nX - sX;
                desY = nY - sY;
                tX += desX * 0.1;
                tY += desY * 0.1;
                applyTransform(odrag);
                sX = nX;
                sY = nY;
            };

            this.onpointerup = function () {
                odrag.timer = setInterval(function () {
                    desX *= 0.95;
                    desY *= 0.95;
                    tX += desX * 0.1;
                    tY += desY * 0.1;
                    applyTransform(odrag);
                    playSpin(false);
                    if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
                        clearInterval(odrag.timer);
                        playSpin(true);
                    }
                }, 17);
                this.onpointermove = this.onpointerup = null;
            };

            return false;
        };

        const onMouseWheel = function (e) {
            if (selectedProjectRef.current) return;
            e = e || window.event;
            const d = e.wheelDelta / 20 || -e.detail;
            radius += d;
            init(1);
        };

        document.addEventListener('pointerdown', onPointerDown);
        document.addEventListener('mousewheel', onMouseWheel);

        return () => {
            document.removeEventListener('pointerdown', onPointerDown);
            document.removeEventListener('mousewheel', onMouseWheel);
            if (odrag && odrag.timer) {
                clearInterval(odrag.timer);
            }
        }
    }, []);

    const handleProjectClick = (project) => {
        setSelectedProject(project);
    };

    const handleBack = () => {
        setSelectedProject(null);
    };

    return (
        <div className={`all-projects-container ${selectedProject ? 'details-view' : ''}`} ref={containerRef}>
            <div className="scene" ref={sceneRef}>
                <div id="drag-container" ref={dragRef}>
                    <div id="spin-container" ref={spinRef}>
                        {projects.map((project, index) => (
                            <img
                                key={index}
                                src={project.image}
                                alt={project.title}
                                onClick={() => handleProjectClick(project)}
                            />
                        ))}
                    </div>
                    <div id="ground"></div>
                </div>
            </div>
            <div ref={detailsRef} className="project-details-container">
                 <ProjectDetails project={selectedProject} handleBack={handleBack} />
            </div>
        </div>
    );
};

export default AllProjects;