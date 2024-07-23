const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const restartButton = document.getElementById('restartButton');
let currentTurn = 'X';
let isGameOver = false;

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

function startGame() {
    isGameOver = false;
    currentTurn = 'X';
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.innerText = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
}

function handleClick(e) {
    const cell = e.target;
    if (cell.innerText !== '' || isGameOver) return;
    
    const currentClass = currentTurn === 'X' ? 'x' : 'o';
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.innerText = currentTurn;
    cell.classList.add(currentClass);
}

function swapTurns() {
    currentTurn = currentTurn === 'X' ? 'O' : 'X';
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
}

function endGame(draw) {
    isGameOver = true;
    if (draw) {
        alert('Draw!');
    } else {
        alert(`${currentTurn} Wins!`);
    }
}

restartButton.addEventListener('click', startGame);

startGame();
