class ReactManager {
  totalMoves = 0;

  constructor(react, levelConfig) {
    this.react = react;
  }

  updateMoves() {
    this.totalMoves++;
    this.react.setMoves(this.totalMoves);
  }
}

export default ReactManager;
