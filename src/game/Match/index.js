import Coordinates from '../Coordinates';
import { MATCH_TYPES } from '../constants';

class Match {
  gems = [];
  matchType = MATCH_TYPES.noMatch;
  initGem = null;

  constructor(gems, matchType, initGem) {
    this.gems = gems;
    this.matchType = matchType;
    this.initGem = initGem;
  }

  addGemToMatch(x, y) {
    this.gems.push(new Coordinates(x, y));
  }

  setType(matchType) {
    this.matchType = matchType;
  }

  length() {
    return this.gems.length;
  }
}

export default Match;
