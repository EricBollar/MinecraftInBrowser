import { Canvas } from '@react-three/fiber'
import { Sky } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
// import { Ground } from "./components/Ground"
import { Player } from "./components/Player"
import { FPV } from "./components/FPV"
import { Cubes } from "./components/Cubes"
import { TextureSelector } from './components/TextureSelector'
import Stats from 'three/examples/jsm/libs/stats.module'
import './App.css';

function App() {
  // Three.js Stats Panel
  const stats = new Stats();
  document.body.appendChild(stats.dom);
  function animate() {
    requestAnimationFrame(animate);
    stats.update();
  }
  animate();

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas>
        <Sky sunPosition={[100, 100, 20]}/>
        <ambientLight intensity={0.5}/>
        <FPV />
        <Physics>
          <Player />
          <Cubes />
          {/* <Ground /> */}
        </Physics>
      </Canvas>
      <div className="cursor">+</div>
      <TextureSelector />
    </div>
  );
}

export default App;
