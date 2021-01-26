import GEM_TYPES from '../../constants/gemTypes';
import Coordinates from '../Coordinates';
import getPositionByIndex from '../utils/getPositionByIndex';

class Gem {
  gemType = GEM_TYPES.NONE;
  isPlayable = false;
  gemSize = 0;
  coordinates = new Coordinates();
  position = new Coordinates();
  gemSprite = null;
  gemSpecial = null;

  constructor(gemType, isPlayable, coordinates, gemSize, gemSprite = null, gemSpecial = null) {
    this.gemType = gemType;
    this.isPlayable = isPlayable;
    this.coordinates = new Coordinates(coordinates.x, coordinates.y);
    const position = getPositionByIndex(coordinates.x, coordinates.y, gemSize);
    this.position = new Coordinates(position.x, position.y);
    this.gemSize = gemSize;
    this.gemSprite = gemSprite;
    this.gemSpecial = gemSpecial;
  }

  draw(renderer) {
    if (this.isPlayable) {
      const gem = renderer.add.sprite(this.position.x, this.position.y, this.gemType);
      gem.displayWidth = this.gemSize;
      gem.displayHeight = this.gemSize;
      gem.setOrigin(0, 0);
      this.gemSprite = gem;
    }
  }

  setType(gemType, gemSprite) {
    this.gemType = gemType;
    this.gemSprite = gemSprite;
  }

  setSpecial(special) {
    this.gemSpecial = special;
  }

  isPlaying() {
    return this.isPlayable;
  }

  clone() {
    return new Gem(this.gemType, this.isPlayable, this.coordinates, this.gemSize, this.gemSprite);
  }

  destroy() {
    this.gemSprite.destroy();
  }
}

export default Gem;
