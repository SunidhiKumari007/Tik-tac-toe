const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const assignmentsText = document.querySelector('.assignments');
const scorePlayer1 = document.getElementById('scorePlayer1');
const scorePlayer2 = document.getElementById('scorePlayer2');
let player1Name = "";
let player2Name = "";
let currentPlayer = 'X';
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = false;
let scores = { X: 0, O: 0 };

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function startGame() {
    // Get player names
    player1Name = document.getElementById('player1Name').value || "Player 1";
    player2Name = document.getElementById('player2Name').value || "Player 2";
    
    // Display assignments
    assignmentsText.innerText = `${player1Name} is X and ${player2Name} is O`;

    // Reset game board
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = 'X';
    statusText.innerText = `${player1Name}'s turn (X)`;
    cells.forEach(cell => {
        cell.innerText = "";
        cell.addEventListener('click', handleCellClick);
    });
}

function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-index');

    if (board[cellIndex] !== "" || !gameActive) return;

    board[cellIndex] = currentPlayer;
    event.target.innerText = currentPlayer;

    checkWinner();
    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.innerText = currentPlayer === 'X' ? `${player1Name}'s turn (X)` : `${player2Name}'s turn (O)`;
    }
}

function checkWinner() {
    let roundWon = false;

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.innerText = currentPlayer === 'X' ? `${player1Name} wins!` : `${player2Name} wins!`;
        gameActive = false;
        updateScore();
    } else if (!board.includes("")) {
        statusText.innerText = `It's a draw!`;
        gameActive = false;
    }
}

function updateScore() {
    // Update the score for the winner
    if (currentPlayer === 'X') {
        scores.X += 1;
        scorePlayer1.innerText = `${player1Name}: ${scores.X}`;
    } else {
        scores.O += 1;
        scorePlayer2.innerText = `${player2Name}: ${scores.O}`;
    }
}

function restartGame() {
    // Reset game board but keep the player names and scores
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => cell.innerText = "");
    statusText.innerText = `${player1Name}'s turn (X)`;
}