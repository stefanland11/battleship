import { Ship } from './ship.js'; 

export class Gameboard {
    constructor(){
        this.map = Array(10).fill().map(() => 
            Array(10).fill(false));
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
                    newCoords.forEach((coord) => {
                        ship.coordinates.push(coord);
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
        let hit = false;
        this.ships.forEach((ship) => {
            ship.coordinates.forEach((coordinate) => {
                if(coords[0] == coordinate[0] && coords[1] == coordinate[1]){
                    ship.hit();
                    ship.isSunk();
                    hit = true;
                }
            })
        })

        
        //if(hit == false){
          //  this.map[coords[0]][coords[1]] = "miss";
        //}
        return hit;
    }

    
    //confirm space isn't hit
    //set that space to missed
    checkGameOver(){
        let shipCount = 0;
        this.ships.forEach((ship) => {
            if(ship.isSunk()) {
                shipCount++;
            }

        })

        if(shipCount == 5){
            this.gameOver = true;
        }
    }
}





    
