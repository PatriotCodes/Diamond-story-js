import * as TYPES from '../actionTypes/gameGridActionTypes';

export const initialiseField = fieldTemplate => ({
  type: TYPES.INITIALISE_FIELD,
  fieldTemplate,
});

export const swapGems = (index1, index2, match, position1, position2) => ({
  type: TYPES.SWAP_GEMS,
  index1,
  index2,
  match,
  position1,
  position2,
});

export const processAnimationEnd = () => ({
  type: TYPES.PROCESS_ANIMATION_END,
});
