import { Gameboard } from "./gameboard.js";

export default class player {
    constructor(name, playerNumber) {
        this.board = new Gameboard;
        this.name = name;
        this.turn = false;
        this.playerNumber = playerNumber;
    }
}