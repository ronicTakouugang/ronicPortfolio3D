import React from 'react'
import Hero from "./sections/Hero.jsx";
import AnimatedCounter from "./components/AnimatedCounter.jsx";
import ShowcaseSection from "./sections/ShowcaseSection.jsx";
import NavBar from "./components/NavBar.jsx";
import LogoSection from "./sections/LogoSection.jsx";
import FeatureCards from "./sections/FeatureCards.jsx";

const App = () => {
    return (
        <main className="max-w-7xl mx-auto">
            <NavBar/>
            <Hero/>
            <AnimatedCounter/>
            <ShowcaseSection/>
            <LogoSection/>
            <FeatureCards/>
        </main>
    )
}
export default App
