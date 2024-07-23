'use client'

import CoolButton from '@/components/CoolButton'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Suspense, useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'

useGLTF.preload('/Radio.glb')
const Tape = dynamic(() => import('@/components/canvas/Radio').then((mod) => mod.Tape), { ssr: false })
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-screen w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 size-12 animate-spin text-white' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
      <p className='mt-6 text-3xl'>Rolling 3 2 1...</p>
    </div>
  ),
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })
export default function Page() {
  const [width, setWidth] = useState(700)
  const [start, setStart] = useState(false)
  const scalingFactor = Math.max(width / 40, 25)

  // console.log('scale', scalingFactor, width)
  useEffect(() => {
    setWidth(window.innerWidth)
  }, [])
  return (
    <>
      <div className='mx-auto flex w-full flex-col flex-wrap items-center'>
        {/* jumbo */}
        <div className='absolute top-0  mb-8 flex w-full flex-col items-start justify-center p-12 text-center'>
          <h1 className='w-full  text-5xl font-bold leading-tight'>Interact with the Radio</h1>
          {/* <p className='w-full text-2xl leading-normal'>An imersive visual and sound UX experiment!</p> */}
        </div>

        {start ? (
          <div className='w-full text-center'>
            <View className='flex h-screen w-full flex-col items-center justify-center'>
              {/* <Suspense fallback={null}> */}
              <Tape
                route='/blob'
                // desktop 1 and mobile 2
                // scale={width > 650 ? 3.4 : 1.55}
                // position={width > 650 ? [0, 0, 0] : [0, 2, 1]}
                scale={scalingFactor}
                position={[0, -1.75, -1.5]}
                responsive={width}
              />
              <Common />
              {/* </Suspense> */}
            </View>
          </div>
        ) : (
          <div className='flex h-screen items-center'>
            {' '}
            <CoolButton setStart={setStart} />
          </div>
        )}
      </div>
      <div className='absolute bottom-0 mb-8 flex w-full flex-col items-start justify-center text-center'>
        <h1 className='w-full  text-4xl font-bold leading-tight'>Know More</h1>
        <p className='w-full text-2xl leading-normal'>
          Visit us @{' '}
          <Link target='blank' href='https://webibee.com/' className='text-blue-200'>
            webibee.com
          </Link>
        </p>
      </div>
    </>
  )
}
