import React from 'react'
import Hero from "./Hero.jsx";
import AnimatedCounter from "../components/AnimatedCounter.jsx";
import ShowcaseSection from "./ShowcaseSection.jsx";
import FeatureCards from "./FeatureCards.jsx";
import ExperienceSection from "./ExperienceSection.jsx";
import TechStack from "./TechStack.jsx";
import Contact from "./Contact.jsx";

const HomePage = () => {
    return (
        <>
            <Hero/>
            <AnimatedCounter/>
            <ShowcaseSection/>
            <FeatureCards/>
            <ExperienceSection/>
            <TechStack/>
            <Contact/>
        </>
    )
}

export default HomePage;