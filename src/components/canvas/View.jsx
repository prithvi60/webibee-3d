'use client'

import { forwardRef, Suspense, useImperativeHandle, useRef } from 'react'
import { OrbitControls, PerspectiveCamera, AxesHelper, View as ViewImpl } from '@react-three/drei'
import { Three } from '@/helpers/components/Three'

export const Common = ({ color }) => (
  <Suspense fallback={null}>
    {color && <color attach='background' args={[color]} />}
    <ambientLight />
    <pointLight position={[20, 30, 10]} intensity={3} decay={0.2} />
    {/* <pointLight position={[-10, -10, -10]} color='blue' decay={0.2} /> */}
    {/* <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} rotation={[-Math.PI / 2, 0, 0]} /> */}
    <PerspectiveCamera
      makeDefault
      fov={40}
      position={[0, 6, 6]}
      rotation={[-Math.PI / 3.9, 0, 0]}
      near={0.1}
      far={1000}
    />
    {/* <AxesHelper args={[5]} /> */}
  </Suspense>
)

const View = forwardRef(({ children, orbit, ...props }, ref) => {
  const localRef = useRef(null)
  useImperativeHandle(ref, () => localRef.current)

  return (
    <>
      <div ref={localRef} {...props} />
      <Three>
        <ViewImpl track={localRef}>
          {children}
          {/* {orbit && */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={0.25}
          />
          {/* } */}
        </ViewImpl>
      </Three>
    </>
  )
})
View.displayName = 'View'

export { View }
