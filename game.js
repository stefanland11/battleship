import Player from './player.js'



export default function game () {
    const playerOne = new Player("human");
    const playerTwo = new Player("cpu");

    playerOne.board.populateBoard();
    playerTwo.board.populateBoard();

    const playerOneDiv = document.querySelector('.player-board');
    const playerTwoDiv = document.querySelector('.cpu-board');
    createBoard(playerOne.board.map, playerOneDiv);
    createBoard(playerTwo.board.map, playerTwoDiv);
    console.log(playerOne.board);

}

function createBoard(array, div){
    array.forEach((row) => {
        let rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
        div.appendChild(rowDiv);
        row.forEach((col) => {
            let square = document.createElement('div');
            square.classList.add('square');
            rowDiv.appendChild(square);
            if(col == true){
                square.classList.add('occupied');
            }
        })
    })
}
