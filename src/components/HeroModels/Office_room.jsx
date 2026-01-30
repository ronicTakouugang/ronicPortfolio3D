import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Room(props) {
  const { nodes, materials } = useGLTF('/models/office_room.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Object_2.geometry} material={materials.lambert2SG} />
        <mesh geometry={nodes.Object_3.geometry} material={materials.lambert2SG} />
        <mesh geometry={nodes.Object_4.geometry} material={materials.lambert2SG} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/office_room.glb')
