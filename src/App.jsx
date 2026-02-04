import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from "./components/NavBar.jsx";
import HomePage from "./sections/HomePage.jsx";
import AllProjects from "./sections/AllProjects.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
    return (
        <>
            <Suspense fallback={null}>
                <main className="max-w-7xl mx-auto">
                    <NavBar/>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/all-projects" element={<AllProjects />} />
                    </Routes>
                    <Footer />
                </main>
            </Suspense>
            <LoadingScreen />
        </>
    )
}
export default App
