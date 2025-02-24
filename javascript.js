function gameBoard() {
    let board = [];
    const rows = 3;
    const columns = 3;
    for (let i = 0; i < (rows * columns); i++) { 
        //creates board whose size can be changed by changing the values of 
        //rows and columns
        board.push(cell()); //making each part of the bpard a cell
    };
    const getBoard = () => board;
    const placePiece = ((piecePlaced, player) => {
        if(board[piecePlaced].getValue() == 0) {
            board[piecePlaced].addPiece(player);
        } 
        else {
            return; 
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
    playerOneName = "Player One";
    playerTwoName = "Player Two";
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
        console.log(`${getActivePlayer().name}'s turn.`)

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
                return `${getActivePlayer().name} has won!`;
            } 
        }
        if (boardElements.filter(item => item == 0).length == 0) {
            return "Tie!";
        }
    }
    const playRound = (piecePlaced) => {
        console.log(piecePlaced);
        board.placePiece(piecePlaced, getActivePlayer().token);
        checkGameWon();
        switchActivePlayer();
        printNewRound();
        
    }
    printNewRound();
    return {playRound, getActivePlayer, checkGameWon};
}

function screenController() {
    const game = playGame();
    const updateScreen = () => {
        //sets .board's div to empty
        //gets board from game controller and active player
        //renders the player's turn (informs them on the turn div)
        //render each grid square on the DOM. each cell is a button.
    }
    const addMark = () => {
        //trigger this on event listener
    }
}

