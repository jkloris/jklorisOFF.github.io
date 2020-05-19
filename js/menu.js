class Menu{
    constructor(eventHandler, statesManager){
        this.button1 = new Button({x: 408, y: 200}, {x: 400, y: 80}, "Multiplayer","white","black","40px Arial");
        this.button1.action = ()=>{      
            Sounds.klik.play();      
            flag = 1;
            this.statesManager.changeState();
        }
        this.buttonSG = new Button({x: 408, y: 300}, {x: 400, y: 80}, "Singleplayer","white","black","40px Arial");
        this.buttonSG.action = ()=>{      
            Sounds.klik.play();      
            flag = 4;
            this.statesManager.changeState();
        }
        this.button2 = new Button({x: 408, y: 500},{x: 400, y: 80}, "Inštrukcie","white","black" ,"40px Arial");
        this.button2.action = ()=>{
            Sounds.klik.play();
            flag = 2;
            this.statesManager.changeState();
        }
        this.difEasy = new Button ({x: 408, y : 400},{x: 125,y:50},"Easy", "yellow","black","20px Arial");
        this.difEasy.action = ()=> {
            Sounds.klik.play();
            this.difEasy.Bcolor = "yellow";
            this.difHard.Bcolor = "white";
            this.difAdam.Bcolor = "white"
            difficulty = 0;
        }
        this.difHard = new Button ({x: 543, y : 400},{x: 125,y:50},"Hard", "white","black","20px Arial");
        this.difHard.action = ()=> {
            Sounds.klik.play();
            this.difHard.Bcolor = "yellow";
            this.difEasy.Bcolor = "white";
            this.difAdam.Bcolor = "white"

            difficulty = 1;
        }
        this.difAdam = new Button ({x: 683, y : 400},{x: 125,y:50},"Adam's mod", "white","black","20px Arial");
        this.difAdam.action = ()=> {
            Sounds.klik.play();
            this.difHard.Bcolor = "white";
            this.difEasy.Bcolor = "white";
            this.difAdam.Bcolor = "yellow"
            difficulty = 2;
        }
        this.eventHandler = eventHandler;
        this.statesManager = statesManager;
        
        
    }
    
    init(){
        Sounds.ingameMusic.pause();
        this.difEasy.action();
        difficulty = 0;
    }
    
    
    
    update(){
        this.button1.update(this.eventHandler.mouseX, this.eventHandler.mouseY);
        this.button2.update(this.eventHandler.mouseX, this.eventHandler.mouseY);
        this.buttonSG.update(this.eventHandler.mouseX, this.eventHandler.mouseY);
        this.difEasy.update(this.eventHandler.mouseX, this.eventHandler.mouseY);
        this.difHard.update(this.eventHandler.mouseX, this.eventHandler.mouseY);
        this.difAdam.update(this.eventHandler.mouseX, this.eventHandler.mouseY);
        this.eventHandler.mouseY = -1;
        this.eventHandler.mouseX = -1;
        
    }
    
    draw(){
        this.drawBackground();
        this.button1.draw();
        this.button2.draw();
        this.buttonSG.draw();
        this.difEasy.draw();
        this.difHard.draw();
        this.difAdam.draw();

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
