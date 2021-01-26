export default (window, gridCols, gridRows) => {
  const gemSize = window.innerWidth / gridCols;
  return {
    width: gemSize * gridCols,
    height: gemSize * gridRows,
    gemSize,
  }
}