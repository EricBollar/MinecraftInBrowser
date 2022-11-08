import { Canvas } from '@react-three/fiber'
import { Sky } from '@react-three/drei'
import './App.css';

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas>
        <Sky sunPosition={[100, 100, 20]}/>
        <ambientLight intensity={0.5}/>
      </Canvas>
    </div>
  );
}

export default App;
