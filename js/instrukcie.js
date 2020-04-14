class Instrukcie{
    constructor(eventHandler, statesManager){
        this.buttonMenu = new Button({x: 50, y: 620},{x: 150, y: 60}, "Menu", "white", "black","40px Arial");
        this.buttonMenu.action = ()=>{
            Sounds.klik.play();
            flag = 0;
            this.statesManager.changeState();   
        }
        this.statesManager = statesManager;
        this.eventHandler = eventHandler;
    }

    init(){
        
    }

    update(){
        this.buttonMenu.update(this.eventHandler.mouseX, this.eventHandler.mouseY);
        this.eventHandler.mouseY = -1;
        this.eventHandler.mouseX = -1;
    }

    draw(){
        this.drawBackground();
        this.buttonMenu.draw();

    }

    
    drawBackground(){
        Canvas.context.save();
        Canvas.context.translate(0, 0); 
        Canvas.context.drawImage(Sprites.instrukcie, 0, 0 ); 
        Canvas.context.restore();
    }
    
   
}

class GameOver extends Instrukcie{
    constructor(eventHandler, statesManager){
        super(eventHandler, statesManager);
        this.buttonMenu = new Button({x: 50, y: 50},{x: 150, y: 60}, "Menu", "white", "black","40px Arial");
        this.buttonMenu.action = ()=>{
            Sounds.klik.play();
            flag = 0;
            this.statesManager.changeState();   
        }
        this.statesManager = statesManager;
        this.eventHandler = eventHandler;
    }

    init(){
        Sounds.ingameMusic.pause();
        this.grafP1 = new Timer({x:380, y: 500},{x:100,y:-5 -Score.p1/(Score.p1 + Score.p2)*350}, "brown");
        this.grafP2 = new Timer({x: 790, y: 500},{x:100,y:-5 -Score.p2/(Score.p1 + Score.p2)*350}, "green");
    }

    draw(){
        this.drawBackground();
        this.buttonMenu.draw();
        this.grafP1.drawBar(Score.p1);
        this.grafP2.drawBar(Score.p2);
        Canvas.context.save();
        Canvas.context.fillStyle = "white";
        Canvas.context.font = "40px Arial";
        Canvas.context.textAlign = "center";
        if(Score.p1 > Score.p2){
            Canvas.context.fillText("Player 1 wins!", 608, 100);
        } else if(Score.p1 < Score.p2){
            Canvas.context.fillText("Player 2 wins!", 608, 100);
        } else Canvas.context.fillText("Draw!", 608, 100); 
        Canvas.context.restore();
        
    }

    drawBackground(){
        Canvas.context.save();
        Canvas.context.drawImage(Sprites.menu, 0, 0 );
        Canvas.context.fillStyle = "rgba(0, 0, 0, 0.4 )";
        Canvas.context.fillRect(0,0,1216, 720); 
        Canvas.context.fillStyle = "white";
        Canvas.context.font = "20px Arial";
        Canvas.context.fillText("Player 1",395,700);
        Canvas.context.fillText("Player 2",811,700);
        Canvas.context.translate(400,550);
        Canvas.context.drawImage(Sprites.tankIMG,0, 0 ); 
        Canvas.context.translate(416, 0);
        Canvas.context.drawImage(Sprites.tank2IMG, 0, 0 ); 
        Canvas.context.restore();

    }



}
