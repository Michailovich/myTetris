export default class Game {
    scores = 0;
    lines = 0;
    level = 0;
    playfield = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ];
    activeFigure = {
        x:0,
        y:0,
        blocks:[
            [0,1,0],
            [1,1,1],
            [0,0,0]
        ]
    };

    moveFigureLeft(){
        this.activeFigure.x -= 1;
        if(this.hasCollision()){
            this.activeFigure.x +=1;
        }
    }
    
    moveFigureRight(){
        this.activeFigure.x += 1;
        if(this.hasCollision()){
            this.activeFigure.x -= 1;
        }
    }

    moveFigureDown(){
        this.activeFigure.y += 1;
        if(this.hasCollision()){
            this.activeFigure.y -= 1;
            this.lockFigure();
        }
    }

    hasCollision(){
        const playfield = this.playfield;
        const {x:figX,y:figY,blocks} = this.activeFigure;

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if(blocks[y][x] && 
                    ((playfield[figY + y] === undefined || playfield[figY + y][figX + x] === undefined)
                    ) || this.playfield[figY + y][figX + x]){
                    return true;
                }
            }
        }
        return false;
        
    }

    lockFigure(){
        const {x:figX,y:figY,blocks} = this.activeFigure;

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if(blocks[y][x]){
                    this.playfield[figY + y][figX + x] = blocks[y][x];
                } 
            }
        }
    }
}