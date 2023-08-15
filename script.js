const squares = document.querySelectorAll("div.square");
const playerToPlay = document.querySelector("span#player-to-play");
const board = document.querySelector("#board");
const body = document.querySelector("body");
const newGameButton = document.querySelector("#modal button");
const modalWinner = document.querySelector("#modal");
const congrats = document.querySelector("#modal h2");

const Gameboard = () => {
    let board = [["","","",""],
    ["","","",""],
    ["","","",""],
    ["","","",""]];
    let turn = 1;
    const player1 = "×";
    const player2 = "○";
    let winner = "";
    const getBoard = () => board;
    const isWin = (player) => {
        for(let i=1;i<=3;i++){
            winning = true;
            for(let j=1;j<=3;j++){
                if(board[i][j] != player) {
                    winning = false;
                }
            }
            if(winning) {
                winner = player;
                return true;
            }
        }
        for(let i=1;i<=3;i++){
            winning = true;
            for(let j=1;j<=3;j++){
                if(board[j][i] != player) {
                    winning = false;
                }
            }
            if(winning) {
                winner = player;
                return true;
            }
        }      
        if(board[1][1] == player && board[2][2] == player && board[3][3] == player) {
            winner = player;
            return true;
        }
        if(board[1][3] == player && board[2][2] == player && board[3][1] == player) {
            winner = player;
            return true;
        }
        return false;
    }
    const setBoard = (square) => {
        let squareId = square.id;
        let i = squareId.charAt(6);
        let j = squareId.charAt(8);

        if(turn % 2 == 1) {
            square.textContent = player1;
            board[i][j] = player1;
            if(isWin(player1)) {
                // console.log(winner + " wins");
            } 

            playerToPlay.textContent = player2;
        } else {
            square.textContent = player2;
            board[i][j] = player2;
            if(isWin(player2)) {
                // console.log(winner + " wins");
            }

            playerToPlay.textContent = player1;
        }
        turn++;
    }
    const getWinner = () => winner;
    const newGame = () => {
        for(let i=1;i<=3;i++){
            for(let j=1;j<=3;j++){
                board[i][j] = "";
            }
        }
        turn = 1;
        winner = "";
    }
    return {getBoard, setBoard, isWin, getWinner, newGame};
}
let game = Gameboard();

squares.forEach((square) => {
    square.addEventListener("click", () => {
        if(square.textContent || game.getWinner()) {
            return;
        }
        game.setBoard(square);
        if(game.getWinner()) {
            congrats.textContent = "Congrats " + game.getWinner() + " for winning the game!";
            modalWinner.classList.remove("hidden");
        }
        console.log(game.getBoard());
    })
})

newGameButton.addEventListener("click", () => {
    game.newGame();
    squares.forEach((square) => {
        square.textContent = "";
    })
    modalWinner.classList.add("hidden");
    playerToPlay.textContent = "×";
})