import createGrid from '../utils/gridCreator';
import { ANIMATION_EASE, ANIMATION_SPEEDS, ANIMATIONS, MATCH_TYPES } from '../constants';
import ReactManager from '../ReactManager';
import Gem from '../Gem';
import Coordinates from '../Coordinates';
import createsMatch from '../../utils/createsMatch';
import GEM_TYPES, { SPECIAL_GEM_TYPES } from '../../constants/gemTypes';

class GameGrid {
  gameField = [[]];
  gemSize = 0;
  selectedGem = null;
  isDragging = false;
  renderer = null;
  tweensInProgress = 0;
  matchList = [];
  reactManager = null;

  constructor(gridTemplate, gemSize, renderer) {
    // TODO: implement border draw
    // TODO: consider drawing all gems and using visible/invisible
    this.gameField = createGrid(gridTemplate).map((row, indexY) =>
      row.map(
        ({ gemType, isPlayable }, indexX) =>
          new Gem(gemType, isPlayable, { x: indexX, y: indexY }, gemSize),
      ),
    );
    this.gemSize = gemSize;
    this.renderer = renderer;
    this.reactManager = new ReactManager(this.renderer.game.react);
  }

  draw() {
    this.gameField.forEach(row => {
      row.forEach(gem => {
        gem.draw(this.renderer);
      });
    });
  }

  selectGem(row, col) {
    const gem = this.gameField[row][col];
    if (gem.isPlaying()) {
      this.isDragging = true;
      if (this.selectedGem && !this.selectedGem.coordinates.isEqual(gem.coordinates)) {
        const selectedGem = this.gameField[this.selectedGem.coordinates.y][
          this.selectedGem.coordinates.x
        ];
        // TODO: isAdjacent not working properly
        if (gem.coordinates.isAdjacent(selectedGem.coordinates)) {
          this.swapGems(gem, selectedGem);
        } else {
          this.selectedGem.destroy();
          this.selectedGem = new Gem('selected', true, { x: col, y: row }, this.gemSize);
          this.selectedGem.draw(this.renderer);
        }
      } else {
        if (!this.selectedGem) {
          this.selectedGem = new Gem('selected', true, { x: col, y: row }, this.gemSize);
          this.selectedGem.draw(this.renderer);
        }
      }
    }
  }

  removeSelection() {
    this.stopDragging();
    if (this.selectedGem) {
      this.selectedGem.destroy();
      this.selectedGem = null;
    }
  }

  stopDragging() {
    this.isDragging = false;
  }

  requestSwap(pointer) {
    if (this.selectedGem && this.isDragging) {
      let deltaX = pointer.downX - pointer.x;
      let deltaY = pointer.downY - pointer.y;
      let deltaRow = 0;
      let deltaCol = 0;
      if (deltaX > this.gemSize / 2 && Math.abs(deltaY) < this.gemSize / 4) {
        deltaCol = -1;
      }
      if (deltaX < -this.gemSize / 2 && Math.abs(deltaY) < this.gemSize / 4) {
        deltaCol = 1;
      }
      if (deltaY > this.gemSize / 2 && Math.abs(deltaX) < this.gemSize / 4) {
        deltaRow = -1;
      }
      if (deltaY < -this.gemSize / 2 && Math.abs(deltaX) < this.gemSize / 4) {
        deltaRow = 1;
      }
      if (deltaRow + deltaCol !== 0) {
        const pickedGemCoordinates = new Coordinates(
          this.selectedGem.coordinates.x + deltaCol,
          this.selectedGem.coordinates.y + deltaRow,
        );
        if (this.gameField[pickedGemCoordinates.y][pickedGemCoordinates.x].isPlaying()) {
          if (
            pickedGemCoordinates.isWithingBounds(this.gameField.length, this.gameField[0].length)
          ) {
            const pickedGem = this.gameField[pickedGemCoordinates.y][pickedGemCoordinates.x];
            const selectedGem = this.gameField[this.selectedGem.coordinates.y][
              this.selectedGem.coordinates.x
            ];
            this.swapGems(selectedGem, pickedGem);
          }
        }
      }
    }
  }

  swapGems(gem1, gem2, swapBack) {
    this.removeSelection();
    this.tweensInProgress = 2;
    let fromColor = gem1.gemType;
    let fromSprite = gem1.gemSprite;
    let toColor = gem2.gemType;
    let toSprite = gem2.gemSprite;
    this.gameField[gem1.coordinates.y][gem1.coordinates.x].setType(toColor, toSprite);
    this.gameField[gem2.coordinates.y][gem2.coordinates.x].setType(fromColor, fromSprite);
    this.tweenGem(gem1, gem2, swapBack);
    this.tweenGem(gem2, gem1, swapBack);
  }

  tweenGem(gem1, gem2, swapBack) {
    this.renderer.tweens.add({
      targets: gem1.gemSprite,
      x: gem1.position.x,
      y: gem1.position.y,
      duration: swapBack
        ? ANIMATION_SPEEDS[ANIMATIONS.swapBack]
        : ANIMATION_SPEEDS[ANIMATIONS.swap],
      ease: ANIMATION_EASE[ANIMATIONS.swap],
      callbackScope: this,
      onComplete: function () {
        this.tweensInProgress--;
        if (!this.tweensInProgress) {
          if (!swapBack) {
            const match = createsMatch(gem1, gem2, this.gameField);
            if (match) {
              this.matchList.push(...match);
              this.reactManager.updateMoves();
              this.destroyMatches();
            } else {
              this.swapGems(gem1, gem2, true);
            }
          }
        }
      },
    });
  }

  destroyMatches() {
    this.matchList.forEach(match => this.destroyMatch(match));
  }

  // TODO: implement animations for match3, implement super gem destroy
  // TODO: check !tweensInProgress works properly when destroying multiple matches
  destroyMatch(match) {
    switch (match.matchType) {
      case MATCH_TYPES.match3:
        this.tweensInProgress += 3;
        match.gems.forEach(coordinates => {
          this.renderer.tweens.add({
            targets: this.gameField[coordinates.y][coordinates.x].gemSprite,
            scaleX: 0,
            scaleY: 0,
            duration: ANIMATION_SPEEDS[ANIMATIONS.destroy],
            callbackScope: this,
            onComplete: function () {
              this.tweensInProgress--;
              this.gameField[coordinates.y][coordinates.x].gemSprite.destroy();
              this.gameField[coordinates.y][coordinates.x].gemType = GEM_TYPES.NONE;

              if (!this.tweensInProgress) {
                this.fallDownGems();
              }
            },
          });
        });
        break;
      case MATCH_TYPES.match4:
      case MATCH_TYPES.match5:
        this.tweensInProgress += 3;
        match.gems.forEach(coordinates => {
          if (!coordinates.isEqual(match.initGem)) {
            this.renderer.tweens.add({
              targets: this.gameField[coordinates.y][coordinates.x].gemSprite,
              x: this.gameField[match.initGem.y][match.initGem.x].position.x,
              y: this.gameField[match.initGem.y][match.initGem.x].position.y,
              duration: ANIMATION_SPEEDS[ANIMATIONS.destroyCollapse],
              callbackScope: this,
              onComplete: function () {
                this.tweensInProgress--;
                this.gameField[coordinates.y][coordinates.x].gemSprite.destroy();
                this.gameField[coordinates.y][coordinates.x].gemType = GEM_TYPES.NONE;

                if (!this.tweensInProgress) {
                  if (match.matchType === MATCH_TYPES.match4) {
                    this.gameField[coordinates.y][coordinates.x].setSpecial(SPECIAL_GEM_TYPES.FIRE);
                  } else {
                    this.gameField[match.initGem.y][match.initGem.x].gemSprite.destroy();
                    this.gameField[match.initGem.y][match.initGem.x] = new Gem(
                      GEM_TYPES.SUPER,
                      true,
                      match.initGem,
                      this.gemSize,
                    );
                    this.gameField[match.initGem.y][match.initGem.x].draw(this.renderer);
                  }
                  this.fallDownGems();
                }
              },
            });
          }
        });
        break;
    }
  }

  // TODO: implement
  fallDownGems() {
    console.log('now replenish board');
  }
}

export default GameGrid;
