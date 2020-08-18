import ANIMATION_TYPES from '../constants/animations';

const createMoveAnimation = (gemType, gemSize, position1, position2) => ({
  type: ANIMATION_TYPES.move,
  gemType: gemType,
  gemSize: gemSize,
  fromX: position1.x,
  toX: position2.x,
  fromY: position1.y,
  toY: position2.y,
});

const createSwapAnimation = (gemType1, gemType2, gemSize, position1, position2) => {
  return [
    createMoveAnimation(gemType1, gemSize, position1, position2),
    createMoveAnimation(gemType2, gemSize, position2, position1),
  ];
};

const createDestroyAnimation = (gemType, gemSize, position) => ({
  type: ANIMATION_TYPES.destroy,
  gemType: gemType,
  gemSize: gemSize,
  position: position,
});

/**
 *
 * @param match {object}
 * @param gemSize {number}
 * @param matchItem {object}
 * @param matchType {string}
 * @returns {array}
 *
 * This function is responsible for choosing proper destroy match animation
 * for now no cross animation is created only 3/4/5 length based
 */
const createMatchDestroyAnimation = (match, gemSize, matchItem, matchType) => {
  return match.map(item => createDestroyAnimation(item.gemType, gemSize, item.position));
};

export default {
  createMoveAnimation,
  createSwapAnimation,
  createMatchDestroyAnimation,
};
