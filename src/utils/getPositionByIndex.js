export default (index, gridRows, size) => ({
  x: (index % gridRows) * size,
  y: Math.floor(index / gridRows) * size,
});
