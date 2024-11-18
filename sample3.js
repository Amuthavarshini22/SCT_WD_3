const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameActive = true;


const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


function handleCellClick(e) {
    const cellIndex = e.target.dataset.index;

    if (board[cellIndex] || !gameActive) {
        return;
    }

    board[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add('taken');

    if (checkWin()) {
        statusText.textContent = ${currentPlayer} wins!;
        gameActive = false;
    } else if (board.every(cell => cell !== null)) {
        statusText.textContent = It's a draw!;
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O') {
            computerMove();
        } else {
            statusText.textContent = Player ${currentPlayer}'s turn;
        }
    }
}


function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

function computerMove() {
    const availableCells = board.map((cell, index) => (cell === null ? index : null)).filter(index => index !== null);

    if (availableCells.length > 0) {
        const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        const cell = cells[randomIndex];
        board[randomIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add('taken');

        if (checkWin()) {
            statusText.textContent = ${currentPlayer} wins!;
            gameActive = false;
        } else if (board.every(cell => cell !== null)) {
            statusText.textContent = It's a draw!;
            gameActive = false;
        } else {
            currentPlayer = 'X';
            statusText.textContent = Player ${currentPlayer}'s turn;
        }
    }
}

function restartGame() {
    currentPlayer = 'X';
    board = Array(9).fill(null);
    gameActive = true;
    statusText.textContent = Player ${currentPlayer}'s turn;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);