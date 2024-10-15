import { useState } from "react";
import GameBoard from "./components/game-board/GameBoard";
import Player from "./components/player/Player";
import Log from "./components/log/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./components/gameover/GameOver";

export type Turn = {
  square: { row: number; col: number };
  player: string;
};

function deriveActivePlayer(turns: Turn[]) {
  return turns.length % 2 === 0 ? "X" : "O";
}

export type Cell = string | null;

const initialGrid : Cell[][] = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];


function App() {
  // const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState<Turn[]>([]);
  const [players, setPlayers] = useState<{ [key: string]: string }[]>([
    { "X": "Player 1" },
    { "O": "Player 2" },
  ]);

  const currentPlayer = deriveActivePlayer(gameTurns);

  const gameBoard = [...initialGrid.map((row) => [...row])];
    
  for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;
      gameBoard[row][col] = player;
  }
  
  // check winner by comparing the current player's moves with the winning combinations

  let winner;

  for(const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol) {
      if(firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
        winner = players.find((player) => player.hasOwnProperty(firstSquareSymbol))?.[firstSquareSymbol];
      }
    }  
  }

  const isDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(row: number, col: number) {
    setGameTurns((prevTurns: Turn[]) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: {row, col}, player: currentPlayer },
        ...prevTurns
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns((prev) => []);
  }

  function handlePlayerNameChange(symbol: string, newName: string) {
    setPlayers((prev) => {
      const playerIndex = prev.findIndex((player) => player.hasOwnProperty(symbol));
      const updatedPlayers = [...prev];
      updatedPlayers[playerIndex] = { [symbol]: newName };
      return updatedPlayers;
    });
  }


  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={currentPlayer==="X"} onNameSubmit={()=>handlePlayerNameChange}/>
          <Player name="Player 2" symbol="O" isActive={currentPlayer==="O"} onNameSubmit={()=>handlePlayerNameChange} />
        </ol>
        { (winner || isDraw) && <GameOver winner={winner || ''} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      LOG
      <Log log={gameTurns}/>
    </main>
  )
}

export default App
