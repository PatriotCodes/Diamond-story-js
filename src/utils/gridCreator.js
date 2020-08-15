import GEM_TYPES from '../constants/gemTypes';
import uuid from 'react-uuid';
import _ from 'lodash';

const randomProperty = function (obj) {
  const keys = Object.keys(obj);
  return obj[keys[(keys.length * Math.random()) << 0]];
};

export default gridTemplate => {
  const result = new Array(gridTemplate.length).fill(null).map((_, index) => (
    new Array(gridTemplate[index].length).fill(null).map(() => ({
      gemType: GEM_TYPES.NONE,
      id: uuid(),
    }))
  ));

  for (let indexLine = 0; indexLine < gridTemplate.length; indexLine++) {
    for (let index = 0; index < gridTemplate[indexLine].length; index++) {
      if (gridTemplate[indexLine][index].hasGem) {
        const prevLineItem = result[indexLine - 2]?.gemType;
        const prevColItem = result[index - 2]?.gemType;
        const omittedTypes = _.omit(GEM_TYPES, [
          prevLineItem,
          prevColItem,
          GEM_TYPES.NONE,
          GEM_TYPES.SUPER,
        ]);
        result[indexLine][index].gemType = randomProperty(omittedTypes);
      }
    }
  }

  return _.flatten(result);
};
