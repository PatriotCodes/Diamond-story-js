class Coordinates {
  x = null;
  y = null;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  isEqual(coordinates) {
    return this.x === coordinates.x && this.y === coordinates.y;
  }

  isWithingBounds(cols, rows) {
    return this.x >= 0 && this.x < cols && this.y >= 0 && this.y <= rows;
  }

  isAdjacent(coordinates) {
    if (
      this.x - coordinates.x <= 1 &&
      this.x - coordinates.x >= -1 &&
      this.y - coordinates.y <= 1 &&
      this.y - coordinates.y >= -1
    ) {
      if (!this.isDiagonalAdjacent(coordinates)) {
        return true;
      }
    }
    return false;
  }

  isDiagonalAdjacent(coordinates) {
    if (this.x - coordinates.x === this.y - coordinates.y) return true;
    return this.x + this.y === coordinates.x + coordinates.y;
  }
}

export default Coordinates;
