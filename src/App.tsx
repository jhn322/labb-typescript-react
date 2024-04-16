import { useState } from "react";

interface GameState {
  player: string | null;
}

const App = () => {
  const [gameState, setGameState] = useState<GameState[]>(
    Array(9).fill({ player: null })
  );
  const [currentPlayer, setCurrentPlayer] = useState<string>("X");

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

  return (
    <div>
      <h1>TicTacToe</h1>
    </div>
  );
};

export default App;
