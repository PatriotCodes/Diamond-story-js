import * as TYPES from '../actionTypes/gameGridActionTypes';
import _ from 'lodash';
import GEM_TYPES from '../../constants/gemTypes';
import MATCH_TYPES from '../../constants/matchTypes';
import { STORE_ANIMATION_PROCESS } from '../../constants/animations';
import { gridCreator, arraySwapClean, getPositionByIndex, animationCreator } from '../../utils';

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

const getGemTypeForMatchDestroyAnimation = (state, index) => {
  switch (index) {
    case state.swapGems.matchItem.index:
      return state.swapGems.matchItem.gemType;
    case state.swapGems.swappedItem.index:
      return state.swapGems.swappedItem.gemType;
    default:
      return state.grid[index].gemType;
  }
};

const processAnimationEnd = state => {
  switch (state.animationProcess) {
    case STORE_ANIMATION_PROCESS.swap:
      return {
        ...state,
        grid: state.grid.map((item, index) => {
          if (_.flatten(state.swapGems.match.map(item => item.match)).includes(index)) {
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
          if (index === state.swapGems.matchItem.index) {
            return {
              ...item,
              gemType: state.swapGems.matchItem.gemType,
            };
          }
          return item;
        }),
        animationsList: _.flatten(
          state.swapGems.match.map(match =>
            animationCreator.createMatchDestroyAnimation(
              match.match.map(item => ({
                position: getPositionByIndex(item, state.gridRows, state.gemSize),
                gemType: getGemTypeForMatchDestroyAnimation(state, item),
              })),
              state.gemSize,
              match.matchItem,
              match.matchType,
              state.gridRows,
            ),
          ),
        ),
        animationProcess: STORE_ANIMATION_PROCESS.destroy,
      };

    case STORE_ANIMATION_PROCESS.destroy:
      const specialGems = state.swapGems.match.filter(item => item.matchItem.isSpecial);
      return {
        ...state,
        grid: !!specialGems.length
          ? state.grid.map((item, index) => {
              const specialGem = _.find(specialGems, { matchItem: { index: index } });
              if (specialGem) {
                switch (specialGem.matchType) {
                  case MATCH_TYPES.match4:
                    return {
                      ...item,
                      gemType: specialGem.matchItem.gemType,
                      isPowered: true,
                    };
                  case MATCH_TYPES.match5:
                    return {
                      ...item,
                      gemType: GEM_TYPES.SUPER,
                    };
                  case MATCH_TYPES.crossMatch:
                    return {
                      ...item,
                      gemType: specialGem.matchItem.gemType,
                      isCrossPowered: true,
                    };
                  default:
                    throw new Error(
                      `Special can't be a part of such match type: ${specialGem.matchType}`,
                    );
                }
              }
              return item;
            })
          : state.grid,
        animationsList: [],
        animationProcess: STORE_ANIMATION_PROCESS.fallDown,
        swapGems: initialState.swapGems,
      };

    // CHECK FOR MATCHES
    case STORE_ANIMATION_PROCESS.fallDown:
      return state;

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
