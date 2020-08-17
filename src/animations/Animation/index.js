import React from 'react';
import ANIMATION_TYPES from '../../constants/animations';
import MoveAnimation from '../MoveAnimation';
import DestroyAnimation from '../DestroyAnimation';

const Animation = ({ animation, onAnimationComplete }) => {
  switch (animation.type) {
    case ANIMATION_TYPES.move:
      return (
        <MoveAnimation
          gemType={animation.gemType}
          fromX={animation.fromX}
          toX={animation.toX}
          fromY={animation.fromY}
          toY={animation.toY}
          gemSize={animation.gemSize}
          onAnimationComplete={onAnimationComplete}
        />
      );

    case ANIMATION_TYPES.destroy:
      return (
        <DestroyAnimation
          position={animation.position}
          gemType={animation.gemType}
          gemSize={animation.gemSize}
          onAnimationComplete={onAnimationComplete}
        />
      );

    default:
      throw new Error(`Inappropriate animation type: ${animation.type}`);
  }
};

export default Animation;
