import React from 'react';
import GEM_TYPES, { gemImagesByType} from '../../constants/gemTypes';

const Gem = ({ index, gemType, x, y, size, onClick }) => {
  const position = {
    x: x * size,
    y: y * size,
  }

  return gemType !== GEM_TYPES.NONE ? (
    <img
      alt=''
      src={gemImagesByType[gemType]}
      onClick={() => onClick(index, position)}
      width={size}
      height={size}
      style={{
        left: position.x,
        top: position.y,
        position: 'absolute'
      }}
    />
  ) : null;
};

export default Gem;
