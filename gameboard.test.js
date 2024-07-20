import { Gameboard } from './gameboard.js'
import { Ship } from './ship.js'

test('returns map with 5 ships', () => {
    let count = 0;
    const game = new Gameboard;
    game.populateBoard();
    game.map.forEach((row) => {
        row.forEach((col) => {
            if(col != null){
            count++;
            }
        })
    })
    expect(count).toBe(17);
})

test('the ship is sunk', () => {
    const ship = new Ship;
    ship.length = 5;
    for(let i = 0; i < 5; i++){
        ship.hit();
    }
    expect(ship.isSunk()).toBe(true);
})

test('the ship is not sunk', () => {
    const ship = new Ship;
    ship.length = 5;
    for(let i = 0; i < 3; i++){
        ship.hit();
    }
    expect(ship.isSunk()).toBe(false);
})

test('attack received and hit', () => {
    const game = new Gameboard;
    game.ships = [new Ship(5), new Ship(4)];
    game.ships[0].coordinates = [[8,1], [8,2], [8,3], [8,4], [8,5]]
    game.ships[1].coordinates = [[3, 4], [4,4], [5,4], [6,4]];
    game.receiveAttack([4,4]);
    console.log("times hit");
    

    expect(game.ships[1].timesHit).toBe(1);
})

test('attack received and missed', () => {
    const game = new Gameboard;
    game.ships = [new Ship(5), new Ship(4)];
    game.ships[0].coordinates = [[8,1], [8,2], [8,3], [8,4], [8,5]]
    game.ships[1].coordinates = [[3, 4], [4,4], [5,4], [6,4]];
    game.receiveAttack([1,4]);

    expect(game.ships[1].timesHit).toBe(0);
})