import { useState } from "react";
import confetti from "canvas-confetti";
import Square from "./components/Square";
import { TURNS } from "./constants";
import { checkWinner } from "./logic/board";
import "./App.css";
import { WinnerModal } from "./components/WinnerModal";

// eslint-disable-next-line react/prop-types
function App() {
  // retrieve the localStorage
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    if (boardFromStorage) return JSON.parse(boardFromStorage);
    return Array(9).fill(null);
  });

  const [turn, setTurn] = useState(TURNS.X);

  // eslint-disable-next-line no-unused-vars
  const [winner, setWinner] = useState(() => {
    const winnerFromStorage = window.localStorage.getItem("turn");
    if (winnerFromStorage) return turn;
    return null;
  });

  const resetGame = () => {
    console.log("working");
    setBoard(Array(9).fill(null));
    setWinner(null);
    setTurn(TURNS.O);
  };

  // eslint-disable-next-line no-unused-vars
  const checkEndGame = (newboard) => {
    return newboard.every((square) => square !== null);
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // saving in local store
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", turn);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      confetti();
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <button onClick={resetGame}>Empezar de nuevo</button>
      <h1>Tic Tac Toe</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}> {TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}> {TURNS.O}</Square>
      </section>
      {console.log(winner)}
      {winner !== null && (
        <WinnerModal handleOnclick={resetGame} winner={winner} />
      )}
    </main>
  );
}

export default App;
