import React from 'react';
import GEM_TYPES, { gemImagesByType } from '../../constants/gemTypes';
import { getPositionByIndex } from '../../utils';
import useStyles from './styles';

const Gem = ({ index, gemType, gridRows, size, onClick, isPlayable }) => {
  const position = getPositionByIndex(index, gridRows, size);

  const classes = useStyles({
    position,
    size,
    isPlayable,
  });

  return (
    <div className={classes.root} onClick={() => onClick(index, position)}>
      {gemType !== GEM_TYPES.NONE ? (
        <img alt="" src={gemImagesByType[gemType]} width={size} height={size} />
      ) : null}
    </div>
  );
};

export default Gem;
