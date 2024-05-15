import Square from "./Square";
// eslint-disable-next-line react/prop-types, no-unused-vars
export const WinnerModal = ({ winner, handleOnclick }) => (
  <section className="winner">
    <div className="text">
      <h2>{winner === false ? "drawn" : "The winner is "}</h2>
    </div>

    <header className="win">{winner && <Square>{winner}</Square>}</header>

    <footer>
      <button onClick={handleOnclick}>Empezar de nuevo</button>
    </footer>
  </section>
);
