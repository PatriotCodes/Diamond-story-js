import GEM_TYPES from '../constants/gemTypes';

export const exampleTemplate = [
  [0, 0, '1g', 0, 0, 0, 0, 0],
  ['1g', '1g', '1b', '1g', 0, 0, 0, 0],
  [1, '1b', 1, 1, 1, 1, 1, 1],
  [1, '1b', 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, '1b', 0, 0, 1, 1, 1],
  ['1b', '1b', '1g', '1b', '1b', 0, 1, 1],
];

const PRE_DEF_NUM = {
  0: {
    hasGem: false,
  },
  1: {
    hasGem: true,
  },
  '1g': {
    hasGem: true,
    gemType: GEM_TYPES.GREEN,
  },
  '1b': {
    hasGem: true,
    gemType: GEM_TYPES.BLUE,
  },
  '1p': {
    hasGem: true,
    gemType: GEM_TYPES.PURPLE,
  },
  '1r': {
    hasGem: true,
    gemType: GEM_TYPES.RED,
  },
  '1y': {
    hasGem: true,
    gemType: GEM_TYPES.YELLOW,
  },
  '1s': {
    hasGem: true,
    gemType: GEM_TYPES.SUPER,
  },
};

export default gridTemplate => ({
  gridTemplate: exampleTemplate.map(row => row.map(item => PRE_DEF_NUM[item])),
});
