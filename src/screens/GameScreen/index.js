import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import level_01 from '../../levels/level_01';
import { initialiseField } from '../../store/actions/gameGridActions';
import GameGrid from '../../gameobjects/GameGrid';

const GameScreen = ({ gameGrid, gridRows, gameGridReady, initialiseField }) => {
  useEffect(() => {
    initialiseField(level_01.gridTemplate);
  }, []);

  return <div>{gameGridReady && <GameGrid gameGrid={gameGrid} gridRows={gridRows} />}</div>;
};

const mapStateToProps = state => ({
  gameGrid: state.gameGridReducer.grid,
  gridRows: state.gameGridReducer.gridRows,
  gameGridReady: state.gameGridReducer.isInitialised,
});

const mapDispatchToProps = {
  initialiseField,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
