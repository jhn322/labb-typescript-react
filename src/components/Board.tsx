interface BoardProps {
  gameState: { player: string | null }[];
  squareClicked: (index: number) => void;
  gameOver: boolean;
  resetGame: () => void;
}

// Props in board
const Board = ({
  gameState,
  squareClicked,
  gameOver,
  resetGame,
}: BoardProps) => {
  return (
    <main className="board">
      {/* Mapping over each square in the game state */}
      {gameState.map((square, index) => (
        <div
          key={index} // Unique key for React to identify each square
          className="square" // Handling click event for the square
          onClick={() => {
            squareClicked(index);
          }}
        >
          {/* Displaying X or O based on player in the square */}
          {square.player === "X" && "X"}
          {square.player === "O" && "O"}
        </div>
      ))}
      <section className="button-container">
        {/* Displaying "Start New Game" button when the game is over */}
        {gameOver && (
          <button className="button" onClick={resetGame}>
            Start New Game
          </button>
        )}
      </section>
    </main>
  );
};

export default Board;
