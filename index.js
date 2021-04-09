import Game from "./src/game.js";
import View from "./src/view.js";

const element = document.querySelector('#root');

const game = new Game();
const view = new View(element,480,640,20,10)

window.game = game;
window.view = view;

document.addEventListener('keydown',e =>{
    switch(e.keyCode){
        case 37:
            game.moveFigureLeft();
            view.render(game.getState());
            break;
        case 38:
            game.rotateFigure();
            view.render(game.getState());
            break;
        case 39:
            game.moveFigureRight();
            view.render(game.getState());
            break;
        case 40:
            game.moveFigureDown();
            view.render(game.getState());
            break;
    }
});