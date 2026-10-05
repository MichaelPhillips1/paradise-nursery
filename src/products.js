import snakePlant from './assets/plants/snake-plant.svg';
import zzPlant from './assets/plants/zz-plant.svg';
import pothos from './assets/plants/pothos.svg';
import spiderPlant from './assets/plants/spider-plant.svg';
import jadePlant from './assets/plants/jade-plant.svg';
import aloeVera from './assets/plants/aloe-vera.svg';
import monstera from './assets/plants/monstera.svg';
import fiddleLeafFig from './assets/plants/fiddle-leaf-fig.svg';
import rubberPlant from './assets/plants/rubber-plant.svg';
import birdOfParadise from './assets/plants/bird-of-paradise.svg';
import parlorPalm from './assets/plants/parlor-palm.svg';
import calathea from './assets/plants/calathea.svg';
import peaceLily from './assets/plants/peace-lily.svg';
import orchid from './assets/plants/orchid.svg';
import anthurium from './assets/plants/anthurium.svg';
import africanViolet from './assets/plants/african-violet.svg';
import kalanchoe from './assets/plants/kalanchoe.svg';
import begonia from './assets/plants/begonia.svg';

// Three categories, each containing six different houseplants.
export const categories = [
  {
    id: 'easy-care',
    name: 'Easy-care Classics',
    description: 'An easy place to start your plant collection.',
    plants: [
      { id: 'snake-plant', name: 'Snake Plant', price: 20, image: snakePlant, tag: 'EASY CARE', description: 'Upright, patterned leaves with a sculptural shape. Let the soil dry between waterings.' },
      { id: 'zz-plant', name: 'ZZ Plant', price: 24, image: zzPlant, tag: 'EASY CARE', description: 'Glossy green leaves on graceful stems. A forgiving choice for indoor corners.' },
      { id: 'pothos', name: 'Golden Pothos', price: 16, image: pothos, tag: 'TRAILING', description: 'Heart-shaped leaves and trailing vines that look right at home on a shelf.' },
      { id: 'spider-plant', name: 'Spider Plant', price: 18, image: spiderPlant, tag: 'ARCHING LEAVES', description: 'A fountain of slender striped leaves. Enjoys bright, indirect light.' },
      { id: 'jade-plant', name: 'Jade Plant', price: 22, image: jadePlant, tag: 'SUCCULENT', description: 'Thick, rounded leaves and branching stems. Give it a bright spot and light watering.' },
      { id: 'aloe-vera', name: 'Aloe Vera', price: 17, image: aloeVera, tag: 'SUCCULENT', description: 'A compact rosette of fleshy leaves. Suited to a sunny window and well-drained soil.' },
    ],
  },
  {
    id: 'statement-foliage',
    name: 'Statement Foliage',
    description: 'Distinctive leaves for a space of their own.',
    plants: [
      { id: 'monstera', name: 'Monstera', price: 35, image: monstera, tag: 'LARGE LEAVES', description: 'Broad green leaves develop natural splits as they mature. A classic indoor statement.' },
      { id: 'fiddle-leaf-fig', name: 'Fiddle-leaf Fig', price: 45, image: fiddleLeafFig, tag: 'UPRIGHT', description: 'Large, violin-shaped leaves on an upright stem. Prefers consistent, bright light.' },
      { id: 'rubber-plant', name: 'Rubber Plant', price: 32, image: rubberPlant, tag: 'GLOSSY FOLIAGE', description: 'Rich green, leathery leaves give this plant a bold silhouette.' },
      { id: 'bird-of-paradise', name: 'Bird of Paradise', price: 48, image: birdOfParadise, tag: 'TROPICAL', description: 'Tall stems and broad, paddle-shaped leaves bring a tropical look indoors.' },
      { id: 'parlor-palm', name: 'Parlor Palm', price: 28, image: parlorPalm, tag: 'FEATHERY FRONDS', description: 'Soft, arching fronds add texture to a room. Likes gentle, indirect light.' },
      { id: 'calathea', name: 'Calathea', price: 30, image: calathea, tag: 'PATTERNED LEAVES', description: 'Decorative leaf patterns and rich color. Prefers humidity and indirect light.' },
    ],
  },
  {
    id: 'flowering-favorites',
    name: 'Flowering Favorites',
    description: 'A little color among the green.',
    plants: [
      { id: 'peace-lily', name: 'Peace Lily', price: 26, image: peaceLily, tag: 'WHITE BLOOMS', description: 'Deep green foliage with graceful white spathes. Keep in filtered light.' },
      { id: 'orchid', name: 'Moth Orchid', price: 38, image: orchid, tag: 'DELICATE BLOOMS', description: 'Elegant flowers on arching stems. A bright spot away from direct sun is ideal.' },
      { id: 'anthurium', name: 'Anthurium', price: 29, image: anthurium, tag: 'COLORFUL SPATHES', description: 'Heart-shaped leaves and colorful, waxy spathes make a distinctive display.' },
      { id: 'african-violet', name: 'African Violet', price: 15, image: africanViolet, tag: 'COMPACT', description: 'Velvety leaves and clusters of violet flowers, sized for a small windowsill.' },
      { id: 'kalanchoe', name: 'Kalanchoe', price: 19, image: kalanchoe, tag: 'FLOWERING SUCCULENT', description: 'Fleshy green leaves with cheerful clusters of small, colorful flowers.' },
      { id: 'begonia', name: 'Flowering Begonia', price: 23, image: begonia, tag: 'SOFT COLOR', description: 'Textured foliage and soft-colored blooms. Enjoys bright, indirect light.' },
    ],
  },
];

export const products = categories.flatMap((category) => category.plants);
