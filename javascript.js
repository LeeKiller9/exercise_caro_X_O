let myCanvas = document.getElementById("canvas");
let ctx = myCanvas.getContext("2d");

myCanvas.width = 500;
myCanvas.height = 500;

myCanvas.addEventListener("mouseup", getPosition);

const sprites = new Image();
sprites.src = 'Untitled.png';

const ROW = 20;
const COL = 20;
const SQ = 25;

let pos = {x: 0, y: 0};
let objPos = {row: null, col: null};
let turn = false; //false turn O ; true turn X

let board = [];
for (let i = 0; i < ROW; i++) {
    board[i] = [];
    for (let j = 0; j < COL; j++) {
        board[i][j] = "";
    }
}

for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
        drawSquare(i, j);
    }
}

function changeTurn() {
    turn = !turn;
    return turn;
}

function drawSquare(x, y) {
    ctx.strokeStyle = "gray";
    ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

function drawX(x, y) {
    ctx.beginPath();
    ctx.drawImage(sprites, 145, 52, 70, 70, x * 25 + 2, y * 25 + 2, 20, 20);
}

function drawO(x, y) {
    ctx.beginPath();
    ctx.drawImage(sprites, 225, 52, 70, 70, x * 25 + 2, y * 25 + 2, 20, 20);
}

function getPosition(posMouse) {
    pos.x = posMouse.clientX - myCanvas.getBoundingClientRect().left;
    pos.y = posMouse.clientY - myCanvas.getBoundingClientRect().top;
    objPos.col = Math.floor(pos.x / 25);
    objPos.row = Math.floor(pos.y / 25);
    if (board[objPos.row][objPos.col] === "") {
        if (turn) {
            board[objPos.row][objPos.col] = "x";
        } else {
            board[objPos.row][objPos.col] = "o";
        }
    }
    for (let i = 0; i < ROW; i++) {
        for (let j = 0; j < COL; j++) {
            drawSquare(i, j);
            if (board[j][i] === "x") {
                drawX(i, j);
            } else if (board[j][i] === "o") {
                drawO(i, j);
            }
        }
    }
    if (turn) {
        isWin("x");
    } else {
        isWin ("o");
    }
    changeTurn();
}

function isWin(check) {
    for (let i = 0; i < ROW; i++) {
        for (let j = 0; j < COL; j++) {
            if ((board[i][j] === check && board[i][j + 1] === check && board[i][j + 2] === check && board[i][j + 3] === check && board[i][j + 4] === check) ||
                (board[i][j] === check && board[i + 1][j] === check && board[i + 2][j] === check && board[i + 3][j] === check && board[i + 4][j] === check) ||
                (board[i][j] === check && board[i + 1][j + 1] === check && board[i + 2][j + 2] === check && board[i + 3][j + 3] === check && board[i + 4][j + 4] === check) ||
                (board[i][j] === check && board[i + 1][j - 1] === check && board[i + 2][j - 2] === check && board[i + 3][j - 3] === check && board[i + 4][j - 4] === check)) {
                alert(check + " win");
            }
        }
    }
}

function resetBtn() {
    ctx.clearRect(0,0,500,500);
    for (let i = 0; i < ROW; i++) {
        board[i] = [];
        for (let j = 0; j < COL; j++) {
            drawSquare(i, j);
            board[i][j] = "";
        }
    }
    turn = false;
}


