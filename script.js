const GameBoard = () => {
  const rows = 3;
  const columns = 3;
  let board = [];
  const initializeBoard = () => {
    board = [];
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(".");
      }
    }
  };

  const getBoard = () => {
    return board;
  };

  // const displayBoard = () => {
  //   console.log(board);
  // };

  const placeMarker = (row, col, player) => {
    if (board[row][col] !== ".") return;
    board[row][col] = player.marker;
  };

  initializeBoard();

  return { getBoard, placeMarker, initializeBoard };
};

function Player(name, marker) {
  const setName = (n) => {
    name = n;
  };
  return { name, marker, setName };
}

function GameController() {
  const board = GameBoard();
  const players = [Player("Player1", "x"), Player("Player2", "o")];
  let winner;

  let activePlayer = players[0];

  const getActivePlayer = () => {
    return activePlayer;
  };

  // const printNewRound = () => {
  //   board.displayBoard();
  // };

  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const checkWinConditions = () => {
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
      // console.log(`${activePlayer.name} won!`);
      winner = activePlayer.name;
    } else if (currentBoard.every((row) => row.every((cell) => cell !== "."))) {
      // console.log("It's a tie!");
      winner = activePlayer.name;
    }
  };

  const playRound = (row, col) => {
    // console.log(
    //   `Placing ${activePlayer.marker} for ${activePlayer.name} in position ${row}:${col}..`
    // );
    board.placeMarker(row, col, activePlayer);
    checkWinConditions();
    switchPlayer();
  };

  const restart = () => {
    board.initializeBoard();
  };

  const getWinner = () => {
    return winner;
  };

  const renamePlayer = (index, name) => {
    players[index].name = name;
  };

  return {
    playRound,
    getBoard: board.getBoard,
    getActivePlayer,
    restart,
    getWinner,
    renamePlayer,
  };
}

function ScreenController() {
  const game = GameController();
  const boardDiv = document.querySelector(".game-board");
  const message = document.querySelector(".interface-message");

  const handleInterfaceInput = (e) => {
    if (boardDiv.classList.contains("hidden")) {
      boardDiv.classList.remove("hidden");
      message.textContent = `${game.getActivePlayer().name}'s turn..`;
      e.target.textContent = "Restart";
    } else {
      boardDiv.innerHTML = "";
      game.restart();
      updateScreen();
    }
  };

  const handleUserNameChange = (e) => {
    game.renamePlayer(e.target.dataset.index, e.target.value);
  };

  document
    .querySelector(".interface-button")
    .addEventListener("click", handleInterfaceInput);

  document
    .querySelectorAll(".player-names input")
    .forEach((input) => input.addEventListener("change", handleUserNameChange));

  const updateScreen = () => {
    const board = game.getBoard();

    if (!boardDiv.classList.contains("hidden"))
      message.textContent = `${game.getActivePlayer().name}'s turn..`;
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

ScreenController();
