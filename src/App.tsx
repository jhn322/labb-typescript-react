import { useState, useEffect } from "react";

interface GameState {
  player: string | null;
}

const App = () => {
  const [gameState, setGameState] = useState<GameState[]>(
    Array(9).fill({ player: null })
  );
  const [currentPlayer, setCurrentPlayer] = useState<string>("X");
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    if (gameOver && winner) {
      alert(winner + " You Won!");
    } else if (gameOver) {
      alert("It's a draw womp womp");
    }
  }, [gameOver, winner]);

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

  const checkWin = (player: string): boolean => {
    return winConditions.some((pattern) =>
      pattern.every((index) => gameState[index].player === player)
    );
  };

  const checkDraw = (): boolean => {
    return gameState.every((square) => square.player !== null);
  };

  const resetGame = (): void => {
    setGameState(Array(9).fill({ player: null }));
    setCurrentPlayer("X");
    setGameOver(false);
    setWinner(null);
  };

  const squareClicked = (index: number): void => {
    if (gameState[index].player !== null || gameOver) {
      alert("Pick another square; this one is occupied or the game is over.");
      return;
    }

    const newGameState = [...gameState];
    newGameState[index] = { player: currentPlayer };
    setGameState(newGameState);

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");

    if (checkWin(currentPlayer)) {
      setGameOver(true);
      setWinner(currentPlayer);
    } else if (checkDraw()) {
      setGameOver(true);
    }
  };

  return (
    <div className="board">
      {gameState.map((square, index) => (
        <div
          key={index}
          className="square"
          onClick={() => squareClicked(index)}
        >
          {square.player}
        </div>
      ))}
      {gameOver && <button onClick={resetGame}>Start New Game</button>}
    </div>
  );
};

export default App;
