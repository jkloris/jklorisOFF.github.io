class stateManager{
    constructor(){
        this.currentState = null;
        this.states = {};
        
    }
    eventHandler = {
        keyInput : [],
        mouseX : -1,
        mouseY: -1,
    };

    init(){
        this.input_init();
        this.states = {
        
            GameWorld : new Gameworld(this.eventHandler, this),
            SinglePlayer : new Singleplayer(this.eventHandler, this),
            mainMenu  : new Menu(this.eventHandler, this),
            instrukcie : new Instrukcie(this.eventHandler, this),
            gameOver : new GameOver(this.eventHandler, this),
        };
        this.currentState = this.states.mainMenu;
        this.buttonSound = new Sound({x: 1140, y: 650},{x: 64, y: 64});
    }

    update(){
        this.buttonSound.update(this.eventHandler.mouseX, this.eventHandler.mouseY);
        this.currentState.update();
    }

    draw(){
        this.currentState.draw();    
        this.buttonSound.draw();
    }

    changeState(){
        if(flag == 0) this.currentState = this.states.mainMenu;  //mozno pridat do konstanty string
        if(flag == 1) this.currentState = this.states.GameWorld;
        if(flag == 2) this.currentState = this.states.instrukcie;
        if(flag == 3) this.currentState = this.states.gameOver;
        if(flag == 4) this.currentState = this.states.SinglePlayer;
        this.currentState.init();
    }

    input_init(){
        document.addEventListener('keydown', (event)=> {
            event.preventDefault();
            if(event.keyCode == 37) {
                this.eventHandler.keyInput[37] = 1;
            }
            if(event.keyCode == 39) {
                this.eventHandler.keyInput[39] = 1;
            } 
            if(event.keyCode == 38){
                this.eventHandler.keyInput[38] = 1;
            }
            if(event.keyCode == 40){
                this.eventHandler.keyInput[40] = 1;
            } 
            if(event.keyCode == 65){
                this.eventHandler.keyInput[65] = 1;
            }
            if(event.keyCode == 68){
                this.eventHandler.keyInput[68] = 1;
            }
            if(event.keyCode == 87){
                this.eventHandler.keyInput[87] = 1;
            }
            if(event.keyCode == 83){
                this.eventHandler.keyInput[83] = 1;
            }
            
        });

        

        document.addEventListener('keyup', (event)=> {
            if(event.keyCode == 37) {
                this.eventHandler.keyInput[37] = 0;
            }
            if(event.keyCode == 39) {
                this.eventHandler.keyInput[39] = 0;
            } 
            if(event.keyCode == 38){
                this.eventHandler.keyInput[38] = 0;
            }
            if(event.keyCode == 40){
                this.eventHandler.keyInput[40] = 0;
            } 
            if(event.keyCode == 77){
                this.eventHandler.keyInput[77] = 1;
            }
            if(event.keyCode == 65){
                this.eventHandler.keyInput[65] = 0;
            }
            if(event.keyCode == 68){
                this.eventHandler.keyInput[68] = 0;
            }
            if(event.keyCode == 87){
                this.eventHandler.keyInput[87] = 0;
            }
            if(event.keyCode == 83){
                this.eventHandler.keyInput[83] = 0;
            }
            if(event.keyCode == 81){
                this.eventHandler.keyInput[81] = 1;
            }
            if(event.keyCode == 80 && this.eventHandler.keyInput[80] != 1){
                this.eventHandler.keyInput[80] =1;
            } else if(event.keyCode == 80 && this.eventHandler.keyInput[80] == 1){
                this.eventHandler.keyInput[80] = 0;
            }
        });
        
        document.addEventListener("click",(e)=>{
            this.eventHandler.mouseX = e.clientX;
            this.eventHandler.mouseY = e.clientY; 
        })
    }


}

document.onload(loadAssets(TankTrouble.start));