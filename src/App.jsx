import React, { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import NavBar from "./components/NavBar.jsx";
import HomePage from "./sections/HomePage.jsx";
import NotFound from "./sections/NotFound.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import RouteTransition from "./components/RouteTransition.jsx";
import { useSmoothScroll } from "./hooks/useSmoothScroll.js";

// Only needed behind the "See more" click, so keep it out of the initial bundle.
const AllProjects = lazy(() => import("./sections/AllProjects.jsx"));

const App = () => {
    useSmoothScroll();
    const location = useLocation();

    return (
        <>
            <Suspense fallback={null}>
                <main className="max-w-7xl mx-auto">
                    <NavBar/>
                    {/* #main-content itself stays put (it's the skip-link target) — only
                        the RouteTransition inside remounts per-pathname to re-fade. */}
                    <div id="main-content" tabIndex={-1}>
                        <RouteTransition key={location.pathname}>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/all-projects" element={<AllProjects />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </RouteTransition>
                    </div>
                    <Footer />
                </main>
            </Suspense>
            <ScrollToTop />
            <LoadingScreen />
            <CustomCursor />
        </>
    )
}
export default App
