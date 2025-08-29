// src/App.tsx

import { Suspense, useEffect } from 'react' // Import useEffect
// The package name is '@react-three/fiber'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Bounds } from '@react-three/drei'
// Correcting the import path to point to the 'components' subdirectory
import { Model } from './components/Model'
// Correcting the import path to be a direct relative path
import './App.css'

export default function App() {
  // This side effect modifies the body's style to prevent page-level scrolling.
  // It's a reliable way to ensure no scrollbars appear from default browser styles.
  useEffect(() => {
    // When the component mounts, hide any overflow on the body
    document.body.style.overflow = 'hidden';

    // When the component unmounts, reset the body's overflow style
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []); // The empty array ensures this effect runs only once

  return (
    // We set overflow to hidden to contain everything within this div
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* This div will hold the background text */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: -100,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // Change fontSize to use 'vw' units, making it responsive to screen width
          fontSize: '10vw',
          fontWeight: 'bold',
          color: 'rgba(94, 5, 5, 1)',
          pointerEvents: 'none', // Make sure text doesn't interfere with mouse controls
          // Add whiteSpace to prevent the text from wrapping to a new line
          whiteSpace: 'nowrap',
        }}
      >
        Rajat Prakash Dhal
      </div>
      <Canvas
        style={{ width: '100vw', height: '100vh' }}
        // We make the canvas transparent so the text behind it is visible
        gl={{ alpha: true }}
        // We remove the camera position to let Bounds control it
        camera={{ fov: 25 }}
      >
        <Suspense fallback={null}>
          {/* Wrap your model in the Bounds component */}
          {/* It will automatically center and fit the model to the screen */}
          <Bounds fit clip margin={1.2}>
            {/* Remove manual scale and position; Bounds handles it */}
            <Model />
          </Bounds>

          {/* This adds a nice lighting environment */}
          <Environment preset="sunset" />
        </Suspense>

        {/* Add `enablePan={false}` to disable left-right movement */}
        <OrbitControls makeDefault enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}

