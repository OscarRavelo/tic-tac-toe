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

export default Square;
