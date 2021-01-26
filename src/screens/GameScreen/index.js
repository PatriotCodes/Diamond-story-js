import React, { useEffect, useState } from 'react';
import EVENTS from '../../events';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import PhaserReactGame from '../../game/PhaserReactGame';
import { exampleTemplate } from '../../levels/levelCreator';
import { generateConfig } from '../../constants/gameConfig';

export const gameConfig = generateConfig(exampleTemplate);

const GameScreen = () => {
  const [game, setGame] = useState(null);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const game = new PhaserReactGame(gameConfig, { setMoves });
    setGame(game);
    return () => {
      game.destroy();
    };
  }, []);

  const handleSpecialPowerClick = powerType => {
    game.events.emit(EVENTS.selectSpecialPower, powerType);
  };

  return (
    <div>
      <TopBar moves={moves} />
      <div id="phaser" />
      <BottomBar onClickSpecialPower={handleSpecialPowerClick} />
    </div>
  );
};

export default GameScreen;
