'use client'

import CoolButton from '@/components/CoolButton'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Suspense, useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import Image from 'next/image'

useGLTF.preload('/Radio.glb')
const Tape = dynamic(() => import('@/components/canvas/Radio').then((mod) => mod.Tape), {
  ssr: false,
})
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })
export default function Page() {
  const [width, setWidth] = useState(700)
  const [loading, setLoading] = useState(true)

  const calculateScalingFactor = (width) => {
    if (width < 480) {
      // Mobile
      return Math.max(width / 38, 22)
    } else if (width < 768) {
      // Tablet
      return Math.max(width / 36, 14)
    } else {
      // Desktop
      return Math.max(width / 32, 18)
    }
  }
  const calculatePosition = (width) => {
    if (width < 480) {
      // Mobile
      return [0, 0, -1.5]
    } else {
      // Tablet and Desktop
      return [0, 0.2, -1.5]
    }
  }

  const calculateRotation = (width) => {
    if (width < 1024) {
      // Mobile - slight rotation
      return [Math.PI / 2 - 1, Math.PI / 2 - 0.2, Math.PI / 6]
    } else {
      // Tablet and Desktop - vertical with slight tilt
      return [Math.PI / 2 - 0.2, 0, 0]
    }
  }
  const scalingFactor = calculateScalingFactor(width)
  const position = calculatePosition(width)
  const rotation = calculateRotation(width)

  // console.log('scale', scalingFactor, width)
  useEffect(() => {
    setWidth(window.innerWidth)
  }, [])

  return (
    <>
      {loading && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black'>
          <div className='animate-bounce text-2xl text-white'>Webibee...</div>
        </div>
      )}
      <div className='select-none '>
        <div className='mx-auto flex w-full flex-col flex-wrap items-center'>
          {/* jumbo */}
          <div className='absolute top-0  mb-8 flex w-full flex-col items-start justify-center p-12 text-center'>
            <h1 className='z-10  w-full text-5xl font-bold leading-tight'>Interact with the Radio</h1>
            {/* <p className='w-full text-2xl leading-normal'>An imersive visual and sound UX experiment!</p> */}
          </div>
          <div className='w-full text-center'>
            <View className='flex h-screen w-full flex-col items-center justify-center'>
              <Tape
                scale={scalingFactor}
                rotation={rotation}
                position={position}
                responsive={width}
                onUpdate={() => {
                  setLoading(false)
                }}
              />
              <Common />
            </View>
          </div>
        </div>
        <div className='absolute bottom-0 z-10 mb-8 flex w-full flex-col items-start justify-center text-center'>
          <h1 className='w-full  text-4xl font-bold leading-tight'>Know More</h1>
          <p className='w-full text-2xl leading-normal'>
            Visit us @{' '}
            <Link target='blank' href='https://webibee.com/' className='text-blue-200'>
              webibee.com
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
