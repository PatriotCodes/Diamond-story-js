import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ANIMATION_SPEEDS } from '../../constants/animations';
import GEM_TYPES, { gemImagesByType } from '../../constants/gemTypes';
import { getPositionByIndex } from '../../utils';
import useStyles from './styles';

const Gem = ({
  index,
  gemType,
  gridRows,
  size,
  onClick,
  isPlayable,
  isPowered,
  isCrossPowered,
}) => {
  const position = useMemo(() => getPositionByIndex(index, gridRows, size), [
    index,
    gridRows,
    size,
  ]);

  const classes = useStyles({
    position,
    size,
    isPlayable,
    gemType,
  });

  return (
    <div className={classes.root} onClick={() => onClick(index, position)}>
      {gemType !== GEM_TYPES.NONE ? (
        <img alt="" src={gemImagesByType[gemType]} width={size} height={size} />
      ) : null}
      {/*TODO: This would need to change styles if crossGem will be implemented*/}
      {(isPowered || isCrossPowered) && (
        <motion.div
          className={classes.effectDiv}
          transition={{ duration: ANIMATION_SPEEDS.poweredPulse, loop: Infinity }}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.6, 1, 0.6] }}
        />
      )}
    </div>
  );
};

export default Gem;
