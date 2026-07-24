import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from "./components/NavBar.jsx";
import HomePage from "./sections/HomePage.jsx";
import NotFound from "./sections/NotFound.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { useSmoothScroll } from "./hooks/useSmoothScroll.js";

// Only needed behind the "See more" click, so keep it out of the initial bundle.
const AllProjects = lazy(() => import("./sections/AllProjects.jsx"));

const App = () => {
    useSmoothScroll();

    return (
        <>
            <Suspense fallback={null}>
                <main className="max-w-7xl mx-auto">
                    <NavBar/>
                    <div id="main-content" tabIndex={-1}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/all-projects" element={<AllProjects />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                    <Footer />
                </main>
            </Suspense>
            <ScrollToTop />
            <LoadingScreen />
        </>
    )
}
export default App
