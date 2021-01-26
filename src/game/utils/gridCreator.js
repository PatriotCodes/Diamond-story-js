import GEM_TYPES from '../../constants/gemTypes';
import randomProperty from '../../utils/randomProperty';
import _ from 'lodash';

const initialTemplate = gridTemplate =>
  new Array(gridTemplate.length).fill(null).map((x, index) =>
    new Array(gridTemplate[index].length).fill(null).map((x, index2) => {
      return {
        gemType: gridTemplate[index][index2].hasGem
          ? randomProperty(_.omit(GEM_TYPES, [GEM_TYPES.NONE, GEM_TYPES.SUPER]))
          : GEM_TYPES.NONE,
        isPlayable: gridTemplate[index][index2].hasGem,
      };
    }),
  );

export default gridTemplate => {
  const init = [...initialTemplate(gridTemplate)];

  for (let indexLine = 0; indexLine < gridTemplate.length; indexLine++) {
    for (let index = 0; index < gridTemplate[indexLine].length; index++) {
      if (gridTemplate[indexLine][index].gemType) {
        init[indexLine][index].gemType = gridTemplate[indexLine][index].gemType;
        continue;
      }

      if (gridTemplate[indexLine][index].hasGem) {
        const prevLineItem = init[indexLine - 2]?.[index]?.gemType;
        const prevColItem = init[indexLine]?.[index - 2]?.gemType;
        const omittedTypes = _.omit(GEM_TYPES, [
          prevLineItem,
          prevColItem,
          GEM_TYPES.NONE,
          GEM_TYPES.SUPER,
        ]);
        init[indexLine][index].gemType = randomProperty(omittedTypes);
      }
    }
  }

  return init;
};
