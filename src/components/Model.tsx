// src/components/Model.tsx
import { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Model(props: any) {
  const group = useRef()
  const { scene, animations } = useGLTF('/errorModel.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    // Get the name of the first animation
    const animationName = Object.keys(actions)[0]

    // Play it if the name exists
    if (animationName) {
      actions[animationName].play()
    }
  }, [actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/errorModel.glb')