export const saveLocalStorage = (newBoard, newTurn, newWinner) => {
  window.localStorage.setItem("board", JSON.stringify(newBoard));
  window.localStorage.setItem("turn", JSON.stringify(newTurn));

  if (newWinner) {
    window.localStorage.setItem("winner", JSON.stringify(newWinner));
  } else {
    window.localStorage.setItem("winner", JSON.stringify(newWinner));
  }
};

export const resetLocalStorage = () => {
  window.localStorage.removeItem("board");
  window.localStorage.removeItem("turn");
  window.localStorage.removeItem("winner");
};
