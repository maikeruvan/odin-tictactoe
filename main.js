/* 
the game has a board with 3 rows and 3 columns
has 2 players, playerX and playerO
each player takes turn
the board is marked with X or O
a player has a name and a marker
name is playerX or playerO and marker is X or O
the game has a winner or a tie
win means if 3 lines matched vertical, horizontal or diagonal
tie if all boards are filled but no winner
*/

// IIFE -> single object - MODEL
const gameBoard = (() => {
    let board = [];

    // Builds the 2D array as the board
    for (let row = 0; row < 3; row++) {
        board.push([]);
        for (let col = 0; col < 3; col++) {
            board[row].push('');
        }
    }

    // Returns the current state of the board
    const getBoard = () => {
        // Returns a reference to the original array - unsafe
        return board;
    };

    // markPosition is an object mapping row and col value to the board
    const markBoard = (playerMark, markPosition) => {
        board[markPosition.row][markPosition.col] = playerMark;
    };

    const clearBoard = () => {
        board = [];
    };

    return {
        markBoard,
        getBoard,
        clearBoard
    };

})();

// IIFE -> Single object -> CONTROLLER
const gameController = (() => {
    let gameOver = true;
    let activePlayer = null;

    // Starts the game
    const start = () => {
        const playerX = createPlayer('Player X', 'X');
        const playerO = createPlayer('Player O', 'O');
        
        gameOver = false;
        activePlayer = playerO;
        gameBoard.clearBoard();

        // Builds the board model into the view updateBoardUI

        // Adds click listener to the board or to every column addListener()
        // When a click happens, a move was made, call setPlayerMove
        // also switchPlayer()
    };

    // Private factory function
    const createPlayer = (name, marker) => {
        return {
            name,
            marker
        };
    };

    const addListener = () => {
        
    };

    const removeListener = () => {

    };

    // Called when a click happens
    const setPlayerMove = () => {
        // finds the position marked by the player [row][col]
        // set markPosition to have row and col as the position of the move
        // gameBoard.markBoard(activePlayer.marker, markPosition);
        // switchPlayer() -> switch the next activePlayer
    };

    // Called when a click happens
    const switchPlayer = () => {
        switch (activePlayer) {
            case playerO:
                activePlayer = playerX;
                break;

            case playerX:
                activePlayer = playerO;
                break;
        }
    };

    // Returns the winning player and winning positions
    const getWinner = () => {
        const board = gameBoard.getBoard();
        const winPositions = [
            [[0]],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ];
    };

    // Reset the game
    const restart = () => {
        gameOver = true;
        activePlayer = null;
        removeListener();
        start();
    };

    return {
        start,
        addListener,
        removeListener,
        getWinner,
        setPlayerMove,
        restart
    };
})();

console.log(gameController.getWinner());

function updateBoardUI(boardState) {
    // renders the UI
    // takes the game board model and render as the view
}