import React, { useState } from 'react';
import { connect } from 'react-redux';
import { swapGemsStart, swapGemsEnd } from '../../store/actions/gameGridActions';
import AnimationDrawer from '../../animations/AnimationDrawer';
import Gem from '../Gem';
import { isAdjacentCell, createsMatch } from '../../utils';
import selectionImage from '../../assets/selected.png';

const GameGrid = ({ gameGrid, gridRows, swapGemsStart, swapGemsEnd, gemSize, animationsList }) => {
  const [selectedGem, setSelectedGem] = useState(null);

  const handleGemClick = (index, position) => {
    if (selectedGem) {
      if (isAdjacentCell(selectedGem.index, index, gridRows)) {
        const match = createsMatch(selectedGem.index, index, gameGrid, gridRows);
        if (match) {
          swapGemsStart(
            selectedGem.index,
            index,
            match,
            selectedGem.position,
            position,
          );
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

  const handleAnimationsComplete = () => {
    swapGemsEnd();
    console.log('animations done');
  };

  return (
    <div
      style={{
        position: 'relative',
        width: `calc(${gemSize}px * ${gridRows})`,
        height: `calc(${gemSize}px * ${gridRows})`,
      }}
    >
      {gameGrid.map(({ gemType, id, isPlayable }, index) => (
        <Gem
          isPlayable={isPlayable}
          index={index}
          x={index % gridRows}
          y={Math.floor(index / gridRows)}
          key={id}
          gemType={gemType}
          onClick={handleGemClick}
          size={gemSize}
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
        <AnimationDrawer animationList={animationsList} onComplete={handleAnimationsComplete} />
      )}
    </div>
  );
};

const mapDispatchToProps = {
  swapGemsStart,
  swapGemsEnd,
};

export default connect(() => ({}), mapDispatchToProps)(GameGrid);
