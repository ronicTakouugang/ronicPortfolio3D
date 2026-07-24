import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

// Shared look for the three "hero" 3D scenes (Hero, Work, Contact) — a soft glow on
// bright/emissive surfaces (screens, lamps) and a light vignette to frame the shot.
// Deliberately not used on the small per-icon TechStack canvases: there are ~10 of
// those rendered at once, and multiplying a full post-processing pass across all of
// them would cost far more than the tiny icons are worth.
const SceneEffects = ({ bloomIntensity = 0.4, vignetteDarkness = 0.5 }) => {
    return (
        <EffectComposer>
            <Bloom
                luminanceThreshold={0.85}
                luminanceSmoothing={0.2}
                intensity={bloomIntensity}
                mipmapBlur
            />
            <Vignette eskil={false} offset={0.25} darkness={vignetteDarkness} />
        </EffectComposer>
    )
}

export default SceneEffects
