import { Gameboard } from "./gameboard.js";

export default class player {
    constructor(type) {
        this.type = type;
        this.board = new Gameboard;
    }
}