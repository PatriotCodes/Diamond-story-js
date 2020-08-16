import arraySwap from './arraySwap';

const createsHorizontalMatch = (fromIndex, toIndex, grid, rowLength) => {
  const match = [toIndex];
  const newGrid = arraySwap(grid, fromIndex, toIndex);
  const colNum = Math.floor(toIndex / rowLength);
  let counter = 1;
  while (toIndex - counter >= colNum * rowLength) {
    if (newGrid[toIndex - counter].gemType === newGrid[toIndex].gemType) {
      match.push(toIndex - counter);
      counter++;
    } else break;
  }
  counter = 1;
  while (toIndex + counter < (colNum + 1) * rowLength) {
    if (newGrid[toIndex + counter].gemType === newGrid[toIndex].gemType) {
      match.push(toIndex + counter);
      counter++;
    } else break;
  }
  return match;
};

const createsVerticalMatch = (fromIndex, toIndex, grid, rowLength) => {
  const match = [toIndex];
  const newGrid = arraySwap(grid, fromIndex, toIndex);
  let counter = 1;
  while(toIndex - (rowLength * counter) >= 0) {
    if (newGrid[toIndex - (rowLength * counter)]?.gemType === newGrid[toIndex]?.gemType) {
      match.push(toIndex - (rowLength * counter));
      counter++;
    } else break;
  }
  counter = 1;
  while(toIndex + (rowLength * counter) <= grid.length) {
    if (newGrid[toIndex + (rowLength * counter)]?.gemType === newGrid[toIndex]?.gemType) {
      match.push(toIndex + (rowLength * counter));
      counter++;
    } else break;
  }
  return match;
};

const checkMatch = (fromIndex, toIndex, grid, rowLength) => {
  const horizontalMatch = createsHorizontalMatch(fromIndex, toIndex, grid, rowLength);
  const verticalMatch = createsVerticalMatch(fromIndex, toIndex, grid, rowLength);
  if (horizontalMatch.length >= 3 && verticalMatch.length >= 3) {
    return horizontalMatch.concat(verticalMatch);
  } else if (horizontalMatch.length >= 3) {
    return horizontalMatch;
  } else if (verticalMatch.length >= 3) {
    return verticalMatch;
  } else {
    return false;
  }
};

export default (fromIndex, toIndex, grid, rowLength) => {
  const match1 = checkMatch(fromIndex, toIndex, grid, rowLength);
  const match2 = checkMatch(toIndex, fromIndex, grid, rowLength);
  if (match1 && match2) {
    return match1.concat(match2);
  } else if (match1) {
    return match1;
  } else if (match2) {
    return match2;
  } else {
    return false;
  }
};
