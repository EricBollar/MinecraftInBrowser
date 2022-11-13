import { usePlane } from '@react-three/cannon'
import { groundTexture } from '../images/textures'
import { useStore } from '../hooks/useStore'

export const Ground = () => {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI/2, 0, 0], position: [0, -0.5, 0]
    }))
    const [addCube, removeCube] = useStore((state) => [state.addCube, state.removeCube])

    return (
        <mesh 
            ref={ref}
            onClick={(e) => {
                e.stopPropagation()
                const [x, y, z] = Object.values(e.point)

                switch (e.button) {
                    // left click
                    case 0:
                        removeCube(x, y, z);
                        return;
                    // right click
                    case 2:
                        addCube(Math.round(x), Math.round(y), Math.round(z));
                        return;
                    default: return;
                }
            }}
        >
            <planeBufferGeometry attach='geometry' args={[100, 100]} />
            <meshStandardMaterial attach='material' map={groundTexture} />
        </mesh>
    )
}