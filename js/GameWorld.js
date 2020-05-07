class Gameworld{
    constructor(eventHandler, statesManager){
        this.mapa1 = new Mapa();
        this.tank = new Tank({x: 100, y: 100}, 0 , {x: 25, y: 50});
        this.tank2 = new Tank2({x:1100,y:500}, 0 , {x: 25, y: 50});
        this.vybuch = new Explosion();
        this.gameBar = new GameBar({x:0, y : 10*64}, {x : 1216, y : 100 }, "rgb(224, 224, 184)");    
        this.healthBar = new HealthBar({x:350, y : 10*64 + 10 }, {x : 200, y : 40 }, "red", "P1 health");
        this.healthBar2 = new HealthBar({x:650, y : 10*64 + 10 }, {x : 200, y : 40 }, "red", "P2 health");
        this.Timer = new Timer({x:20, y : 10*64+20}, {x : 100, y : 50 }, "black");
        this.zasobnik = new Zasobnik({x:150, y : 10*64 + 10 }, {x : 102, y : 40 }, "white");
        this.zasobnik2 = new Zasobnik({x:950, y : 10*64 + 10 }, {x : 102, y : 40 }, "white");
    
    
        this.restartButton = new Button({x: 600, y: 330}, {x: 170, y: 50}, "Restart level","white","black","20px Arial");
        this.restartButton.action = () => {
            this.tank.reset({x:150,y:150});
            this.tank2.reset({x:1100,y:500});
            this.eventHandler.keyInput[80] = 0;
          
        }

        this.menuButton = new Button({x: 420, y: 330}, {x: 170, y: 50}, "Menu","white","black","20px Arial");
        this.menuButton.action = ()=>{
            flag = 0;
            this.statesManager.changeState();
        }

        this.time = Date.now();
        this.startTime = Date.now();
        this.limit  = 60;
        this.dt = 0;
        this.timeBuff = 0;

        this.eventHandler = eventHandler;
        this.statesManager = statesManager;
        this.paused = false;
    

    }

    init(){
        this.paused = false;
        this.startTime = Date.now();
        this.limit  = 60;   
        this.restartButton.action();
        this.tank.score = 0;
        this.tank2.score = 0;
        this.mapa1.level =0;
        Sounds.ingameMusic.currentTime =0;
        Sounds.ingameMusic.play();
    }

                
    update(){
        this.dt = ( Date.now()- this.time ) / 100;
        this.time = Date.now(); 
        if(!this.paused){

            this.limit  = (60 - Math.floor((this.time - this.startTime)/1000));
            if(this.limit <= 0) this.gameOver();
            
            this.tank.update(this.eventHandler.keyInput, this.dt);     
            this.tank2.update(this.eventHandler.keyInput, this.dt);
            this.CollisionCheck_Shot(this.tank.strely, this.tank2);
            this.CollisionCheck_Shot(this.tank2.strely, this.tank);
            
            if(this.CollisionCheck_Tank(this.tank) == 0 ){
                this.tank.position.x = this.tank.positionOld.x;
                this.tank.position.y = this.tank.positionOld.y;
                
            this.tank.rotation = this.tank.rotationOld;
            }
            if(this.CollisionCheck_Tank(this.tank2) == 0 ){
                this.tank2.position.x = this.tank2.positionOld.x;
                this.tank2.position.y = this.tank2.positionOld.y;

                this.tank2.rotation = this.tank2.rotationOld;
            }

            this.Death(this.tank);
            this.Death(this.tank2);
        } else{
            this.startTime+=this.dt*100;
            this.menuButton.update(this.eventHandler.mouseX, this.eventHandler.mouseY);
            this.restartButton.update(this.eventHandler.mouseX, this.eventHandler.mouseY);
        }
        this.pauseGame();
        this.eventHandler.mouseY = -1;
        this.eventHandler.mouseX = -1;
    }   
    
    draw(){
        Canvas.drawImage(Sprites.background, {x : 0, y : 0});
        this.mapa1.drawMap();
        this.tank.drawShots();
        this.tank2.drawShots();
        this.tank.draw(); 
        this.tank2.draw();
        this.gameBar.drawBar();
        this.healthBar.drawBar(this.tank.life, this.tank.maxLife);
        this.healthBar2.drawBar(this.tank2.life, this.tank2.maxLife);
        this.Timer.drawBar(this.limit);
        this.zasobnik.drawBar(this.tank.strelyCounter, this.tank.maxS);
        this.zasobnik2.drawBar(this.tank2.strelyCounter, this.tank2.maxS);
        this.drawScore();

        if(this.vybuch.counter > 0){
            this.vybuch.drawExplosion(this.vybuch.position, Math.floor(this.vybuch.counter / 3)*0.25);
            this.vybuch.counter--;
        }
        if(this.paused){
            this.drawPause();
        }

    }

    CollisionCheck_Shot(pole, tank){
        if(pole.length > 0){

            var pos = {X : 0, Y : 0};
            for(var i = 0; i < pole.length; i++){       
                pos.Y = Math.floor(pole[i].y  / this.mapa1.tileSize);
                pos.X = Math.floor(pole[i].x / this.mapa1.tileSize) ;
                if(this.mapa1.MapArray[this.mapa1.level][pos.Y][pos.X] == 1){
                    this.vybuch.counter = 20;
                    this.vybuch.position = pole[i];                    
                    
                    pole.splice(i,1);
                
                } else if(this.hitDetection(tank, pole[i]) == 1){
                    this.vybuch.counter = 20;
                    this.vybuch.position = pole[i];                    
                    tank.life--;
                    pole.splice(i,1);
                }
            }
            
        }
    }

    CollisionCheck_Tank(tank){
        var rt = {x : tank.position.x +  Math.cos(tank.rotation* Math.PI / 180)*tank.origin.x + Math.sin(tank.rotation* Math.PI / 180)*tank.origin.y 
                , y : tank.position.y + Math.sin(tank.rotation* Math.PI / 180)*tank.origin.x - Math.cos(tank.rotation* Math.PI / 180)*tank.origin.y 
            }
        var lt = {x : tank.position.x -  Math.cos(tank.rotation* Math.PI / 180)*tank.origin.x + Math.sin(tank.rotation* Math.PI / 180)*tank.origin.y 
                , y : tank.position.y - Math.sin(tank.rotation* Math.PI / 180)*tank.origin.x - Math.cos(tank.rotation* Math.PI / 180)*tank.origin.y 
            }
        var rb = {x : tank.position.x +  Math.cos(tank.rotation* Math.PI / 180)*tank.origin.x - Math.sin(tank.rotation* Math.PI / 180)*tank.origin.y 
                , y : tank.position.y + Math.sin(tank.rotation* Math.PI / 180)*tank.origin.x + Math.cos(tank.rotation* Math.PI / 180)*tank.origin.y 
            }
        var lb = {x : tank.position.x -  Math.cos(tank.rotation* Math.PI / 180)*tank.origin.x - Math.sin(tank.rotation* Math.PI / 180)*tank.origin.y 
                , y : tank.position.y - Math.sin(tank.rotation* Math.PI / 180)*tank.origin.x + Math.cos(tank.rotation* Math.PI / 180)*tank.origin.y 
            }    

        if( this.mapa1.MapArray[this.mapa1.level][Math.floor(rt.y / this.mapa1.tileSize)][Math.floor(rt.x / this.mapa1.tileSize)] == 1 ||
            this.mapa1.MapArray[this.mapa1.level][Math.floor(lt.y / this.mapa1.tileSize)][Math.floor(lt.x / this.mapa1.tileSize)] == 1 ||
            this.mapa1.MapArray[this.mapa1.level][Math.floor(rb.y / this.mapa1.tileSize)][Math.floor(rb.x / this.mapa1.tileSize)] == 1 ||
            this.mapa1.MapArray[this.mapa1.level][Math.floor(lb.y / this.mapa1.tileSize)][Math.floor(lb.x / this.mapa1.tileSize)] == 1  ){
            
            return 0 ;
            }
        }
        
        
        hitDetection(tank, raketa){ //oprav 
            var f = 0;
            
            var rt = {x : tank.position.x +  Math.cos(tank.rotation* Math.PI / 180)*tank.origin.x + Math.sin(tank.rotation* Math.PI / 180)*tank.origin.y 
                , y : tank.position.y + Math.sin(tank.rotation* Math.PI / 180)*tank.origin.x - Math.cos(tank.rotation* Math.PI / 180)*tank.origin.y 
            }
            
            var lb = {x : tank.position.x -  Math.cos(tank.rotation* Math.PI / 180)*tank.origin.x - Math.sin(tank.rotation* Math.PI / 180)*tank.origin.y 
                , y : tank.position.y - Math.sin(tank.rotation* Math.PI / 180)*tank.origin.x + Math.cos(tank.rotation* Math.PI / 180)*tank.origin.y 
            } 
    
            if(rt.x > lb.x) {
                if(rt.x>= raketa.x && lb.x <= raketa.x)  f= 1;
            } else{
                if(rt.x<= raketa.x && lb.x >= raketa.x)  f= 1;
            }

            if(f == 1 && rt.y > lb.y){
                if(rt.y>= raketa.y && lb.y <= raketa.y){
                    Sounds.vybuch.currentTime = 0;
                    Sounds.vybuch.play();
                    tank.score+=10;
                    return 1;
                }
            } else if(f == 1 && rt.y <= lb.y){
                if(rt.y<= raketa.y && lb.y >= raketa.y){
                    Sounds.vybuch.currentTime = 0;
                    Sounds.vybuch.play();
                    tank.score+=10;
                    return 1 ;   
                }     
            }
        
        return 0;
    }

    Death(tank){
        if(tank.life <=0){
            this.vybuch.counter = 40;
            this.vybuch.position = tank.position;
            tank.life = 0.01;
            tank.score+=100;
            Sounds.vybuch.play();
            this.nextLevel();
        }
    }

    pauseGame(){
        if(this.eventHandler.keyInput[80]==1){
            this.paused = true;
        
        } else {
            this.paused = false;
        }
    }
    
    gameOver(){
        if(this.tank.score > this.tank2.score) console.log("player 2 wins");
        else if(this.tank.score < this.tank2.score) console.log("player 1 wins");
        else console.log("draw");
        Score.p1 = this.tank2.score;
        Score.p2 = this.tank.score;
        flag = 3;
        this.statesManager.changeState();
    }
    
    drawPause(){
        Canvas.context.save();
        Canvas.context.fillStyle = "rgba(0,0,0,0.5)";
        Canvas.context.fillRect(400, 200, 400, 200);
        Canvas.context.fillStyle = "rgba(256,256,256,0.7)";
        Canvas.context.font = "50px Arial";
        Canvas.context.fillText("Pauza", 530,300);
        this.menuButton.draw();
        this.restartButton.draw();
        Canvas.context.restore();
    }

    drawScore(){
        Canvas.context.save();
        Canvas.context.fillStyle = "black";
        Canvas.context.fillText(this.tank2.score, 310,700);
        Canvas.context.fillText(this.tank.score, 890,700);
        Canvas.context.restore();
    }

    nextLevel(){
        if(this.mapa1.level<this.mapa1.MapArray.length-1){
            this.mapa1.level++;
        } else this.mapa1.level = 0;
        this.restartButton.action();
    }
}

Score = {};

class Singleplayer extends Gameworld{
    constructor(eventHandler, statesManager){
        super(eventHandler,statesManager);
        this.mapa1 = new Mapa();
        this.tank = new Tank({x: 100, y: 100}, 0 , {x: 25, y: 50});
        this.tank2 = new Tank_AI({x:1100,y:500}, 0 , {x: 25, y: 50},this.mapa1);
        this.vybuch = new Explosion();
        this.gameBar = new GameBar({x:0, y : 10*64}, {x : 1216, y : 100 }, "rgb(224, 224, 184)");    
        this.healthBar = new HealthBar({x:350, y : 10*64 + 10 }, {x : 200, y : 40 }, "red", "P1 health");
        this.healthBar2 = new HealthBar({x:650, y : 10*64 + 10 }, {x : 200, y : 40 }, "red", "P2 health");
        this.Timer = new Timer({x:20, y : 10*64+20}, {x : 100, y : 50 }, "black");
        this.zasobnik = new Zasobnik({x:150, y : 10*64 + 10 }, {x : 102, y : 40 }, "white");
        this.zasobnik2 = new Zasobnik({x:950, y : 10*64 + 10 }, {x : 102, y : 40 }, "white");
    
    
        this.restartButton = new Button({x: 600, y: 330}, {x: 170, y: 50}, "Restart level","white","black","20px Arial");
        this.restartButton.action = () => {
            this.tank.reset({x:150,y:150});
            this.tank2.reset({x:1100,y:500});
            this.eventHandler.keyInput[80] = 0;
          
        }

        this.menuButton = new Button({x: 420, y: 330}, {x: 170, y: 50}, "Menu","white","black","20px Arial");
        this.menuButton.action = ()=>{
            flag = 0;
            this.statesManager.changeState();
        }

        this.time = Date.now();
        this.startTime = Date.now();
        this.limit  = 60;
        this.dt = 0;
        this.timeBuff = 0;

        this.eventHandler = eventHandler;
        this.statesManager = statesManager;
        this.paused = false;

        
    

    }

    init(){
        this.time = Date.now();
        this.paused = false;
        this.startTime = Date.now();
        this.limit  = 60;   
        this.restartButton.action();
        this.tank.score = 0;
        this.tank2.score = 0;
        this.mapa1.level = 3;
        Sounds.ingameMusic.currentTime =0;
        Sounds.ingameMusic.play();
    }

    update(){
        this.dt = ( Date.now()- this.time ) / 100;
        this.time = Date.now(); 
        if(!this.paused){

            this.limit  = (60 - Math.floor((this.time - this.startTime)/1000));
            if(this.limit <= 0) this.gameOver();
            this.tank.update(this.eventHandler.keyInput, this.dt);     
            this.tank2.update(this.eventHandler.keyInput, this.dt, this.tank.position);
            console.log(this.tank2);
            this.CollisionCheck_Shot(this.tank.strely, this.tank2);
            this.CollisionCheck_Shot(this.tank2.strely, this.tank);
            
            if(this.CollisionCheck_Tank(this.tank) == 0 ){
                this.tank.position.x = this.tank.positionOld.x;
                this.tank.position.y = this.tank.positionOld.y;
                
            this.tank.rotation = this.tank.rotationOld;
           }
            if(this.CollisionCheck_Tank(this.tank2) == 0 && this.tank2.mod == 2 ){
                this.tank2.position.x = this.tank2.positionOld.x;
                this.tank2.position.y = this.tank2.positionOld.y;

                this.tank2.rotation = this.tank2.rotationOld;
            }

            this.Death(this.tank);
            this.Death(this.tank2);
        } else{
            this.startTime+=this.dt*100;
            this.menuButton.update(this.eventHandler.mouseX, this.eventHandler.mouseY);
            this.restartButton.update(this.eventHandler.mouseX, this.eventHandler.mouseY);
        }
        this.pauseGame();
        this.eventHandler.mouseY = -1;
        this.eventHandler.mouseX = -1;
    }

    draw(){
        Canvas.drawImage(Sprites.background, {x : 0, y : 0});
        this.mapa1.drawMap();
        this.tank.drawShots();
        this.tank2.drawShots();
        this.tank.draw(); 
        this.tank2.draw();
        this.gameBar.drawBar();
        this.healthBar.drawBar(this.tank.life, this.tank.maxLife);
        this.healthBar2.drawBar(this.tank2.life, this.tank2.maxLife);
        this.Timer.drawBar(this.limit);
        this.zasobnik.drawBar(this.tank.strelyCounter, this.tank.maxS);
        //this.zasobnik2.drawBar(this.tank2.strelyCounter, this.tank2.maxS);
        this.drawScore();

        if(this.vybuch.counter > 0){
            this.vybuch.drawExplosion(this.vybuch.position, Math.floor(this.vybuch.counter / 3)*0.25);
            this.vybuch.counter--;
        }
        if(this.paused){
            this.drawPause();
        }

        }
}