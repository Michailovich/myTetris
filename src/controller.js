export default class Controller{
    constructor(game, view) {
        this.game = game;
        this.view = view;
        this.isPlaying = false;
        this.intervalID = null;

        

        document.addEventListener('keydown',this.handleKeyDown.bind(this));
        document.addEventListener('keyup',this.handleKeyUp.bind(this));

        this.view.renderStartScreen();
    };

    play(){
        this.isPlaying = true;
        this.startTimer();
        this.updateView();
    }

    pause(){
        this.isPlaying = false;
        this.stopTimer();
        this.updateView();
    }

    reset(){
        this.game.reset();
        this.play()
    }
    startTimer(){
        const speed = 1000 - this.game.getState().level * 100;

        if(!this.intervalID){
            this.intervalID = setInterval(()=>{
                this.game.moveFigureDown();
                this.updateView();
            },speed > 0 ? speed : 100)
        }
    }

    stopTimer(){
        if(this.intervalID){
            clearInterval(this.intervalID);
            this.intervalID = null;
        }
    }

    updateView(){
        const state = this.game.getState();

        if(state.isGameOver){
            this.view.renderEndScreen(state)
        }else if(!this.isPlaying){
            this.view.renderPauseScreen()
        } else{
            this.view.renderMainScreen(state)
        }
    }

    handleKeyDown(e){
        const state = this.game.getState();

        switch(e.keyCode){
            case 13:
                if(state.isGameOver){
                    this.reset();
                }else if(this.isPlaying){
                    this.pause()
                }else{
                    this.play();
                }
                break;
            case 37:
                this.game.moveFigureLeft();
                this.updateView()
                break;
            case 38:
                this.game.rotateFigure();
                this.updateView()
                break;
            case 39:
                this.game.moveFigureRight();
                this.updateView()
                break;
            case 40:
                this.stopTimer();
                this.game.moveFigureDown();
                this.updateView()
                break;
        }
    }

    handleKeyUp(e){
        switch(e.keyCode){
            case 40:
                this.startTimer();
                break;
        }
    }
}