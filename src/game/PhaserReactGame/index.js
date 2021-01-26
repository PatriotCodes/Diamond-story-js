import * as Phaser from 'phaser';

class Game extends Phaser.Game {
  constructor(config, reactFunctions) {
    super(config);
    this.react = reactFunctions;
  }
}

export default Game;
