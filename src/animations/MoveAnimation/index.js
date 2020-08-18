import React from "react";
import { motion } from 'framer-motion';
import { ANIMATION_SPEEDS } from '../../constants/animations';
import { gemImagesByType } from '../../constants/gemTypes';

const MoveAnimation = ({ fromX, toX, fromY, toY, gemSize, gemType, onAnimationComplete }) => {
  return (
    <motion.img
      alt=""
      width={gemSize}
      height={gemSize}
      src={gemImagesByType[gemType]}
      style={{
        position: 'absolute',
      }}
      transition={{ duration: ANIMATION_SPEEDS.moveAnimation }}
      initial={{ x: fromX, y: fromY }}
      animate={{ x: toX, y: toY }}
      onAnimationComplete={onAnimationComplete}
    />
  );
};

export default MoveAnimation;
