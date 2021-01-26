import React from 'react';
import { SPECIAL_POWER_TYPES } from '../../../game/constants';

const BottomBar = ({ onClickSpecialPower }) => {
  return (
    <div>
      <button onClick={() => onClickSpecialPower(SPECIAL_POWER_TYPES.hammer)}>HAMMER</button>
    </div>
  );
};

export default BottomBar;
