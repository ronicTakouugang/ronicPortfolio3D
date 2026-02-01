import React from 'react'
import Hero from "./sections/Hero.jsx";
import AnimatedCounter from "./components/AnimatedCounter.jsx";

const App = () => {
    return (
        <main className="max-w-7xl mx-auto">
            <Hero/>
            <AnimatedCounter/>
        </main>
    )
}
export default App
