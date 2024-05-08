import { useState } from "react";
import "./App.css";

const TURNS = {
  X: "x",
  O: "o",
};

// eslint-disable-next-line react/prop-types
const Square = ({ children, updateBoard, index, isSelected }) => {
  const className = `square ${isSelected ? "is-selected " : ""}`;
  const handleclick = () => {
    updateBoard(index);
  };
  return (
    <div onClick={handleclick} className={className}>
      {children}
    </div>
  );
};

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X);

  // eslint-disable-next-line no-unused-vars
  const [winner, setWinner] = useState(null);

  const WINNER_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
  ];

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

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner((prevWinner) => {
        console.log("winner is : ", newWinner);
        console.log("old winner is :", prevWinner);
        return newWinner;
      });
    }
  };

  return (
    <main className="board">
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
            <button>Empezar de nuevo</button>
          </footer>
        </section>
      )}
    </main>
  );
}

export default App;
