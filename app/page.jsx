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
  const [start, setStart] = useState(false)
  const [loading, setLoading] = useState(true)

  const scalingFactor = Math.max(width / 40, 18)

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
        {start && loading && (
          <div className=' absolute top-1/3 flex  items-center justify-center '>
            <Image width={350} height={350} src={'/img/loading.webp'} alt='loading' loading={'eager'} preload />
          </div>
        )}
        {start ? (
          <div className='w-full text-center'>
            <View className='flex h-screen w-full flex-col items-center justify-center'>
              <Tape
                route='/blob'
                scale={scalingFactor}
                position={[0, -1.75, -1.5]}
                responsive={width}
                onUpdate={() => setLoading(false)}
              />
              <Common />
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
