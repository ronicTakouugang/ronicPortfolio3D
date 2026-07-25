import React from 'react'

class SceneErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error) {
        console.error('3D scene failed to render:', error)
    }

    render() {
        return this.state.hasError ? this.props.fallback : this.props.children
    }
}

export default SceneErrorBoundary
