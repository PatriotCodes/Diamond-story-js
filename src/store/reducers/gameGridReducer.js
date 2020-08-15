import * as TYPES from '../actionTypes/gameGridActionTypes';
import GEM_TYPES from '../../constants/gemTypes';
import { gridCreator, arraySwapClean } from '../../utils';
import animationCreator from '../../animations/animationCreator';

const initialState = {
  grid: [],
  swapGems: {
    match: [],
    swappedItem: {
      index: null,
      gemType: null,
    },
  },
  animationsList: [],
  gridCols: 0,
  gridRows: 0,
  isInitialised: false,
  gemSize: 0,
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
        gemSize: (window.innerHeight * 0.6) / action.fieldTemplate[0].length,
      };

    case TYPES.SWAP_GEMS_START:
      return {
        ...state,
        grid: arraySwapClean(state.grid, action.index1, action.index2),
        swapGems: {
          match: action.match,
          swappedItem: {
            index: action.index1,
            gemType: state.grid[action.index2].gemType,
          },
        },
        animationsList: [
          animationCreator.createMoveAnimation(
            state.grid[action.index1].gemType,
            state.gemSize,
            action.position1,
            action.position2,
          ),
          animationCreator.createMoveAnimation(
            state.grid[action.index2].gemType,
            state.gemSize,
            action.position2,
            action.position1,
          ),
        ],
      };

    case TYPES.SWAP_GEMS_END:
      return {
        ...state,
        grid: state.grid.map((item, index) => {
          if (index === state.swapGems.swappedItem.index) {
            return {
              ...item,
              gemType: state.swapGems.swappedItem.gemType,
            };
          }
          if (state.swapGems.match.includes(index)) {
            return {
              ...item,
              gemType: GEM_TYPES.NONE,
            };
          }
          return item;
        }),
        animationsList: [],
      };

    default:
      return state;
  }
};
