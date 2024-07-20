export class Ship {
    constructor(length){
        this.length = length;;
        this.timesHit = 0;
        this.coordinates = [];
    }

    hit(){
        this.timesHit++;
    }

    isSunk() {
        if(this.timesHit == this.length){
            return true;
        }
        else {
            return false;
        }
    }
}

