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
    const markBoard = (playerMarker, markPosition) => {
        board[markPosition.row][markPosition.col] = playerMarker;
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
    let moveCounter = 0;
    let activePlayer = null;
    let playerO = null;
    let playerX = null;
    
    // I need to create a 3D array so i can loop through my 2D array
    const WINNING_POSITIONS = [
        // Rows
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        // Columns
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        // Diagonals
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    // Starts the game
    const start = () => {
        playerX = createPlayer('Player X', 'X');
        playerO = createPlayer('Player O', 'O');
        
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
            name: name,
            marker: marker
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
        // moveCounter++;
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

    // Returns the winning positions if there is a winner
    const getWinner = (playerMarker) => {
        const board = gameBoard.getBoard();
        let hasWinner = false;
        const winningPosition = [];

        
        // Loops 8x -> each loop results into 2D array
        for (let i = 0; i < WINNING_POSITIONS.length; i++) {
            // Get the coordinates for every cell
            // each mark is an array containing row and col values
            // e.g., markA = [0, 0]
            // Every loop markA becomes [0, 0] from [[0, 0], [0, 1], [0, 2]]
            // markB becomes the second element [0, 1] and markC becomes the 3rd element
            // each mark represents the map
            const markA = WINNING_POSITIONS[i][0];
            const markB = WINNING_POSITIONS[i][1];
            const markC = WINNING_POSITIONS[i][2];

            // mapping every winning combo coordinate to the board 
            // to see if something matches
            // e.g., board[0, 0] && board[0, 1] && board[0, 2] is a winning position
            if (board[markA[0]][markA[1]] === playerMarker 
                && board[markB[0]][markB[1]] === playerMarker 
                && board[markC[0]][markC[1]] === playerMarker) {
                // returns a winner
                hasWinner = true;

                // store the winning position coordinate
                winningPosition.push(markA);
                winningPosition.push(markB);
                winningPosition.push(markC);
            }
        }

        return {
            hasWinner,
            winningPosition
        };
    };

    const getTie = () => {
        let hasTie = false;
        // If there is no winner and there are already 9 moves, it's a tie
        if (!getWinner.hasWinner && moveCounter === 9) {
            hasTie = true;
        }

        return hasTie;
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
        getTie,
        setPlayerMove,
        restart
    };
})();

function updateBoardUI(boardState) {
    // renders the UI
    // takes the game board model and render as the view
}

// gameBoard.markBoard('X', {row: 0, col: 0});
// gameBoard.markBoard('O', {row: 0, col: 2});
// gameBoard.markBoard('X', {row: 1, col: 0});
// gameBoard.markBoard('O', {row: 2, col: 0});
// gameBoard.markBoard('X', {row: 1, col: 1});
gameBoard.markBoard('O', {row: 0, col: 2});
gameBoard.markBoard('X', {row: 1, col: 0});
gameBoard.markBoard('X', {row: 0, col: 0});
gameBoard.markBoard('O', {row: 2, col: 0});
gameBoard.markBoard('X', {row: 1, col: 1});
gameBoard.markBoard('O', {row: 1, col: 2});
gameBoard.markBoard('X', {row: 2, col: 2});
gameBoard.markBoard('O', {row: 2, col: 1});
gameBoard.markBoard('X', {row: 0, col: 1});

console.log(gameController.getWinner('X'));
console.log(gameController.getTie());
console.log(gameBoard.getBoard());