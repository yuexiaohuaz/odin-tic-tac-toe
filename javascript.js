//global function with all the ifno, and then a function call at end
//create the gameboard with cells corresponding with 1-9. 
//to place something, the palyers type in a number from 1-9.
//computer will use random to select a square to place their piece
//computer function triggers after player function, wiht a small delay?
//in game function, once a win is detected (an object)
/* In gameboard function, generate teh grid. create a method
that the ui can use to get the board
then we have another function that will take the number the player chooses
and put a mark for that square there. if it already has a number there, return 
"that does not work".
also a printboard function that prints board to UI
const printBoard = () => {
    const boardWithCellVallues = board.map((row) => row.map((cell) => cell.getValue()));
    console.log(boardWithCellValues);
    }
then return the interface. return the entire board, what happens after
entering anumber, then print the baord.
*/ 
/* In each cell, have the number inside it be a value and changed whenever 
the palyer enteres a number to the player's value. also have a getter that 
returns the value inside the cell.
the cell method should return the getting value and adding a token.
 */
/*
For the actual game,
first create two players (at first it will have no user input)
create a baord object using gameboard and give tokens to the players. store in array?
let the active player be the first one (say let activePlayer = players[0])
then create a method that gets the active player
add a method that switches whose turn it is (use ? : format)
every round repreint the board lol using a method

create a function for actually playing a round--where the parameter
is the number that you're marking the spot. log where you drop and then
use the method from the board

 */
//AT FIRST IGNORE USER INPUT. you can callf ucntions and pass argments to them to play the game

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
        const boardWithCellValues = board.map((cell) => cell.getValue());
        console.log(boardWithCellValues);
        
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
    const playRound = (piecePlaced) => {
        console.log(piecePlaced);
        board.placePiece(piecePlaced, getActivePlayer().token);
        switchActivePlayer();
        printNewRound();
    }
    printNewRound();
    return {playRound, getActivePlayer};
}
const game = playGame();