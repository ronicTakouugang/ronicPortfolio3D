import React, { useEffect, useMemo, useRef } from 'react'
import { useGraph, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import * as THREE from 'three'

const THINK_POSE = {
  UpperArmR: new THREE.Euler(0.1, 0, 0.55),
  LowerArmR: new THREE.Euler(1.7, 0, 0),
  WristR: new THREE.Euler(0, 1.57, 0),
}

export function BusinessMan(props) {
  const group = useRef()
  const hairRef = useRef()
  const { scene, animations } = useGLTF('/models/business_man.glb')
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    materials.Skin.color.set('#6b4226')
    materials.Hair.color.set('#0a0704')
  }, [materials])

  useEffect(() => {
    const action = actions['CharacterArmature|Idle_Neutral']
    action?.reset().fadeIn(0.3).play()
    return () => action?.fadeOut(0.3)
  }, [actions])

  // Override the right-arm bones after the idle clip updates them, to hold a "thinking" (hand-on-chin) pose
  useFrame(() => {
    for (const boneName in THINK_POSE) {
      const bone = nodes[boneName]
      if (bone) bone.rotation.copy(THINK_POSE[boneName])
    }
  })

  useEffect(() => {
    const head = nodes.Head
    const hair = hairRef.current
    if (head && hair) {
      head.add(hair)
      return () => head.remove(hair)
    }
  }, [nodes])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Root_Scene">
        <group name="RootNode">
          <group name="CharacterArmature" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <primitive object={nodes.Root} />
          </group>
          <skinnedMesh name="Suit_Legs" geometry={nodes.Suit_Legs.geometry} material={materials.Suit} skeleton={nodes.Suit_Legs.skeleton} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <skinnedMesh name="Suit_Feet" geometry={nodes.Suit_Feet.geometry} material={materials.Black} skeleton={nodes.Suit_Feet.skeleton} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <group name="Suit_Body" position={[0, 0.007, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh name="Suit_Body_1" geometry={nodes.Suit_Body_1.geometry} material={materials.Suit} skeleton={nodes.Suit_Body_1.skeleton} />
            <skinnedMesh name="Suit_Body_2" geometry={nodes.Suit_Body_2.geometry} material={materials.White} skeleton={nodes.Suit_Body_2.skeleton} />
            <skinnedMesh name="Suit_Body_3" geometry={nodes.Suit_Body_3.geometry} material={materials.Tie} skeleton={nodes.Suit_Body_3.skeleton} />
            <skinnedMesh name="Suit_Body_4" geometry={nodes.Suit_Body_4.geometry} material={materials.Skin} skeleton={nodes.Suit_Body_4.skeleton} />
          </group>
          <group name="Suit_Head" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh name="Suit_Head_1" geometry={nodes.Suit_Head_1.geometry} material={materials.Skin} skeleton={nodes.Suit_Head_1.skeleton} />
            <skinnedMesh name="Suit_Head_3" geometry={nodes.Suit_Head_3.geometry} material={materials.Eyebrows} skeleton={nodes.Suit_Head_3.skeleton} />
            <skinnedMesh name="Suit_Head_4" geometry={nodes.Suit_Head_4.geometry} material={materials.Eye} skeleton={nodes.Suit_Head_4.skeleton} />
          </group>
          {/* Procedural taper-fade haircut, replacing the model's default straight-hair mesh (Suit_Head_2): a low, flattened dome hugging the scalp instead of a full round volume, attached to the Head bone so it follows animations */}
          <mesh ref={hairRef} position={[0, 0.0016, -0.00015]} scale={[1, 0.62, 1]}>
            <icosahedronGeometry args={[0.00135, 1]} />
            <meshStandardMaterial color="#0a0704" roughness={0.95} flatShading />
          </mesh>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/business_man.glb')
