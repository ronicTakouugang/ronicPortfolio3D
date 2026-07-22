import React from 'react'
import Hero from "./Hero.jsx";
import ShowcaseSection from "./ShowcaseSection.jsx";
import FeatureCards from "./FeatureCards.jsx";
import ExperienceSection from "./ExperienceSection.jsx";
import TechStack from "./TechStack.jsx";
import Contact from "./Contact.jsx";

const HomePage = () => {
    return (
        <>
            <Hero/>
            <ShowcaseSection/>
            <FeatureCards/>
            <ExperienceSection/>
            <TechStack/>
            <Contact/>
        </>
    )
}

export default HomePage;