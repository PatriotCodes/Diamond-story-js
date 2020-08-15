import * as TYPES from '../actionTypes/gameGridActionTypes';

export const initialiseField = fieldTemplate => ({
  type: TYPES.INITIALISE_FIELD,
  fieldTemplate,
});

export const swapGems = (index1, index2) => ({
  type: TYPES.SWAP_GEMS,
  index1,
  index2,
});
