import React from 'react';
import { motion } from 'framer-motion';
import { ANIMATION_SPEEDS } from '../../constants/animations';
import { gemImagesByType } from '../../constants/gemTypes';

const DestroyAnimation = ({ position, gemSize, gemType, onAnimationComplete }) => {
  return (
    <motion.img
      alt=""
      width={gemSize}
      height={gemSize}
      src={gemImagesByType[gemType]}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        transformOrigin: 'initial',
      }}
      transition={{ duration: ANIMATION_SPEEDS.destroyAnimation }}
      initial={{ scale: 1 }}
      animate={{ scale: 0 }}
      onAnimationComplete={onAnimationComplete}
    />
  );
};

export default DestroyAnimation;
