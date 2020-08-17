import * as TYPES from '../actionTypes/gameGridActionTypes';
import GEM_TYPES from '../../constants/gemTypes';
import { STORE_ANIMATION_PROCESS } from '../../constants/animations';
import { gridCreator, arraySwapClean, getPositionByIndex } from '../../utils';
import animationCreator from '../../animations/animationCreator';

const initialState = {
  grid: [],
  swapGems: {
    match: [],
    swappedItem: {
      index: null,
      gemType: null,
    },
    matchItem: {
      index: null,
      gemType: null,
    },
  },
  animationsList: [],
  animationProcess: null,
  gridCols: 0,
  gridRows: 0,
  isInitialised: false,
  gemSize: 0,
};

const processAnimationEnd = state => {
  console.log(getPositionByIndex(2, state.gemSize, state.gridRows, true))
  switch (state.animationProcess) {
    case STORE_ANIMATION_PROCESS.swap:
      return {
        ...state,
        // TODO {refactor}: Find a way to not use map
        grid: state.grid.map((item, index) => {
          if (state.swapGems.match.includes(index)) {
            return {
              ...item,
              gemType: GEM_TYPES.NONE,
            };
          }
          if (index === state.swapGems.swappedItem.index) {
            return {
              ...item,
              gemType: state.swapGems.swappedItem.gemType,
            };
          }
          return item;
        }),
        swapGems: initialState.swapGems,
        animationsList: animationCreator.createMatchDestroyAnimation(
          state.swapGems.match.map(item => ({
            position: getPositionByIndex(item, state.gridRows, state.gemSize),
            gemType: state.grid[item].gemType,
          })),
          state.gemSize,
          state.swapGems.matchItem,
        ),
        animationProcess: STORE_ANIMATION_PROCESS.destroy,
      };

    default:
      return state;
  }
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

    case TYPES.SWAP_GEMS:
      return {
        ...state,
        grid: arraySwapClean(state.grid, action.index1, action.index2),
        swapGems: {
          match: action.match,
          swappedItem: {
            index: action.index1,
            gemType: state.grid[action.index2].gemType,
          },
          matchItem: {
            index: action.index2,
            gemType: state.grid[action.index1].gemType,
          },
        },
        animationsList: animationCreator.createSwapAnimation(
          state.grid[action.index1].gemType,
          state.grid[action.index2].gemType,
          state.gemSize,
          action.position1,
          action.position2,
        ),
        animationProcess: STORE_ANIMATION_PROCESS.swap,
      };

    case TYPES.PROCESS_ANIMATION_END:
      return processAnimationEnd(state);

    default:
      return state;
  }
};
