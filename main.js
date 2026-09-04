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
    const board = [];

    // Builds the 2D array as the board
    for (let row = 0; row < 3; row++) {
        board.push([]);
        for (let col = 0; col < 3; col++) {
            board[row].push(col);
        }
    }

    // Returns the current state of the board
    const getBoard = () => {
        // Returns a reference to the original array - unsafe
        return board;
    };

    // Marks the board with the Player object
    const markBoard = (player) => {
        // player.getName
        // player.getMarker -> X or O
        // player.getMove -> [row][col]
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
    let gameStarted = false;

    // Starts the game
    const start = () => {
        // Clears the board first gameBoard.clearBoard()
        // Builds the board model into the view updateBoardUI
        // gameStarted = true;
        // Adds click listener to the board or to every column addListener()
        // When a click happens, a move was made, call getMove
    };

    const addListener = () => {
        
    };

    const removeListener = () => {

    };

    // Called when a click happens
    const getMove = (player, position) => {
        // returns the player who made the move
        // returns the position marked by the player [row][col]
    };

    // Reset the game
    const restart = () => {
        gameStarted = false;
        removeListener();
        start();
    };

    return {
        start,
        getMove,
        restart
    };
})();

// Factory Function returning player object
function createPlayer(name, marker) {
    return {
        name,
        marker
    };
}

function updateBoardUI() {
    // renders the UI
    // takes the game board model and render as the view
}