// src/pages/Work.tsx
import { useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Link } from 'react-router-dom';

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// A component to load and render the desk model
function DeskModel() {
  const { scene } = useGLTF('/complete_desk.glb');
  
  return (
    <primitive 
      object={scene} 
      scale={2} 
      rotation={[0, Math.PI / 2, 0]} 
      position={[0, -5, 0]} 
    />
  );
}

// A component to manage the GSAP animation
function SceneWithScrollAnimation() {
  const { camera } = useThree();
  const scrollContainer = useRef(null);

  useEffect(() => {
    const container = document.querySelector('.scroll-container');
    
    // Animate the camera's position and FOV on scroll.
    gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    })
    .to(camera.position, {
      // New target coordinates to zoom in on the PC screen
      x: 0,
      y: 1.5, // Move up to desk level
      z: 3,    // Move closer to the screen
    }, 0)
    .to(camera, {
      fov: 80, // A narrower FOV for a tighter zoom on the screen
      onUpdate: () => {
        camera.updateProjectionMatrix();
      },
    }, 0);
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [camera]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} />
      
      {/* The Desk Model */}
      <DeskModel />
    </>
  );
}

function Work() {
  // Ref for the title element to be animated
  const titleRef = useRef(null);
  
  useEffect(() => {
    gsap.to(titleRef.current, {
      scale: 0.5, // Scale down to 50%
      opacity: 0, // Fade out
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "20% top", // End the animation when you've scrolled 20% down
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="scroll-container" style={{ position: 'relative', width: '100%', height: '150vh', overflowY: 'scroll' }}>
      {/* Navigation bar overlay */}
      <nav style={{ position: 'fixed', top: 0, left: 0, width: '100%', display: 'flex', justifyContent: 'center', gap: '20px', padding: '10px', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 10 }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/work" style={{ color: 'white', textDecoration: 'none' }}>Work</Link>
        <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</Link>
      </nav>

      {/* Title overlay with ref for animation */}
      <h1 ref={titleRef} style={{ position: 'fixed', top: '50px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.5)', fontSize: '3rem' }}>
        W O R K S P A C E
        <p  ref={titleRef} style={{ position: 'fixed', top: '50px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, color: 'black', textShadow: '2px 2px 4px rgba(0,0,0,0.5)', fontSize: '1rem' }}>
            Scroll to Find Work</p>
      </h1>
      
      <Canvas 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%',
          backgroundColor: 'lightpink'
        }}
        camera={{ fov: 60, position: [0, 0, 10] }}
      >
        <SceneWithScrollAnimation />
      </Canvas>
    </div>
  );
}

export default Work;