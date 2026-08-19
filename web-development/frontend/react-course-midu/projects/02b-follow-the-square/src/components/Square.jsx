export const Square = ({ children, updateBoard, index, isSelected }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
  };
  return (
    <div id={index} onClick={handleClick} className={className}>
      {children}
    </div>
  );
};
