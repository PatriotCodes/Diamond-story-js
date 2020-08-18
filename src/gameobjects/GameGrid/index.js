import React, { useState } from 'react';
import { connect } from 'react-redux';
import { swapGems, processAnimationEnd } from '../../store/actions/gameGridActions';
import AnimationDrawer from '../../animations/AnimationDrawer';
import Gem from '../Gem';
import { isAdjacentCell, createsMatch } from '../../utils';
import selectionImage from '../../assets/selected.png';

const GameGrid = ({
  gameGrid,
  gridRows,
  swapGems,
  processAnimationEnd,
  gemSize,
  animationsList,
}) => {
  const [selectedGem, setSelectedGem] = useState(null);

  const handleGemClick = (index, position) => {
    if (selectedGem) {
      if (isAdjacentCell(selectedGem.index, index, gridRows)) {
        const match = createsMatch(selectedGem.index, index, gameGrid, gridRows);
        if (match) {
          swapGems(selectedGem.index, index, match, selectedGem.position, position);
          setSelectedGem(null);
          return;
        }
      }
    }
    setSelectedGem({
      index,
      position,
    });
  };

  return (
    <div
      style={{
        position: 'relative',
        width: `calc(${gemSize}px * ${gridRows})`,
        height: `calc(${gemSize}px * ${gridRows})`,
        pointerEvents: animationsList.length ? 'none' : 'all',
        userSelect: 'none',
      }}
    >
      {gameGrid.map(({ gemType, id, isPlayable, isPowered, isCrossPowered }, index) => (
        <Gem
          isPlayable={isPlayable}
          index={index}
          key={id}
          gemType={gemType}
          onClick={handleGemClick}
          size={gemSize}
          gridRows={gridRows}
          isPowered={isPowered}
          isCrossPowered={isCrossPowered}
        />
      ))}
      {selectedGem && (
        <img
          alt=""
          src={selectionImage}
          width={gemSize}
          height={gemSize}
          style={{
            position: 'absolute',
            left: selectedGem.position.x,
            top: selectedGem.position.y,
          }}
        />
      )}
      {Boolean(animationsList.length) && (
        <AnimationDrawer animationList={animationsList} onComplete={processAnimationEnd} />
      )}
    </div>
  );
};

const mapDispatchToProps = {
  swapGems,
  processAnimationEnd,
};

export default connect(() => ({}), mapDispatchToProps)(GameGrid);
