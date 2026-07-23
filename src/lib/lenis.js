let lenisInstance = null

// Lets components outside the App-level hook (e.g. Button's "See my Work!" CTA)
// drive the same Lenis instance instead of fighting it with a raw window.scrollTo.
export const setLenis = (instance) => {
    lenisInstance = instance
}

export const getLenis = () => lenisInstance
