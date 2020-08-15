import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import GEM_TYPES from '../../constants/gemTypes';

import greenGemImage from '../../assets/green_gem.png';
import blueGemImage from '../../assets/blue_gem.png';
import purpleGemImage from '../../assets/purple_gem.png';
import redGemImage from '../../assets/red_gem.png';
import yellowGemImage from '../../assets/yellow_gem.png';
import superGemImage from '../../assets/super_gem.png';

const gemImagesByType = {
  [GEM_TYPES.GREEN]: greenGemImage,
  [GEM_TYPES.BLUE]: blueGemImage,
  [GEM_TYPES.PURPLE]: purpleGemImage,
  [GEM_TYPES.RED]: redGemImage,
  [GEM_TYPES.YELLOW]: yellowGemImage,
  [GEM_TYPES.SUPER]: superGemImage,
  [GEM_TYPES.NONE]: null,
};

const Gem = ({ index, gemType, x, y, size, onClick }) => {
  const style = useSpring(({
    left: x * size,
    top: y * size,
    position: 'absolute'
  }));
  const position = {
    x: x * size,
    y: y * size,
  }

  return gemType !== GEM_TYPES.NONE ? (
    <animated.img
      alt=''
      src={gemImagesByType[gemType]}
      onClick={() => onClick(index, position)}
      width={size}
      height={size}
      style={style}
    />
  ) : null;
};

export default Gem;
