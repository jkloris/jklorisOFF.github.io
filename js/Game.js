class Game{         
    constructor(){
    }

    init(){
        TankTrouble.StateManager = new stateManager();
    }
    
    start(){
        
        TankTrouble.init();
        TankTrouble.StateManager.init();
    
    TankTrouble.mainLoop();
    
    }

    mainLoop (){
        Canvas.clear();
        TankTrouble.StateManager.update();
        TankTrouble.StateManager.draw();        
        requestAnimationFrame(()=>TankTrouble.mainLoop()); 
    }
}


let flag = 0;
let TankTrouble = new Game();