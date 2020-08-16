import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import level_01 from '../../levels/level_01';
import { initialiseField } from '../../store/actions/gameGridActions';
import GameGrid from '../../gameobjects/GameGrid';

const GameScreen = ({
  gameGrid,
  gridRows,
  gameGridReady,
  initialiseField,
  gemSize,
  animationsList,
}) => {
  useEffect(() => {
    initialiseField(level_01.gridTemplate);
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {gameGridReady && (
        <GameGrid
          gameGrid={gameGrid}
          gridRows={gridRows}
          gemSize={gemSize}
          animationsList={animationsList}
        />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  gameGrid: state.gameGridReducer.grid,
  gridRows: state.gameGridReducer.gridRows,
  gemSize: state.gameGridReducer.gemSize,
  gameGridReady: state.gameGridReducer.isInitialised,
  animationsList: state.gameGridReducer.animationsList,
});

const mapDispatchToProps = {
  initialiseField,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
