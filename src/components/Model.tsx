// src/components/Model.tsx
import { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import type { Group, Object3DEventMap } from 'three';

// Define the type for the GLTF model's data
type GLTFWithAnimations = ReturnType<typeof useGLTF> & {
  animations: THREE.AnimationClip[];
};

export function Model({ url, ...props }: { url: string; scale?: number | [number, number, number] }) {
  const group = useRef<Group | null>(null);

  const { scene, animations } = useGLTF(url) as GLTFWithAnimations;
  
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const animationName = Object.keys(actions)[0];
      actions[animationName]?.play();
    }
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/jellyfish.glb');