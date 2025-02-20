const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field){
        this.field = field;
        this.playerX = 0;
        this.playerY = 0;
    }
    print(){
        this.field.forEach(arr => {
            console.log(arr.join(''));
        });
    }
    isInBound(x, y){
        return x >= 0 && x < this.field.length && y >= 0 && y <= this.field[0].length;
    }
    movePlayer(direction){
        let newX = this.playerX;
        let newY = this.playerY;
        direction = direction.toLowerCase();
        switch(direction){
            case 'w':{
                newY -= 1;
                break;
            }
            case 'd':{
                newX += 1;
                break;
            }
            case 's': {
                newY += 1;
                break;
            }
            case 'a': {
                newX -= 1;
                break;
            }
            default: {
                console.log("Wrong input. Ony W S D A");
                return;
            }
        }

        if(this.isInBound(newX, newY)){
            this.playerX = newX;
            this.playerY = newY;

            if(this.field[this.playerY][this.playerX] == hole){
                console.log("You landed on a hole. YOU LOSE !!!!!");
                return false;
            }
            if(this.field[this.playerY][this.playerX] == hat){
                console.log("You Win ! Congrats");
                return false;
            }

            this.field[this.playerY][this.playerX] = pathCharacter;
            this.print();
            return true;
        }
        else{
            console.log("Out of bound. Try again!");
            return true;
        }
    }
    static generateField(height, width, percentage){
        let newField = [];
        for(let i = 0; i < height; i++){
            newField.push([]);
            for(let j = 0; j < width; j++){
                newField[i].push(fieldCharacter);
            }
        }

        //Find the position for hat
        let hatX, hatY;
        do{
            hatX = Math.floor(Math.random() * (width));
            hatY = Math.floor(Math.random() * (height));
        }
        while(hatX === 0 && hatY === 0);

        newField[hatX][hatY] = hat;
        newField[0][0] = pathCharacter;

        //Find the position for holes
        let holeNumber = Math.floor(width * height * percentage);
        let holeX, holeY;

        for(let i = 0; i < holeNumber; i++){
            do{
                holeX = Math.floor(Math.random() * (width));
                holeY = Math.floor(Math.random() * (height));
            }
            while(newField[holeX][holeY] !== fieldCharacter);
            newField[holeX][holeY] = hole;
        }
        return newField;
    }
}

const playGame = (field) => {
    let playing = true;
    field.print();
    while(playing){
        let move = prompt("Which direction you want to move (W D S A)");
        playing = field.movePlayer(move);
    }

}


const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
]);
const newField = new Field(Field.generateField(3,3, 0.5));
newField.print();
