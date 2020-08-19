import GEM_TYPES from '../constants/gemTypes';

const COLORS = {
  green: {
    hex: '#d2f080',
    rgb: {
      r: 210,
      g: 240,
      b: 128,
    },
  },
  blue: {
    hex: '#3cc8e1',
    rgb: {
      r: 60,
      g: 200,
      b: 225,
    },
  },
  purple: {
    hex: '#d464ba',
    rgb: {
      r: 212,
      g: 100,
      b: 186,
    },
  },
  red: {
    hex: '#ff780b',
    rgb: {
      r: 255,
      g: 120,
      b: 11,
    },
  },
  yellow: {
    hex: '#ffcc5d',
    rgb: {
      r: 255,
      g: 204,
      b: 93,
    },
  },
  white: {
    hex: '#FFFFFF',
    rgb: {
      r: 255,
      g: 255,
      b: 255,
    },
  },
};

export const pickGemColor = gemType => {
  switch (gemType) {
    case GEM_TYPES.GREEN:
      return Object.values(COLORS.green.rgb).join(', ');
    case GEM_TYPES.BLUE:
      return Object.values(COLORS.blue.rgb).join(', ');
    case GEM_TYPES.PURPLE:
      return Object.values(COLORS.purple.rgb).join(', ');
    case GEM_TYPES.RED:
      return Object.values(COLORS.red.rgb).join(', ');
    case GEM_TYPES.YELLOW:
      return Object.values(COLORS.yellow.rgb).join(', ');
    case GEM_TYPES.SUPER:
      return Object.values(COLORS.white.rgb).join(', ');
    default:
      return '';
  }
};

export default COLORS;
