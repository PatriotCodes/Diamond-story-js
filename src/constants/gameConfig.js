import Phaser from 'phaser';
import generateGameSize from '../game/utils/generateGameSize';
import playGame from '../game';

const exampleDevice = {
  innerWidth: 400,
};

const baseConfig = {
  type: Phaser.AUTO,
  parent: 'phaser',
  resolution: window.devicePixelRatio,
  scene: playGame,
  transparent: true,
};

export const generateConfig = gridTemplate => {
  return {
    ...generateGameSize(exampleDevice, gridTemplate.length, gridTemplate[0].length),
    ...baseConfig,
  };
};

export default baseConfig;
