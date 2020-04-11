class Menu{
    constructor(eventHandler, statesManager){
        this.button1 = new Button({x: 408, y: 200}, {x: 400, y: 80}, "Spustiť hru","white","black","40px Arial");
        this.button1.action = ()=>{      
            Sounds.klik.play();      
            flag = 1;
            this.statesManager.changeState();
        }
        this.button2 = new Button({x: 408, y: 350},{x: 400, y: 80}, "Inštrukcie","white","black" ,"40px Arial");
        this.button2.action = ()=>{
            Sounds.klik.play();
            flag = 2;
            this.statesManager.changeState();
        }
        this.buttonSound = new Sound({x: 1100, y: 620},{x: 64, y: 64});
        this.eventHandler = eventHandler;
        this.statesManager = statesManager;
        
        
    }
    
    init(){

    }
    
    
    
    update(){
        this.button1.update(this.eventHandler.mouseX, this.eventHandler.mouseY);
        this.button2.update(this.eventHandler.mouseX, this.eventHandler.mouseY);
        this.buttonSound.update(this.eventHandler.mouseX, this.eventHandler.mouseY);
        this.eventHandler.mouseY = -1;
        this.eventHandler.mouseX = -1;
        
    }
    
    draw(){
        this.drawBackground();
        this.button1.draw();
        this.button2.draw();
        this.buttonSound.draw();

    }

    
    drawBackground(){
        Canvas.context.save();
        Canvas.context.translate(0, 0); //zachovaj poradie!!
        Canvas.context.drawImage(Sprites.menu, 0, 0 ); 
        Canvas.context.font = "100px Arial Black";
        Canvas.context.fillText("Trable s tankami", 160, 120 );
        Canvas.context.restore();
    }
    
   
}
