import { useFrame, useThree } from "@react-three/fiber"
import { useSphere } from "@react-three/cannon"
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "../hooks/useKeyboard";

const JUMP_FORCE = 4;
const SPEED = 5;

export const Player = () => {
    const {moveBackward, moveForward, moveLeft, moveRight, jump} = useKeyboard()

    const {camera} = useThree()
    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: "Dynamic",
        position: [0, 1, 0]
    }));

    // handle velocity
    const vel = useRef([0, 0, 0]);
    useEffect(() => {
        api.velocity.subscribe((v) => {vel.current = v})
    }, [api.velocity])

    // handle position
    const pos = useRef([0, 0, 0]);
    useEffect(() => {
        api.position.subscribe((p) => {pos.current = p})
    }, [api.position])

    useFrame(() => {
        camera.position.copy(new Vector3(pos.current[0], pos.current[1], pos.current[2]))

        const dir = new Vector3()
        const front = new Vector3(
            0,
            0,
            (moveBackward ? 1: 0) - (moveForward ? 1 : 0)
        );
        const side = new Vector3(
            (moveLeft ? 1: 0) - (moveRight ? 1 : 0),
            0,
            0
        )
 
        dir
            .subVectors(front, side)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camera.rotation)

        api.velocity.set(dir.x, vel.current[1], dir.z);
        
        if (jump && Math.abs(vel.current[1]) < 0.05) {
            api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2]);
        }
    })

    return (
        <mesh rer={ref}></mesh>
    )
}