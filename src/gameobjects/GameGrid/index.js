import React, { useState } from 'react';
import { connect } from 'react-redux';
import { swapGems } from '../../store/actions/gameGridActions';
import Gem from '../Gem';
import { isAdjacentCell, createsMatch } from '../../utils';
import selectionImage from '../../assets/selected.png';

const GameGrid = ({ gameGrid, gridRows, swapGems }) => {
  const [selectedGem, setSelectedGem] = useState(null);
  const INITIAL_GEM_SIZE = (window.innerHeight * 0.6) / gridRows;

  const handleGemClick = (index, position) => {
    if (selectedGem) {
      if (isAdjacentCell(selectedGem.index, index, gridRows)) {
        const match = createsMatch(selectedGem.index, index, gameGrid, gridRows);
        if (match) {
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
      {gameGrid.map(({ gemType, id, }, index) => (
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
    </div>
  );
};

const mapDispatchToProps = {
  swapGems,
};

export default connect(() => ({}), mapDispatchToProps)(GameGrid);
