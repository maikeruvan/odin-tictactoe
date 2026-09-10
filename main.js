// TODO -> I haven't fixed types yet. Some are numbers and some are strings
// The tie also has a bug since I only account moveCounter. Must stop the click event

const boardUI = document.querySelector('.board');
const restartBtn = document.querySelector('.restart');
const winnerDisplay = document.querySelector('.winner-display');
const newGameBtn = document.querySelector('.new-game');
const playerModal = document.getElementById('player-modal');
const startGameBtn = document.getElementById('start-game');
const playerONameInput = document.getElementById('playerO-name');
const playerXNameInput = document.getElementById('playerX-name');

// IIFE -> single object - MODEL
const gameBoard = (() => {
    let board = [];

    // Builds the 2D array as the board
    const setBoard = () => {
        for (let row = 0; row < 3; row++) {
            board.push([]);
            for (let col = 0; col < 3; col++) {
                board[row].push('');
            }
        }
    };

    // Returns the current state of the board
    const getBoard = () => {
        // Returns a reference to the original array - unsafe
        // const t = [...board]; -> spread operator as creates a shallow copy only
        // console.log(t);
        // console.log(board);
        // console.log(t === board); -> false
        // console.log(t[0] === board[0]); -> true -> This was the unsafe part since board is a 2D array
        // only the outer array is shallow copied, the inner array are 
        // still reference to the arrays inside the original outer array
        // return board;
        const deepCopyOfBoard = board.map((innerArray) => {
            return [...innerArray];
        });

        // console.log(deepCopyOfBoard[0] === board[0]); -> false -> now it's a true new copy
        
        return deepCopyOfBoard;
    };

    // markPosition is an object mapping row and col value to the board
    const markBoard = (playerMarker, markPosition) => {
        // I didn't put any guard
        board[markPosition.row][markPosition.col] = playerMarker;
    };

    // I originally thought this is useless
    // but calling this ultimately only does one thing that can't be changed by
    // something from the outside
    const clearBoard = () => {
        board = [];
    };

    return {
        markBoard,
        getBoard,
        clearBoard,
        setBoard
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
        gameOver = false;
        activePlayer = playerO;

        // Builds the board state
        gameBoard.setBoard();

        updateBoardUI();
        winnerDisplay.textContent = 'Game has started!';
        newGameBtn.style.display = 'none';
        restartBtn.style.display = 'block';
    };

    const updateBoardUI = () => {
        // Not sure if this is right, but it works6 ahahah
        boardUI.innerHTML = '';

        const board = gameBoard.getBoard();

        const rowFragment = document.createDocumentFragment();

        for (let r = 0; r < board.length; r++) {
            const row = document.createElement('div');
            row.id = r;
            row.classList.add('row');
            row.dataset.row = `row-${r}`;

            for (let c = 0; c < board[r].length; c++) {
                 const column = document.createElement('div');
                 column.id = c;
                 column.classList.add('column');
                 column.dataset.column = `column-${c}`;
                 column.textContent = board[r][c];

                 row.appendChild(column);
            }

            rowFragment.appendChild(row);
        }

        boardUI.appendChild(rowFragment);
    };

    // Private factory function
    const createPlayer = (name, marker) => {
        return {
            name: name,
            marker: marker
        };
    };

    // I deleted my add and remove listener since they are useless

    const handleClick = (e) => {
        if (gameOver) {
            return;
        }

        if (!e.target.classList.contains('column')) {
            return;
        }

        setPlayerMove(e);
    };

    // Called when a click happens
    const setPlayerMove = (e) => {

        const row = e.target.closest('.row');
        const col = e.target;

        if (!col) {
            return;
        }

        if (col.textContent !== '') {
            return;
        }

        const markPosition = {
            row: Number(row.id),
            col: Number(col.id)
        };
        
        moveCounter++;
        gameBoard.markBoard(activePlayer.marker, markPosition);

        const gameWinner = getWinner(activePlayer.marker);
        const hasTie = getTie();

        if (gameWinner.hasWinner) {
            gameOver = true;
            updateBoardUI();
            showWinner(activePlayer, gameWinner.winningPosition);

            return;
        }

        if (hasTie) {
            gameOver = true;
            updateBoardUI();
            showTie();

            return;
        }
        
        switchPlayer();
        
        updateBoardUI();
    };

    const showWinner = (winningPlayer, winPosition) => {
        winnerDisplay.innerHTML = '';

        const message = document.createElement('p');
        
        message.textContent = `${winningPlayer.name} won the game!`;

        winnerDisplay.appendChild(message);
        
        for (let r = 0; r < winPosition.length; r++) {
            const cell = winPosition[r];
            const rowNum = cell[0];
            const columnNum = cell[1];

            const rowUI = document.querySelector(`[data-row=row-${rowNum}]`);
            const columnUI = rowUI.querySelector(`[data-column=column-${columnNum}]`);

            columnUI.classList.add(`winner-${winningPlayer.marker.toLowerCase()}`);
        }
    };

    const showTie = () => {
        winnerDisplay.innerHTML = '';

        const message = document.createElement('p');

        message.textContent = 'It was a TIE!';
        winnerDisplay.appendChild(message);
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
        // If there are already 9 moves, it's a tie
        if (moveCounter === 9) {
            hasTie = true;
        }

        return hasTie;
    };

    // Reset the game
    const restart = () => {
        gameOver = true;
        activePlayer = null;
        moveCounter = 0;
        gameBoard.clearBoard();
        winnerDisplay.innerHTML = '';
        start();
    };

    const isGameOver = () => {
        if (gameOver) {
            return true;
        } else {
            return false;
        }
    };

    const askPlayer = () => {
        playerModal.style.display = 'flex';
    };

    const handleNewGame = (e) => {
        if (playerONameInput.value === '' || playerXNameInput.value === '') {
            return;
        }

        playerO = createPlayer(playerONameInput.value, 'O');
        playerX = createPlayer(playerXNameInput.value, 'X');
        playerModal.style.display = 'none';
        start();
    };

    return {
        start,
        getWinner,
        getTie,
        setPlayerMove,
        restart,
        handleClick,
        updateBoardUI,
        isGameOver,
        askPlayer,
        handleNewGame
    };
})();

// Had to move them outside since as per gemini, it would cause recursion bugs
boardUI.addEventListener('click', gameController.handleClick);

newGameBtn.addEventListener('click', gameController.askPlayer);

window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        startGameBtn.click();
    }
});

restartBtn.addEventListener('click', gameController.restart);

startGameBtn.addEventListener('click', gameController.handleNewGame);

if (gameController.isGameOver()) {
    newGameBtn.style.display = 'block';
    winnerDisplay.textContent = 'No active game';
}
