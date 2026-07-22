import React, { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const BAR_COUNT = 8

function drawDashboard(ctx, width, height, t, bars) {
  ctx.fillStyle = '#0b0f1a'
  ctx.fillRect(0, 0, width, height)

  ctx.strokeStyle = 'rgba(120, 170, 255, 0.15)'
  ctx.lineWidth = 1
  for (let x = 0; x <= width; x += width / 10) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.stroke()
  }
  for (let y = 0; y <= height; y += height / 6) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }

  const chartTop = height * 0.18
  const chartBottom = height * 0.62
  const chartLeft = width * 0.08
  const chartRight = width * 0.5
  const barGap = 14
  const barWidth = (chartRight - chartLeft - barGap * (BAR_COUNT - 1)) / BAR_COUNT

  for (let i = 0; i < BAR_COUNT; i++) {
    const h = bars[i] * (chartBottom - chartTop)
    const x = chartLeft + i * (barWidth + barGap)
    const y = chartBottom - h
    const gradient = ctx.createLinearGradient(0, y, 0, chartBottom)
    gradient.addColorStop(0, '#7dd3fc')
    gradient.addColorStop(1, '#2563eb')
    ctx.fillStyle = gradient
    ctx.fillRect(x, y, barWidth, h)
  }

  ctx.strokeStyle = '#34d399'
  ctx.lineWidth = 3
  ctx.beginPath()
  const lineLeft = width * 0.55
  const lineRight = width * 0.94
  const points = 24
  for (let i = 0; i <= points; i++) {
    const x = lineLeft + (i / points) * (lineRight - lineLeft)
    const y = chartTop + (Math.sin(t * 1.4 + i * 0.6) * 0.5 + 0.5) * (chartBottom - chartTop) * 0.7
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.stroke()

  ctx.fillStyle = '#e2e8f0'
  ctx.font = 'bold 34px sans-serif'
  ctx.fillText('DATA INSIGHTS', width * 0.06, height * 0.12)

  ctx.font = '20px monospace'
  ctx.fillStyle = '#94a3b8'
  ctx.fillText('Revenue', chartLeft, chartBottom + 30)
  ctx.fillText('Trend', lineLeft, chartBottom + 30)

  const kpis = [
    { label: 'Accuracy', value: 97 },
    { label: 'Uptime', value: 99 },
    { label: 'Growth', value: 42 },
  ]
  const kpiTop = height * 0.72
  kpis.forEach((kpi, i) => {
    const x = width * (0.08 + i * 0.3)
    ctx.fillStyle = '#e2e8f0'
    ctx.font = 'bold 28px monospace'
    ctx.fillText(`${kpi.value}%`, x, kpiTop + 30)
    ctx.fillStyle = '#64748b'
    ctx.font = '16px sans-serif'
    ctx.fillText(kpi.label, x, kpiTop + 55)
  })
}

const DashboardScreen = (props) => {
  const meshRef = useRef()
  const barsRef = useRef(null)
  const nextUpdateRef = useRef(0)
  const sceneRef = useRef(null)

  useEffect(() => {
    barsRef.current = Array.from({ length: BAR_COUNT }, () => Math.random() * 0.6 + 0.2)
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 576
    const ctx = canvas.getContext('2d')
    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    sceneRef.current = { canvas, ctx, texture }
    if (meshRef.current) meshRef.current.material.map = texture
  }, [])

  useFrame((state) => {
    if (!sceneRef.current) return
    const { canvas, ctx, texture } = sceneRef.current
    const t = state.clock.elapsedTime
    if (t > nextUpdateRef.current) {
      nextUpdateRef.current = t + 1.4
      barsRef.current = barsRef.current.map((v) => {
        const next = v + (Math.random() - 0.5) * 0.3
        return Math.min(0.9, Math.max(0.15, next))
      })
    }
    drawDashboard(ctx, canvas.width, canvas.height, t, barsRef.current)
    texture.needsUpdate = true
  })

  return (
    <group {...props}>
      <mesh position={[0, 0, -0.02]}>
        <boxGeometry args={[2.05, 1.25, 0.04]} />
        <meshStandardMaterial color="#111827" roughness={0.6} metalness={0.2} />
      </mesh>
      <mesh ref={meshRef}>
        <planeGeometry args={[1.9, 1.07]} />
        <meshBasicMaterial toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.75, -0.05]}>
        <boxGeometry args={[0.12, 0.5, 0.12]} />
        <meshStandardMaterial color="#1f2937" roughness={0.7} />
      </mesh>
    </group>
  )
}

export default DashboardScreen
