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

  const displayBoard = () => {
    console.log(board);
  };

  const placeMarker = (row, col, player) => {
    if (board[row][col] !== ".") return;
    board[row][col] = player.marker;
  };

  return { displayBoard, placeMarker };
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

  const playRound = (row, col) => {
    console.log(`Placing ${activePlayer.marker} in position ${row}:${col}..`);
    board.placeMarker(row, col, activePlayer);
    switchPlayer();
    printNewRound();
  };
  console.log(`Playing Tic Tak Toe\n${activePlayer.name} begins..`);
  printNewRound();

  return { playRound };
}

const game = GameController();
