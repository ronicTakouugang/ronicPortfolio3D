import { FaCube } from 'react-icons/fa'
import SceneErrorBoundary from './SceneErrorBoundary.jsx'
import { isWebGLAvailable } from '../utils/webglSupport.js'

const DefaultFallback = () => (
    <div className="w-full h-full flex-center flex-col gap-2 text-white-50">
        <FaCube className="text-3xl opacity-40" />
        <p className="text-xs text-center px-4">3D preview unavailable</p>
    </div>
)

// Wraps a <Canvas> so an unsupported browser (checked up front, before Three.js
// ever touches the GPU) or a runtime failure (e.g. a GLTF that fails to fetch)
// shows a graceful placeholder instead of a blank/crashed page.
const Scene3D = ({ children, fallback }) => {
    const resolvedFallback = fallback ?? <DefaultFallback />

    if (!isWebGLAvailable()) return resolvedFallback

    return <SceneErrorBoundary fallback={resolvedFallback}>{children}</SceneErrorBoundary>
}

export default Scene3D
