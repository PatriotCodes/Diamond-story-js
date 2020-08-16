import React from 'react';
import GEM_TYPES, { gemImagesByType } from '../../constants/gemTypes';

const Gem = ({ index, gemType, x, y, size, onClick, isPlayable }) => {
  const position = {
    x: x * size,
    y: y * size,
  };

  return (
    <div
      style={{
        left: position.x,
        top: position.y,
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        pointerEvents: !isPlayable && 'none',
        background: isPlayable && 'radial-gradient(rgba(35, 32, 39, 0.63), rgb(35, 32, 39))',
      }}
      onClick={() => onClick(index, position)}
    >
      {gemType !== GEM_TYPES.NONE ? (
        <img
          alt=""
          src={gemImagesByType[gemType]}
          width={size}
          height={size}
          style={{
            pointerEvents: 'none',
          }}
        />
      ) : null}
    </div>
  );
};

export default Gem;
