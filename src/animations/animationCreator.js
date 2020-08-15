import ANIMATION_TYPES from '../constants/animations';

const createMoveAnimation = (gemType, gemSize, position1, position2) => {
  return {
    type: ANIMATION_TYPES.move,
    gemType: gemType,
    gemSize: gemSize,
    fromX: position1.x,
    toX: position2.x,
    fromY: position1.y,
    toY: position2.y,
  };
};

export default {
  createMoveAnimation,
};
