import { useBox } from "@react-three/cannon"
import { useStore } from "../hooks/useStore"
import * as textures from "../images/textures"

export const Cube = ({position, texture}) => {
    const [ref] = useBox(() => ({
        type: "Static",
        position
    }))
    const activeTexture = textures[texture + "Texture"]
    const [addCube, removeCube] = useStore((state) => [state.addCube, state.removeCube])

    return (
        <mesh 
            ref={ref}
            onClick={(e) => {
                e.stopPropagation()
                const {x, y, z} = ref.current.position;

                if (e.button == 2) {
                    removeCube(x, y, z);
                    return;
                }

                const clickedFace = Math.floor(e.faceIndex / 2);

                switch (clickedFace) {
                    case 0: addCube(x + 1, y, z); return;
                    case 1: addCube(x - 1, y, z); return;
                    case 2: addCube(x, y + 1, z); return;
                    case 3: addCube(x, y - 1, z); return;
                    case 4: addCube(x, y, z + 1); return;
                    case 5: addCube(x, y, z - 1); return;
                    default: return;
                }
                addCube(Math.round(x), Math.round(y), Math.round(z));
            }}
        >
            <boxGeometry attach="geometry"/>
            <meshPhongMaterial map={activeTexture} attach="material"/>
        </mesh>
    )
}