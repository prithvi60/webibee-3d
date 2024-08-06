'use client'

import { useGLTF, useAnimations } from '@react-three/drei'
// import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef, useState, useEffect } from 'react'
// import { Line, useCursor, MeshDistortMaterial } from '@react-three/drei'
// import { useRouter } from 'next/navigation'
import useSound from 'use-sound'
// Glossary
// "pCube1Action" Needle 1
// "pCube2Action" Needle 2
//  "tape_2:polySurface670.004Action" fwd button
// "EmptyAction" close the lid
//  'cass1:CassetteTape_Main_low_01_2Action' lower the tape
// "cass1:CassetteTape_Main_low_01_2.002Action" 2nd disk rotate
// "cass1:CassetteTape_Main_low_01_2.001Action" 1st disk rotate
const intialAni = [
  'cass1:CassetteTape_Main_low_01_2Action',
  'EmptyAction',
  'ffAction.001',
  'tape_2:polySurface670.004Action',
  'pauseAction',
  'recordAction',
  'rewindAction',
  'stopAction',
]

export function Tape(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/Radiofin.glb')
  const { actions } = useAnimations(animations, group)
  const [playActive] = useSound('/sfx/btn.mp3')
  const [playRoll] = useSound('/sfx/start.mp3')

  useEffect(() => {
    if (!actions) return

    Object.entries(actions).forEach(([animationName, action]) => {
      if (intialAni.includes(animationName)) {
        action.setLoop(THREE.LoopOnce)
        action.clampWhenFinished = true
      } else if (
        animationName === 'cass1:CassetteTape_Main_low_01_2.001Action' ||
        animationName === 'cass1:CassetteTape_Main_low_01_2.002Action'
      ) {
        action.reset()
        action.time = 1
        action.setLoop(THREE.LoopRepeat, Infinity)
      }
      action.play()
    })
  }, [actions])
  useEffect(() => {
    setTimeout(() => {
      playRoll()
    }, 50)
  }, [playRoll])

  const ButtonAction = (name, time) => {
    // console.log('t', actions[name])
    const action = actions[name]
    action.reset()
    action.setLoop(THREE.LoopOnce)
    action.time = time // Set the start time to 6 seconds
    action.fadeIn(0.2).play()
    playActive()
  }
  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Scene'>
        <mesh
          name='Cassette'
          castShadow
          receiveShadow
          geometry={nodes.Cassette.geometry}
          material={materials['cass1:CassetteTape_01a2']}
          position={[-0.025, 0.037, 0.01]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name='tape'
          castShadow
          receiveShadow
          geometry={nodes.tape.geometry}
          material={materials['standardSurface2.001']}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name='right_roll'
          castShadow
          receiveShadow
          geometry={nodes.right_roll.geometry}
          material={materials['cass1:CassetteTape_01a2']}
          position={[-0.005, 0.037, -0.003]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name='left_roll'
          castShadow
          receiveShadow
          geometry={nodes.left_roll.geometry}
          material={materials['cass1:CassetteTape_01a2']}
          position={[-0.045, 0.037, -0.003]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <group name='Vortex' scale={18.408} />
        <group name='Force' position={[0, 4.904, 1.007]} scale={5.518} />
        <group name='Camera002_AF_Tracker' position={[-1.386, 1.424, -0.126]} />
        <group name='Camera001_AF_Tracker' position={[0.032, 1.378, 6.602]} />
        <mesh
          name='pCube1'
          castShadow
          receiveShadow
          geometry={nodes.pCube1.geometry}
          material={materials.standardSurface1}
          position={[0.037, 0.02, 0.076]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name='pCube2'
          castShadow
          receiveShadow
          geometry={nodes.pCube2.geometry}
          material={materials.standardSurface1}
          position={[0.07, 0.02, 0.076]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name='ff'
          castShadow
          receiveShadow
          geometry={nodes.ff.geometry}
          material={materials['standardSurface2.001']}
          position={[-0.023, 0.037, 0.057]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
          onClick={() => ButtonAction('ffAction.001', 7.1)}
        />
        <mesh
          name='forward'
          castShadow
          receiveShadow
          geometry={nodes.forward.geometry}
          material={materials['standardSurface2.001']}
          position={[-0.041, 0.037, 0.057]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
          onClick={() => ButtonAction('tape_2:polySurface670.004Action', 1.75)}
        />
        <mesh
          name='pause'
          castShadow
          receiveShadow
          geometry={nodes.pause.geometry}
          material={materials['standardSurface2.001']}
          position={[0.012, 0.038, 0.058]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
          onClick={() => ButtonAction('pauseAction', 9)}
        />
        <mesh
          name='record'
          castShadow
          receiveShadow
          geometry={nodes.record.geometry}
          material={materials['standardSurface2.001']}
          position={[-0.005, 0.037, 0.057]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
          onClick={() => ButtonAction('recordAction', 8.2)}
        />
        <mesh
          name='rewind'
          castShadow
          receiveShadow
          geometry={nodes.rewind.geometry}
          material={materials['standardSurface2.001']}
          position={[-0.076, 0.037, 0.057]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
          onClick={() => ButtonAction('rewindAction', 6.25)}
        />
        <mesh
          name='stop'
          castShadow
          receiveShadow
          geometry={nodes.stop.geometry}
          material={materials['standardSurface2.001']}
          position={[-0.058, 0.037, 0.058]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
          onClick={() => ButtonAction('stopAction', 5.1)}
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
