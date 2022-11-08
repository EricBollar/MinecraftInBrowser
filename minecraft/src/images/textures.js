import { TextureLoader } from 'three'

import {
    dirtImg,
    logImg,
    grassImg,
    glassImg,
    woodImg
} from './images'

const dirtTexture = new TextureLoader(dirtImg);
const logTexture = new TextureLoader(logImg);
const grassTexture = new TextureLoader(grassImg);
const glassTexture = new TextureLoader(glassImg);
const woodTexture = new TextureLoader(woodImg);

export {
    dirtTexture,
    logTexture,
    grassTexture,
    glassTexture,
    woodTexture
}