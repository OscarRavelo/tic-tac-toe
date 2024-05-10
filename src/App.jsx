import { useState } from "react";
import confetti from "canvas-confetti";
import Square from "./components/Square";
import { TURNS } from "./constants";
import { WINNER_COMBOS } from "./constants";
import "./App.css";

// eslint-disable-next-line react/prop-types
function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X);

  // eslint-disable-next-line no-unused-vars
  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null;
  };

  const resetGame = () => {
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
        <p>
          <Square isSelected={turn === TURNS.X}> {TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}> {TURNS.O}</Square>
        </p>
      </section>
      {winner !== null && (
        <section className="winner">
          <div className="text">
            <h2>{winner === false ? "drawn" : "The winner is "}</h2>
          </div>

          <header className="win">{winner && <Square>{winner}</Square>}</header>

          <footer>
            <button onClick={resetGame}>Empezar de nuevo</button>
          </footer>
        </section>
      )}
    </main>
  );
}

export default App;
