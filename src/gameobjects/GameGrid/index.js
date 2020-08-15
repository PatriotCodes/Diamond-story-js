import React, { useState } from 'react';
import { connect } from 'react-redux';
import { swapGems } from '../../store/actions/gameGridActions';
import AnimationDrawer from '../../animations/AnimationDrawer';
import Gem from '../Gem';
import ANIMATION_TYPES from '../../constants/animations';
import { isAdjacentCell, createsMatch } from '../../utils';
import selectionImage from '../../assets/selected.png';

const GameGrid = ({ gameGrid, gridRows, swapGems }) => {
  const [selectedGem, setSelectedGem] = useState(null);
  const [animations, setAnimations] = useState([]);
  const INITIAL_GEM_SIZE = (window.innerHeight * 0.6) / gridRows;

  const handleGemClick = (index, position) => {
    if (selectedGem) {
      if (isAdjacentCell(selectedGem.index, index, gridRows)) {
        const match = createsMatch(selectedGem.index, index, gameGrid, gridRows);
        if (match) {
          setAnimations([{
            type: ANIMATION_TYPES.move,
            gemType: gameGrid[selectedGem.index].gemType,
            gemSize: INITIAL_GEM_SIZE,
            fromX: selectedGem.position.x,
            toX: position.x,
            fromY: selectedGem.position.y,
            toY: position.y,
          }, {
            type: ANIMATION_TYPES.move,
            gemType: gameGrid[index].gemType,
            gemSize: INITIAL_GEM_SIZE,
            fromX: position.x,
            toX: selectedGem.position.x,
            fromY: position.y,
            toY: selectedGem.position.y,
          }]);
          swapGems(selectedGem.index, index);
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
    <div>
      {gameGrid.map(({ gemType, id }, index) => (
        <Gem
          index={index}
          x={index % gridRows}
          y={Math.floor(index / gridRows)}
          key={id}
          gemType={gemType}
          onClick={handleGemClick}
          size={INITIAL_GEM_SIZE}
        />
      ))}
      {selectedGem && (
        <img
          alt=""
          src={selectionImage}
          width={INITIAL_GEM_SIZE}
          height={INITIAL_GEM_SIZE}
          style={{
            position: 'absolute',
            left: selectedGem.position.x,
            top: selectedGem.position.y,
          }}
        />
      )}
      <AnimationDrawer animationList={animations} />
    </div>
  );
};

const mapDispatchToProps = {
  swapGems,
};

export default connect(() => ({}), mapDispatchToProps)(GameGrid);
