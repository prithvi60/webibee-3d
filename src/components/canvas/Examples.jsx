'use client'

import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef, useState, useEffect } from 'react'
import { Line, useCursor, MeshDistortMaterial } from '@react-three/drei'
import { useRouter } from 'next/navigation'

export const Blob = ({ route = '/', ...props }) => {
  const router = useRouter()
  const [hovered, hover] = useState(false)
  useCursor(hovered)
  return (
    <mesh
      onClick={() => router.push(route)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      {...props}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial roughness={0.5} color={hovered ? 'hotpink' : '#1fb2f5'} />
    </mesh>
  )
}

export const Logo = ({ route = '/blob', ...props }) => {
  const mesh = useRef(null)
  const router = useRouter()

  const [hovered, hover] = useState(false)
  const points = useMemo(() => new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(100), [])

  useCursor(hovered)
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    mesh.current.rotation.y = Math.sin(t) * (Math.PI / 8)
    mesh.current.rotation.x = Math.cos(t) * (Math.PI / 8)
    mesh.current.rotation.z -= delta / 4
  })

  return (
    <group ref={mesh} {...props}>
      {/* @ts-ignore */}
      <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} />
      {/* @ts-ignore */}
      <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} rotation={[0, 0, 1]} />
      {/* @ts-ignore */}
      <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} rotation={[0, 0, -1]} />
      <mesh onClick={() => router.push(route)} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
        <sphereGeometry args={[0.55, 64, 64]} />
        <meshPhysicalMaterial roughness={0.5} color={hovered ? 'hotpink' : '#1fb2f5'} />
      </mesh>
    </group>
  )
}

export function Tape(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/TAPE.glb')
  const { actions } = useAnimations(animations, group)

  // const scalingFactor = Math.min(Math.max(props.responsive / 1300, 0.5), 1.2)
  // console.log(scalingFactor)

  // useEffect(() => {
  //   if (actions) {
  //     actions['your_animation_name'].play(); // Replace 'your_animation_name' with the actual name of your animation
  //   }
  // }, [actions]);

  useEffect(() => {
    // console.log(actions); // Log the actions object to find animation names
    if (actions) {
      const animationNames = Object.keys(actions)
      console.log('Animations List', animationNames) // Log the actions object to find animation names

      if (animationNames.length > 0) {
        // actions[animationNames[0]].play() // Play the first available animation

        animationNames.forEach((animationName) => {
          const action = actions[animationName]

          action.setLoop(THREE.LoopOnce) // Set the animation to play once
          action.clampWhenFinished = true // Stop the animation at the last frame
          // action[animationName].play() // Play each available animation
          action.play()
        })
      }
    }
  }, [actions])
  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Scene'>
        <mesh
          name='Cassette'
          castShadow
          receiveShadow
          geometry={nodes.Cassette.geometry}
          material={materials['cass1:CassetteTape_01a2']}
          position={[-0.025, 0.056, 0.01]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name='tape'
          castShadow
          receiveShadow
          geometry={nodes.tape.geometry}
          material={materials.standardSurface2}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name='right_roll'
          castShadow
          receiveShadow
          geometry={nodes.right_roll.geometry}
          material={materials['cass1:CassetteTape_01a2']}
          position={[-0.005, 0.056, -0.003]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name='left_roll'
          castShadow
          receiveShadow
          geometry={nodes.left_roll.geometry}
          material={materials['cass1:CassetteTape_01a2']}
          position={[-0.045, 0.056, -0.003]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name='ff'
          castShadow
          receiveShadow
          geometry={nodes.ff.geometry}
          material={materials.standardSurface2}
          position={[-0.023, 0.037, 0.057]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name='forward'
          castShadow
          receiveShadow
          geometry={nodes.forward.geometry}
          material={materials.standardSurface2}
          position={[-0.041, 0.037, 0.057]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name='pause'
          castShadow
          receiveShadow
          geometry={nodes.pause.geometry}
          material={materials.standardSurface2}
          position={[0.012, 0.038, 0.058]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name='record'
          castShadow
          receiveShadow
          geometry={nodes.record.geometry}
          material={materials.standardSurface2}
          position={[-0.005, 0.037, 0.057]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name='rewind'
          castShadow
          receiveShadow
          geometry={nodes.rewind.geometry}
          material={materials.standardSurface2}
          position={[-0.076, 0.037, 0.057]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name='stop'
          castShadow
          receiveShadow
          geometry={nodes.stop.geometry}
          material={materials.standardSurface2}
          position={[-0.058, 0.037, 0.058]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <group name='cap' position={[-0.037, 0.043, -0.044]} scale={1.491}>
          <mesh
            name='cap1'
            castShadow
            receiveShadow
            geometry={nodes.cap1.geometry}
            material={materials.standardSurface2}
            position={[-0.013, 0.012, 0.003]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.007}
          />
        </group>
      </group>
    </group>
  )
}
