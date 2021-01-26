import greenGemImage from '../assets/green_gem.png';
import blueGemImage from '../assets/blue_gem.png';
import purpleGemImage from '../assets/purple_gem.png';
import redGemImage from '../assets/red_gem.png';
import yellowGemImage from '../assets/yellow_gem.png';
import superGemImage from '../assets/super_gem.png';

const GEM_TYPES = {
  RED: 'RED',
  GREEN: 'GREEN',
  BLUE: 'BLUE',
  PURPLE: 'PURPLE',
  YELLOW: 'YELLOW',
  NONE: 'NONE',
  SUPER: 'SUPER',
};

export const SPECIAL_GEM_TYPES = {
  FIRE: 'FIRE',
  CROSS: 'CROSS',
  SUPER: 'SUPER',
};

export const gemImagesByType = {
  [GEM_TYPES.GREEN]: greenGemImage,
  [GEM_TYPES.BLUE]: blueGemImage,
  [GEM_TYPES.PURPLE]: purpleGemImage,
  [GEM_TYPES.RED]: redGemImage,
  [GEM_TYPES.YELLOW]: yellowGemImage,
  [GEM_TYPES.SUPER]: superGemImage,
  [GEM_TYPES.NONE]: null,
};

export default GEM_TYPES;