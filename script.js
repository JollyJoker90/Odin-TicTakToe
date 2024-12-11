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

  const getActivePlayer = () => {
    return activePlayer;
  };

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
    if (winnerFound) {
      console.log(`${activePlayer.name} won!`);
    } else if (currentBoard.every((row) => row.every((cell) => cell !== "."))) {
      console.log("It's a tie!");
    }
  };

  const playRound = (row, col) => {
    console.log(
      `Placing ${activePlayer.marker} for ${activePlayer.name} in position ${row}:${col}..`
    );
    board.placeMarker(row, col, activePlayer);
    checkWinConditions();
    switchPlayer();
    // printNewRound();
  };
  console.log(`Playing Tic Tak Toe\n${activePlayer.name} begins..`);
  printNewRound();

  return { playRound, getBoard: board.getBoard, getActivePlayer };
}

function ScreenController() {
  const game = GameController();
  const boardDiv = document.querySelector(".game-board");

  const handleInterfaceInput = (e) => {
    if (boardDiv.classList.contains("hidden")) {
      boardDiv.classList.remove("hidden");
      e.target.textContent = "Restart";
    } else {
      // restart game
    }
  };

  document
    .querySelector(".interface-button")
    .addEventListener("click", handleInterfaceInput);

  const updateScreen = () => {
    // boardDiv.innerHTML = "";
    const board = game.getBoard();

    board.forEach((row, indexRow) => {
      row.forEach((cell, indexCol) => {
        let cellButton = document.querySelector(
          `.game-board button[data-row="${indexRow}"][data-col="${indexCol}"]`
        );
        if (!cellButton) {
          cellButton = document.createElement("button");
          cellButton.setAttribute("data-row", indexRow);
          cellButton.setAttribute("data-col", indexCol);
          cellButton.addEventListener("click", () => {
            const currentPlayer = game.getActivePlayer();
            game.playRound(indexRow, indexCol);
            cellButton.classList.add(currentPlayer.marker);
            cellButton.disabled = true;
            updateScreen();
          });
          boardDiv.append(cellButton);
        }
        cellButton.textContent = cell;
      });
    });
  };

  updateScreen();
}

// const game = GameController();
ScreenController();
