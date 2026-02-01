import React from 'react'
import Hero from "./sections/Hero.jsx";
import AnimatedCounter from "./components/AnimatedCounter.jsx";
import ShowcaseSection from "./sections/ShowcaseSection.jsx";

const App = () => {
    return (
        <main className="max-w-7xl mx-auto">
            <Hero/>
            <AnimatedCounter/>
            <ShowcaseSection/>
        </main>
    )
}
export default App
