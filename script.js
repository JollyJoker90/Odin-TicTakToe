const GameBoard = () => {
  const rows = 3;
  const columns = 3;
  board = [];
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(".");
    }
  }

  const getBoard = () => {
    return board;
  };

  const displayBoard = () => {
    console.log(board);
  };

  const placeMarker = (row, col, player) => {
    if (board[row][col] !== ".") return;
    board[row][col] = player.marker;
  };

  return { getBoard, displayBoard, placeMarker };
};

function Player(name, marker) {
  return { name, marker };
}

function GameController() {
  const board = GameBoard();
  const players = [Player("Player1", "x"), Player("Player2", "o")];

  let activePlayer = players[0];

  const printNewRound = () => {
    board.displayBoard();
  };

  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const checkWinConditions = () => {
    // console.log(board.getBoard());
    let currentBoard = board.getBoard();
    let winnerFound =
      currentBoard.some((row) =>
        row.every((cell) => cell === activePlayer.marker)
      ) ||
      currentBoard.every((row) => row[0] === activePlayer.marker) ||
      currentBoard.every((row) => row[1] === activePlayer.marker) ||
      currentBoard.every((row) => row[2] === activePlayer.marker) ||
      (currentBoard[0][0] === activePlayer.marker &&
        currentBoard[1][1] === activePlayer.marker &&
        currentBoard[2][2] === activePlayer.marker) ||
      (currentBoard[2][0] === activePlayer.marker &&
        currentBoard[1][1] === activePlayer.marker &&
        currentBoard[0][2] === activePlayer.marker);
    if (winnerFound) console.log(`${activePlayer.name} won!`);
    if (currentBoard.every((row) => row.every(cell !== ".")))
      console.log("It's a tie!");
  };

  const playRound = (row, col) => {
    console.log(
      `Placing ${activePlayer.marker} for ${activePlayer.name} in position ${row}:${col}..`
    );
    board.placeMarker(row, col, activePlayer);
    checkWinConditions();
    switchPlayer();
    printNewRound();
  };
  console.log(`Playing Tic Tak Toe\n${activePlayer.name} begins..`);
  printNewRound();

  return { playRound };
}

function ScreenController() {
    
}

const game = GameController();
