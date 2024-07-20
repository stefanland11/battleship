import { Ship } from './ship.js'; 

export class Gameboard {
    constructor(){
        this.map = Array(10).fill().map(() => 
            Array(10).fill(new Boardspace(false, false)));
        this.ships = [new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2)];
        this.gameOver = false;
    }


    

    populateBoard(){
        let placed = false;
        let newCoords = [];
        let randomRow = 0;
        let randomCol = 0;
        
        this.ships.forEach((ship) => {
            placed = false;
            while(!placed){
                newCoords = [];
                randomRow = this.randomNum();
                randomCol = this.randomNum();
                newCoords = this.calculateShipCoords(ship, newCoords, randomRow, randomCol);

               if(!this.isOccupied(newCoords)){
                    ship.coordinates.push(newCoords);
                    newCoords.forEach((coord) => {
                        this.map[coord[0]][coord[1]] = true;
                    })
                    placed = true;
                }
            }
        })
    }

    randomNum(){
            return Math.floor(Math.random() * 10); 
    }

    
    

    calculateShipCoords(ship, newCoords, randomRow, randomCol){
        let directionChoice = "";
        
        if(Math.random() < 0.5){
            directionChoice = "Horizontal";
        }
        else {
            directionChoice = "Vertical";
        }

        if(directionChoice == "Horizontal"){
            if(10 - ship.length < randomCol){
               randomCol = Math.floor(Math.random() * (10-ship.length));
                //maybe calcluate a random number between (10-length) instead
            }
            for(let i = 0; i < ship.length; i++){
                newCoords.push([randomRow, randomCol + i]);
            }
        }

        if(directionChoice == "Vertical"){
            if(10 - ship.length < randomRow){
                randomRow = Math.floor(Math.random() * (10-ship.length));
            }
        
            for(let i = 0; i < ship.length; i++){
                newCoords.push([randomRow + i, randomCol]);
            }
        }

        return newCoords;
    }
    
    isOccupied(coords){
        let occupied = false;
        coords.forEach((coord) => {
            if(this.map[coord[0]][coord[1]] == true){
                occupied = true;
            }
            if([coord[1]] != 0){
                if(this.map[coord[0]][coord[1]-1] == true){
                    occupied = true;
                }
            }

            if([coord[1]] != 9){
                if(this.map[coord[0]][coord[1]+1] == true){
                    occupied = true;
                }
            }

            if([coord[0]] != 0){
                if(this.map[coord[0]-1][coord[1]] == true){
                    occupied = true;
                }
            }

            if([coord[0]] != 9){
                if(this.map[coord[0]+1][coord[1]] == true){
                    occupied = true;
                }
            }

        })

        return occupied;
    }
    
    receiveAttack(coords){
        this.ships.forEach((ship) => {
            ship.coordinates.forEach((coordinate) => {
                if(coords[0] == coordinate[0] && coords[1] == coordinate[1]){
                    ship.hit();
                    ship.isSunk();
                }
            })
        })
    }
    
    checkGameOver(){
        let shipCount = 0;
        this.ships.forEach((ship) => {
            if(ship.sunk) {
                shipCount++;
            }

        })

        if(shipCount == 5){
            this.gameOver = true;
        }
    }
}

class Boardspace {
    constructor(filled, hit){
        this.filled = filled;
        this.hit = hit;
    }
}





//ships = [5,5,4,3,2,2]
//forEach(ship)
//let placed = false;
//while(!placed){
// let coords = [];
//pick a random row
//randomly select horizontal or vertical


//if vertical
//if(9 - length < colNum) {colNum == 10 - length};
// add coord of next row with same index
//example map[row5][col5] map [row6][col5]

//if none of coordinates are occupied, place ship, 
//placed equals true


//}

//add eventlistener at each square
// forEach ship // check if coordinates match
//if match, call .hit(); check isSunk();
//if ship is sunk, mark coordinates red.

//look up how to remove eventer lisetener after square has been clicked; 

//colNum = 9 length = 3
//9 - 3 == 6

//num = 8 length = 4 

//max = 10 - 4 = 6;
//if num is greater than max
//num == max;
//6,7,8,9
//              [4, 5]
//     [5,4]    [5, 5]      [5, 6]
//              [6, 5]
//adjacent coords = 1.[x, y - 1], 2.[x - 1, y], 3.[x + 1, y], [x, y + 1]
// 1. if on the left, add 1 to each col coord
// 2. if on top add 1 to each row
// 3. if below, subtract 1 from row
// 4. if to the right, subtract one from each col

    
/*
isNextTo(newCoords) { 
        console.log(newCoords);
        newCoords.forEach((coord, index) => {
            //left
        if([coord[1]] != 0 && coord[1] != 9 && coord[1] + newCoords.length <= 9) {
            if(this.map[coord[0]][coord[1]-1] == true){
                newCoords.forEach((coord) => {
                    console.log("ran");
                    newCoords[index][1] += 1;
                })
            }
        } 
            //right
        if([coord[1]] != 9 && coord[1] != 0 && coord[1] - newCoords.length >= 0) {
            if(this.map[coord[0]][coord[1]+1] == true){
                newCoords.forEach((coord) => {
                    console.log("ran");
                    newCoords[index][1] -= 1;
                })
            }
        }
        
            //top
        if([coord[0]] != 0 && coord[0] != 9 && coord[0] + newCoords.length <= 9) {
            if(this.map[coord[0]-1][coord[1]] == true){
                newCoords.forEach((coord) => {
                   
                    newCoords[index][0] += 1;
                })
            } 
        }    //below
        
        if([coord[0]] != 9 && coord[0] != 0 && coord[0] + newCoords.length <= 0) {
            if(this.map[coord[0]+1][coord[1]] == true){
                newCoords.forEach((coord) => {
                    newCoords[index][0] -= 1;
                })
            }
        }
        })
        console.log(newCoords);
        return newCoords;
       
        
    }
*/


    
