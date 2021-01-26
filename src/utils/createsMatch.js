import { MATCH_TYPES } from '../game/constants';
import Match from '../game/Match';
import Coordinates from '../game/Coordinates';

const createsHorizontalMatch = (gem, gameField) => {
  let counter = 1;
  const match = new Match([new Coordinates(gem.coordinates.x, gem.coordinates.y)]);
  if (gem.isPlaying()) {
    while (gem.coordinates.x - counter >= 0) {
      if (gameField[gem.coordinates.y][gem.coordinates.x - counter].gemType === gem.gemType) {
        match.addGemToMatch(gem.coordinates.x - counter, gem.coordinates.y);
      } else break;
      counter++;
    }
    counter = 1;
    while (gem.coordinates.x + counter < gameField.length) {
      if (gameField[gem.coordinates.y][gem.coordinates.x + counter].gemType === gem.gemType) {
        match.addGemToMatch(gem.coordinates.x + counter, gem.coordinates.y);
      } else break;
      counter++;
    }
  }
  return match;
};

const createsVerticalMatch = (gem, gameField) => {
  let counter = 1;
  const match = new Match([new Coordinates(gem.coordinates.x, gem.coordinates.y)]);
  if (gem.isPlaying()) {
    while (gem.coordinates.y - counter >= 0) {
      if (gameField[gem.coordinates.y - counter][gem.coordinates.x].gemType === gem.gemType) {
        match.addGemToMatch(gem.coordinates.x, gem.coordinates.y - counter);
      } else break;
      counter++;
    }
    counter = 1;
    while (gem.coordinates.y + counter < gameField[0].length) {
      if (gameField[gem.coordinates.y + counter][gem.coordinates.x].gemType === gem.gemType) {
        match.addGemToMatch(gem.coordinates.x, gem.coordinates.y + counter);
      } else break;
      counter++;
    }
  }
  return match
};

const getMatchType = match => {
  switch (match.length) {
    case 3:
      return MATCH_TYPES.match3;
    case 4:
      return MATCH_TYPES.match4;
    case 5:
      return MATCH_TYPES.match5;
    default:
      throw new Error(`inappropriate match length: ${match.length}`);
  }
};

const checkMatch = (gem1, gameField) => {
  const horizontalMatch = createsHorizontalMatch(gem1, gameField);
  const verticalMatch = createsVerticalMatch(gem1, gameField);
  if (horizontalMatch.length() >= 3 && verticalMatch.length() >= 3) {
    return new Match(horizontalMatch.gems.concat(verticalMatch.gems), MATCH_TYPES.crossMatch, gem1.coordinates);
  } else if (horizontalMatch.length() >= 3) {
    return new Match(horizontalMatch.gems, getMatchType(horizontalMatch.gems), gem1.coordinates);
  } else if (verticalMatch.length() >= 3) {
    return new Match(verticalMatch.gems, getMatchType(verticalMatch.gems), gem1.coordinates);
  } else {
    return false;
  }
};

export default (gem1, gem2, gameField) => {
  const match1 = checkMatch(gem1, gameField);
  const match2 = checkMatch(gem2, gameField);
  if (match1 && match2) {
    return [match1, match2];
  } else if (match1) {
    return [match1];
  } else if (match2) {
    return [match2];
  } else {
    return false;
  }
};
