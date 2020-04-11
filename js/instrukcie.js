class Instrukcie{
    constructor(eventHandler, statesManager){
        this.buttonMenu = new Button({x: 50, y: 620},{x: 150, y: 60}, "Menu", "white", "black","40px Arial");
        this.buttonMenu.action = ()=>{
            Sounds.klik.play();
            flag = 0;
            this.statesManager.changeState();   
        }
        this.buttonSound = new Sound({x: 1100, y: 620},{x: 64, y: 64});
        this.statesManager = statesManager;
        this.eventHandler = eventHandler;
    }

    init(){
        
    }

    update(){
        this.buttonSound.update(this.eventHandler.mouseX, this.eventHandler.mouseY);
        this.buttonMenu.update(this.eventHandler.mouseX, this.eventHandler.mouseY);
        this.eventHandler.mouseY = -1;
        this.eventHandler.mouseX = -1;
    }

    draw(){
        this.drawBackground();
        this.buttonSound.draw();
        this.buttonMenu.draw();

    }

    
    drawBackground(){
        Canvas.context.save();
        Canvas.context.translate(0, 0); 
        Canvas.context.drawImage(Sprites.instrukcie, 0, 0 ); 
        Canvas.context.restore();
    }
    
   
}
