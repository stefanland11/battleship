import Player from './player.js'

export default function game () {
    const playerOne = new Player("Player One", 1);
    const playerTwo = new Player("Player Two", 2);

    playerOne.board.populateBoard();
    playerTwo.board.populateBoard();

    const playerOneDiv = document.querySelector('.player-board');
    const playerTwoDiv = document.querySelector('.cpu-board');

    const footer = document.querySelector('.footer')
    const status = document.createElement('div');
    footer.appendChild(status);
    status.textContent = `${playerOne.name}'s turn.`;
    status.setAttribute('id', 'status');

    createBoard(playerOne, playerOneDiv);
    createBoard(playerTwo, playerTwoDiv);
    singlePlayerGame(playerTwoDiv, playerOne, playerTwo);

}

function twoPlayerGame(playerOneDiv, playerTwoDiv, playerOne, playerTwo) {

  
    playerOne.turn = true;
    

    //player one's turn
    playerTwoDiv.addEventListener('click', (event) => {
        if(playerOne.turn){
            humanTurn(event, playerOne, playerTwo);
        }
        
    })
    //player two's turn
    playerOneDiv.addEventListener('click', (event) => {
        if(playerTwo.turn){
            humanTurn(event, playerTwo, playerOne);
        }
        
    })
}

function singlePlayerGame(playerTwoDiv, playerOne, playerTwo) {
    playerOne.turn = true;
    let lastHitCoords = [null, null];

    playerTwoDiv.addEventListener('click', (event) => {
        if(playerOne.turn){
            humanTurn(event, playerOne, playerTwo);
            cpuTurn(playerTwo, playerOne);
        }
        
    })

}

function humanTurn(event, currentPlayer, oppositePlayer) {
    const id = event.target.id;
    const rowIndex = id.charAt(3);
    const colIndex = id.charAt(5);
    const status = document.getElementById('status');

    
    if(!event.target.classList.contains('hit') && !event.target.classList.contains('miss')){
        const attack = oppositePlayer.board.receiveAttack([rowIndex, colIndex]);
        if(attack == true){
            event.target.classList.add('hit');
            status.textContent = `${currentPlayer.name} hits at ${rowIndex}, ${colIndex}`;
            checkSunk(oppositePlayer);
            oppositePlayer.board.checkGameOver();
            if(oppositePlayer.board.gameOver == true) {
                status.textContent = `${currentPlayer.name} wins!`;
                currentPlayer.turn = false;
                oppositePlayer.turn = false;
            }
        }
        else if (attack == false){
            event.target.classList.add('miss');
            currentPlayer.turn = false;
            oppositePlayer.turn = true; 
            status.textContent = `${oppositePlayer.name}'s turn.`;
            
        }
    }
}

async function cpuTurn(currentPlayer, oppositePlayer){
    let consecutiveTurn = false; 
    let rowIndex = 0;
    let colIndex = 0;
    let prevRow = 0;
    let prevCol = 0;
    while(currentPlayer.turn){
        const status = document.getElementById('status');
        let hitSquare = null;
        let validCoordinates = false; 

        while(validCoordinates == false){
            if(consecutiveTurn == false){
                rowIndex = Math.floor(Math.random() * 10);
                colIndex = Math.floor(Math.random() * 10);
            }
            else{
                const randomNumber = Math.floor(Math.random() * 4) + 1;
                if(randomNumber == 1 && prevRow != 9) {
                    rowIndex = prevRow + 1;
                }
                if(randomNumber == 2 && prevRow != 0) {
                    rowIndex = prevRow - 1;
                }
                if(randomNumber == 3 && prevCol != 9) {
                    colIndex = prevCol + 1;
                }
                if(randomNumber == 4 && prevCol != 9) {
                    colIndex = prevCol - 1;
                }
            }
            hitSquare = document.getElementById(`b${oppositePlayer.playerNumber}r${rowIndex}c${colIndex}`);
            if(!hitSquare.classList.contains('hit') && !hitSquare.classList.contains('miss')){
                validCoordinates = true;
            }
        }


        //wait a second before attack
        await delay(1000);
        const attack = oppositePlayer.board.receiveAttack([rowIndex, colIndex]);
        if(attack == true){
            hitSquare.classList.add('hit');
            checkSunk(oppositePlayer);
            oppositePlayer.board.checkGameOver();
            status.textContent = `${currentPlayer.name} hits at ${rowIndex}, ${colIndex}`;
            if(oppositePlayer.board.gameOver == true) {
                status.textContent = `${currentPlayer.name} wins!`;
                currentPlayer.turn = false;
                oppositePlayer.turn = false;
            }
            consecutiveTurn = true;
            prevCol = colIndex;
            prevRow = rowIndex;

        }
        else if (attack == false){
            hitSquare.classList.add('miss');
            currentPlayer.turn = false;
            oppositePlayer.turn = true; 
            status.textContent = `${oppositePlayer.name}'s turn.`;
            
        }

    }
}



function createBoard(player, div){
    player.board.map.forEach((row, rowIndex) => {
        let rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
        div.appendChild(rowDiv);
        row.forEach((col, colIndex) => {
            let square = document.createElement('div');
            square.classList.add('square');
            square.setAttribute('id', "b"+player.playerNumber+"r"+rowIndex+"c"+colIndex);
            rowDiv.appendChild(square);
            if(col == true){
                square.classList.add('occupied');
            }
        })
    })
}

function delay(ms) { 
    return new Promise(resolve => setTimeout(resolve, ms)); 
} 

function checkSunk(player){
    player.board.ships.forEach((ship) => {
        if(ship.isSunk()){
            ship.coordinates.forEach((coord) => {
                const square = document.getElementById(`b${player.playerNumber}r${coord[0]}c${coord[1]}`);
                square.classList.add('sunk');
            })
       }
    })
}



//game
//create two boards with hidden coordinates.
//turn starts with player one
//each turn
//  player clicks coordinate on opposite board
//  if hit, player goes again.
// 
//  else next turn.

//end turn button makes both boards hidden
//start turn makes current players board visible, other players board invisible expect for hits and misses.

//consolidate event listener function into an actual function
//turn current function into two player function
//create logic for computer selecting random turn
//create single player function.

//log each turn in status examle A5 hit!
//wait 5 seconds after computer attack.
