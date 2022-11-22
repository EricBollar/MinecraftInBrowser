import create from 'zustand'
import { nanoid } from 'nanoid'
import { getHeightValue } from '../components/useNoise';

function CreateTerrain (size) {
    let terrain = [];

    for (let x = -size/2; x < size/2; x++) {
        for (let z = -size/2; z < size/2; z++) {
            terrain.push({
                key: nanoid(),
                pos: [x, getHeightValue(x, z), z],
                texture: "grass"
            });

            if (Math.floor(Math.random() * 50) === 0) {
                terrain.push({
                    key: nanoid(),
                    pos: [x, getHeightValue(x, z)+1, z],
                    texture: "log"
                },
                {
                    key: nanoid(),
                    pos: [x, getHeightValue(x, z)+2, z],
                    texture: "log"
                },
                {
                    key: nanoid(),
                    pos: [x, getHeightValue(x, z)+3, z],
                    texture: "log"
                });
            }
        }
    }

    return terrain;
}

export const useStore = create((set) => ({
    texture: 'dirt',
    cubes: CreateTerrain(16),
    addCube: (x, y, z) => {
        set((prev) => ({
            cubes: [
                ...prev.cubes,
                {
                    key: nanoid(),
                    pos: [x, y, z],
                    texture: prev.texture
                }
            ]
        }))
    },
    removeCube: (x, y, z) => {
        set((prev) => ({
            cubes: prev.cubes.filter(cube => {
                const [X, Y, Z] = cube.pos;
                return x !== X || y !== Y || z !== Z;
            })
        }))
    },
    setTexture: (texture) => {
        set(() => ({
            texture
        }))
    },
    saveWorld: () => {},
    resetWorld: () => {}
}))