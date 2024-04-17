import { useState } from "react";

// Using interface
interface GameState {
  player: string | null;
}

const App = () => {
  // State variables
  const [gameState, setGameState] = useState<GameState[]>(
    Array(9).fill({ player: null }) // Initialize the game with 9 squares
  );
  const [currentPlayer, setCurrentPlayer] = useState<string>("X"); // Set the current player as X
  const [gameOver, setGameOver] = useState<boolean>(false); // Game over as false to begin
  const [headline, setHeadline] = useState<string>("Tic Tac Toe"); // Headline by default

  // Array defining all possible win conditions
  const winConditions: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWin = (state: GameState[]): boolean => {
    // Iterating over each win condition
    for (let i = 0; i < winConditions.length; i++) {
      const winCondition = winConditions[i]; // Accessing each win condition array
      // Extracting each index from array
      const a = winCondition[0];
      const b = winCondition[1];
      const c = winCondition[2];

      // Checking if the player at positions a, b, and c are the same
      if (
        state[a].player &&
        state[a].player === state[b].player &&
        state[a].player === state[c].player
      ) {
        // If all three positions have the same player, return true (win)
        return true;
      }
    }
    return false;
  };

  // Function to check if it's a draw
  const checkDraw = (state: GameState[]): boolean => {
    for (const square of state) {
      // Checking if the square is empty
      if (!square.player) {
        // If there's an empty square, it's not a draw
        return false;
      }
    }
    return !checkWin(state); // Ensure it's not a win condition
  };

  // Function handling the clicks on squares
  const squareClicked = (index: number): void => {
    // Checking if the clicked square doesn't have a player and the game is not over
    if (!gameState[index].player && !gameOver) {
      // Creating a copy of the game state array
      const newGameState = [...gameState];
      // Assigning the current player to the clicked square
      newGameState[index] = { player: currentPlayer };

      // Checking if the current move results in a win
      if (checkWin(newGameState)) {
        // If win, set winning player, update state and end game
        const winningPlayer = currentPlayer;
        setGameState(newGameState);
        setGameOver(true);
        setHeadline(`${winningPlayer} Won!`);
      } else if (checkDraw(newGameState)) {
        // If draw, update state & end game
        setGameState(newGameState);
        setGameOver(true);
        setHeadline("It's a draw!");
      } else {
        // If still ongoing, update game state & change player
        setGameState(newGameState);
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      }
    }
  };

  // Function to reset the game
  const resetGame = (): void => {
    setGameState(Array(9).fill({ player: null })); // Resets game state
    setCurrentPlayer("X");
    setGameOver(false);
    setHeadline("Tic Tac Toe");
  };

  return (
    <div className="container">
      <h1 className="headline">{headline}</h1>
      <main className="board">
        {/* Mapping over each square in the game state */}
        {gameState.map((square, index) => (
          <div
            key={index} // Unique key for React to identify each square
            className="square"
            // Handling click event for the square
            onClick={() => {
              squareClicked(index);
            }}
          >
            {/* Displaying X or O based on player in the square */}
            {square.player === "X" && "X"}
            {square.player === "O" && "O"}
          </div>
        ))}
      </main>
      <section className="button-container">
        {/* Displaying "Start New Game" button when the game is over */}
        {gameOver && (
          <button className="button" onClick={resetGame}>
            Start New Game
          </button>
        )}
      </section>
    </div>
  );
};

export default App;
