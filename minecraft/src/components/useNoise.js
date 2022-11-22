import { noise } from './perlin';

noise.seed(Math.random());

export function getHeightValue(x, z) {
    return 2+Math.floor(16 * Math.abs(noise.perlin2(x/50, z/50)));
}