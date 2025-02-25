function gameBoard() {
    let board = [];
    const rows = 3;
    const columns = 3;
    for (let i = 0; i < (rows * columns); i++) { 
        board.push(cell()); //making each part of the bpard a cell
    };
    const getBoard = () => board;
    const placePiece = ((piecePlaced, player) => {
        if(board[piecePlaced].getValue() == 0) {
            board[piecePlaced].addPiece(player);
        } 
        else {
            return; //if it's already been clicked, then update the div to say that it's been already selected.
        }

    });
    const printBoard = () => {
        //const boardWithCellValues = board.map((cell) => cell.getValue());
        //console.log(boardWithCellValues);
        console.log(board.slice(0, 3).map((cell) => cell.getValue()));
        console.log(board.slice(3, 6).map((cell) => cell.getValue()));
        console.log(board.slice(6, 9).map((cell) => cell.getValue()));
    };
    return {getBoard, placePiece, printBoard};
}
function cell() {
    let value = 0;
    const addPiece = (player) => {
        value = player;
    }
    const getValue = () => value;
    return {addPiece, getValue};
}
function playGame() {
    let gameOngoing = true;
    let playerOneName = "Player One";
    let playerTwoName = "Player Two";
    const players = [
        {name: playerOneName,
            token: "X",
        },
        {name: playerTwoName,
            token: "O",
        }
    ]; //maybe add a function to choose who goes first
    let activePlayer = players[0];
    let board = gameBoard();
    const getActivePlayer = () => activePlayer;
    const switchActivePlayer = () => {
        activePlayer = (activePlayer == players[0]) ? players[1] : players[0];
    }
    const printNewRound = () => {
        board.printBoard();
        return `${getActivePlayer().name}'s turn.`;

    }
    const checkGameWon = () => {
        const boardElements = board.getBoard().map((cell) => cell.getValue());
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for(const [a, b, c] of winConditions) {
            if (boardElements[a] == boardElements[b] && boardElements[b] == boardElements[c] && boardElements[a] != 0) {
                stopGame();
                return `${getActivePlayer().name} has won!`;
            } 
        }
        if (boardElements.filter(item => item == 0).length == 0) {
            stopGame();
            return "Tie!";
        }
        else {
            return printNewRound();
        }
    }
    const stopGame = () => {
        gameOngoing = false;
    }
    const resetGame = () => {
        gameOngoing = true;
    }
    const isGameOngoing = () => gameOngoing;
    const playRound = (piecePlaced) => {
        if (gameOngoing == true) {
            console.log(piecePlaced);
            board.placePiece(piecePlaced, getActivePlayer().token);
            checkGameWon();
            switchActivePlayer();
            printNewRound();
        } else {
            return;
        }
    }
    printNewRound();
    return {playRound, getActivePlayer, checkGameWon, isGameOngoing, resetGame};
}

function screenController() {
    const game = playGame();
    const message = document.querySelector(".message");
    let gameboard = document.querySelector(".gameboard");
    const updateScreen = () => { 
        //creates 9 buttons and adds event listeners to all
        resetScreen();
        for (let i = 0; i < 9; i++) {
            let button = document.createElement("button");
            addMark(button, i);
            gameboard.appendChild(button);
        }
        game.resetGame();
        
    }
    const resetScreen = () => {
        gameboard.innerHTML = "";
    }
    const addMark = (button, index) => {
        button.addEventListener("click", () => {
            if (game.isGameOngoing()) {
                button.textContent = `${game.getActivePlayer().token}`;
                game.playRound(index);
                message.textContent = `${game.checkGameWon()}`;
            }
            
        });
    }
    return {updateScreen};
}

const startBtn = document.querySelector(".start");
const gameController = screenController();
startBtn.addEventListener(("click"), () => {
    gameController.updateScreen();
    startBtn.textContent = "Reset";
});