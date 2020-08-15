import * as TYPES from '../actionTypes/gameGridActionTypes';

export const initialiseField = fieldTemplate => ({
  type: TYPES.INITIALISE_FIELD,
  fieldTemplate,
});

export const swapGemsStart = (index1, index2, match, position1, position2) => ({
  type: TYPES.SWAP_GEMS_START,
  index1,
  index2,
  match,
  position1,
  position2,
});

export const swapGemsEnd = () => ({
  type: TYPES.SWAP_GEMS_END,
});
