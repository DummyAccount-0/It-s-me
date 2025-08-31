// src/pages/Home.tsx
import { Canvas } from '@react-three/fiber';
import { Model } from '../components/Model';

function Home() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <h1 style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
        Hello from Home Page!
      </h1>

      <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        {/* Ambient lighting to illuminate all sides */}
        <ambientLight intensity={0.5} />
        {/* Directional light for shadows and highlights */}
        <directionalLight position={[2, 5, 2]} intensity={1} />
        
        {/* Use the animated Model component and adjust its scale */}
        <Model url="/jellyfish.glb" scale={0.5} />
      </Canvas>
    </div>
  );
}

export default Home;