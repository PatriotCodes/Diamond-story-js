export default (x1, y1, x2, y2) => {
  if (((x1 - x2) <= 1 && (x1 - x2) >= -1)  &&
    ((y1 - y2) <= 1 && (y1 - y2) >= -1)) {
    if (!isDiagonalAdjacent(x1,y1,x2,y2)) {
      return true
    }
  }
  return false
}

const isDiagonalAdjacent = (x1, y1, x2, y2) => {
  if ((x1 - x2) === (y1 - y2))
    return true
  return (x1 + y1) === (x2 + y2);
}