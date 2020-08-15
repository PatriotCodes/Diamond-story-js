export default (index1, index2, numRows) => {
  if (index1 - index2 === 1 || index2 - index1 === 1) {
    return true;
  }
  return index1 - numRows === index2 || index2 - numRows === index1;
};