import Phaser from 'phaser';
import GameGrid from './GameGrid';
import EVENTS from '../events';
import levelCreator, { exampleTemplate } from '../levels/levelCreator';
import GEM_TYPES, { gemImagesByType } from '../constants/gemTypes';
import { gameConfig } from '../screens/GameScreen';
import selectedImage from '../assets/selected.png';

class PlayGame extends Phaser.Scene {
  gameGrid = null;
  canPick = true;

  constructor() {
    super('PlayGame');
  }

  preload() {
    this.load.image(GEM_TYPES.BLUE, gemImagesByType[GEM_TYPES.BLUE]);
    this.load.image(GEM_TYPES.GREEN, gemImagesByType[GEM_TYPES.GREEN]);
    this.load.image(GEM_TYPES.PURPLE, gemImagesByType[GEM_TYPES.PURPLE]);
    this.load.image(GEM_TYPES.RED, gemImagesByType[GEM_TYPES.RED]);
    this.load.image(GEM_TYPES.YELLOW, gemImagesByType[GEM_TYPES.YELLOW]);
    this.load.image(GEM_TYPES.SUPER, gemImagesByType[GEM_TYPES.SUPER]);
    this.load.image('selected', selectedImage);
  }

  create() {
    this.gemSize = gameConfig.gemSize;
    this.gameGrid = new GameGrid(
      levelCreator(exampleTemplate).gridTemplate,
      gameConfig.gemSize,
      this,
    );
    this.gameGrid.draw(this);
    this.input.on('pointerdown', this.gemSelect, this);
    this.input.on('pointermove', this.startSwipe, this);
    this.input.on('pointerup', this.stopSwipe, this);
    this.setListeners();
  }

  setListeners() {
    this.game.events.on(EVENTS.selectSpecialPower, this.handleEventSpecialPower);
  }

  // TODO: implement
  handleEventSpecialPower(powerType) {
    console.log(powerType);
  }

  gemSelect(pointer) {
    if (this.canPick) {
      let row = Math.floor(pointer.y / this.gemSize);
      let col = Math.floor(pointer.x / this.gemSize);
      this.gameGrid.selectGem(row, col);
    }
  }

  startSwipe(pointer) {
    this.gameGrid.requestSwap(pointer);
  }

  stopSwipe() {
    this.gameGrid.stopDragging();
  }
}

export default PlayGame;
