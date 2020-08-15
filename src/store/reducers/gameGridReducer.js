import * as TYPES from '../actionTypes/gameGridActionTypes';
import { gridCreator, arraySwapClean } from '../../utils';

const initialState = {
  grid: [],
  gridCols: 0,
  gridRows: 0,
  isInitialised: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.INITIALISE_FIELD:
      return {
        ...state,
        grid: gridCreator(action.fieldTemplate),
        gridCols: action.fieldTemplate.length,
        gridRows: action.fieldTemplate[0].length,
        isInitialised: true,
      };

    case TYPES.SWAP_GEMS:
      console.log(action);
      return {
        ...state,
        grid: arraySwapClean(state.grid, action.index1, action.index2),
      };

    default:
      return state;
  }
};
