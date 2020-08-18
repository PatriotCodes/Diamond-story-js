import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
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
          transition={{ duration: 1, loop: Infinity }}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
        />
      )}
    </div>
  );
};

export default Gem;
