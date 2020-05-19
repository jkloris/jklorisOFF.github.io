class Tank{
    constructor(position, rotation, origin){
        this.position = position;
        this.rotation = rotation;
        this.origin = origin; //polovičky strán
        //this.firedB = false;
        this.pressedT = 0;
        this.speed = 20;
        this.speedR = 20;
        this.maxLife = 10;
        this.life = this.maxLife;
        this.score = 0;
        
        this.strely = [];
        this.strelyCounter = 0;
        this.speedS = 8 ;
        this.maxS = 5;
        this.reload = 0;

        this.positionOld = {x : 0, y : 0};
        this.rotationOld = 0;
        
    }

    
    update(keyInput, dt){
        this.posun(keyInput, dt);
        //this.pressedT = Date.now();

        if(this.rotation >360) this.rotation = 0;   
        this.updateShots(dt);     
    }

    
    

    draw (){
        Canvas.context.save();
        Canvas.context.translate(this.position.x, this.position.y); //zachovaj poradie!!
        Canvas.context.rotate(Math.floor(this.rotation)  *Math.PI/180);
        Canvas.context.drawImage(Sprites.tankIMG, -this.origin.x , -this.origin.y ); 
        Canvas.context.fillStyle = "rgba(0,0,0,0.3)";
        //Canvas.context.fillRect(-this.origin.x , -this.origin.y, Sprites.tankIMG.width, Sprites.tankIMG.height );// hitbox 
        Canvas.context.restore();
        //this.drawCollision();
        
    }
    
    shoot(){
        if(this.strelyCounter < this.maxS){
            Sounds.shot.currentTime = 0;
            Sounds.shot.play();
            this.strely.push({x : this.position.x , y : this.position.y , r: this.rotation });
            this.strelyCounter++;
        }
    }

    updateShots(dt){
        for(var i = 0; i < this.strely.length; i++){       
            this.strely[i].x += Math.sin(this.strely[i].r * Math.PI / 180)* this.speedS ;
            this.strely[i].y -= Math.cos(this.strely[i].r* Math.PI / 180)* this.speedS;
        }
        if(this.strelyCounter >= this.maxS  ){
            this.reload += dt ;
            if (this.reload > 50){
                this.strelyCounter = 0;
            }
        }else{
            this.reload = 0
        }
    }

    drawShots(){
        for(var i = 0; i < this.strely.length; i++){
            Canvas.context.save();
            Canvas.context.translate(this.strely[i].x, this.strely[i].y); //zachovaj poradie!!
            Canvas.context.rotate(Math.floor(this.strely[i].r)  *Math.PI/180);
            Canvas.context.drawImage(Sprites.raketa, 0, 0 ); 
            Canvas.context.restore(); 
        }
    }

    drawCollision(){
        Canvas.context.fillRect(this.position.x, this.position.y, 2, 2 );

        var rt = {x : this.position.x +  Math.cos(this.rotation* Math.PI / 180)*this.origin.x + Math.sin(this.rotation* Math.PI / 180)*this.origin.y 
                , y : this.position.y + Math.sin(this.rotation* Math.PI / 180)*this.origin.x - Math.cos(this.rotation* Math.PI / 180)*this.origin.y 
            }
        var lt = {x : this.position.x -  Math.cos(this.rotation* Math.PI / 180)*this.origin.x + Math.sin(this.rotation* Math.PI / 180)*this.origin.y 
                , y : this.position.y - Math.sin(this.rotation* Math.PI / 180)*this.origin.x - Math.cos(this.rotation* Math.PI / 180)*this.origin.y 
            }
        var rb = {x : this.position.x +  Math.cos(this.rotation* Math.PI / 180)*this.origin.x - Math.sin(this.rotation* Math.PI / 180)*this.origin.y 
                , y : this.position.y + Math.sin(this.rotation* Math.PI / 180)*this.origin.x + Math.cos(this.rotation* Math.PI / 180)*this.origin.y 
            }
        var lb = {x : this.position.x -  Math.cos(this.rotation* Math.PI / 180)*this.origin.x - Math.sin(this.rotation* Math.PI / 180)*this.origin.y 
                , y : this.position.y - Math.sin(this.rotation* Math.PI / 180)*this.origin.x + Math.cos(this.rotation* Math.PI / 180)*this.origin.y 
            }    
        
        Canvas.context.fillRect(rt.x, rt.y, 2, 2 );
        Canvas.context.fillRect(lt.x, lt.y, 2, 2 );
        Canvas.context.fillRect(rb.x, rb.y, 2, 2 );
        Canvas.context.fillRect(lb.x, lb.y, 2, 2 );
    }


    posun (keyInput ,dt){
        
            if(keyInput[37] == 1) {
                this.rotationOld = this.rotation;
                this.positionOld.x =  this.position.x;
                this.positionOld.y =  this.position.y;

                this.rotation -= this.speedR * dt;
            }
            if(keyInput[39] == 1) {
                this.rotationOld = this.rotation;
                this.positionOld.x =  this.position.x;
                this.positionOld.y =  this.position.y;

                this.rotation += this.speedR * dt;
            } 
            if(keyInput[38] == 1){
                this.rotationOld = this.rotation;
                this.positionOld.x =  this.position.x;
                this.positionOld.y =  this.position.y;
                
                this.position.x += Math.sin(this.rotation * Math.PI / 180)* this.speed * dt;
                this.position.y -= Math.cos(this.rotation* Math.PI / 180)* this.speed * dt;
            }
            if(keyInput[40] == 1){
                this.rotationOld = this.rotation;
                this.positionOld.x =  this.position.x;
                this.positionOld.y =  this.position.y;

                this.position.x -= Math.sin(this.rotation * Math.PI / 180)* this.speed * dt;
                this.position.y += Math.cos(this.rotation* Math.PI / 180)* this.speed * dt;
            } 
            if(keyInput[77] == 1){
                this.shoot();
                
                keyInput[77] = 0;
            }
    }

    reset(position){
        this.rotation = 0;
        this.life = this.maxLife;
        this.position = position;
        this.strely = [];
        this.strelyCounter = 0;
    }

}



class Tank2 extends Tank{
    constructor(position, rotation, origin){
        super(position, rotation, origin);
        this.maxLife = 10;

    }

    draw (){
        Canvas.context.save();
        Canvas.context.translate(this.position.x, this.position.y); //zachovaj poradie!!
        Canvas.context.rotate(Math.floor(this.rotation)  *Math.PI/180);
        //Canvas.context.fillRect(-this.origin.x , -this.origin.y, Sprites.tankIMG.width, Sprites.tankIMG.height );// hitbox 
        Canvas.context.drawImage(Sprites.tank2IMG, -this.origin.x , -this.origin.y ); 
        Canvas.context.restore();
        //this.drawCollision();
        
    }

    

    posun (keyInput, dt){

        if( (Date.now() - this.pressedT  > 15)){

            if(keyInput[65] == 1) { 
                this.rotationOld = this.rotation;
                this.positionOld.x =  this.position.x;
                this.positionOld.y =  this.position.y;

                this.rotation -= this.speedR * dt;
            }
            if(keyInput[68] == 1) {
                this.rotationOld = this.rotation;
                this.positionOld.x =  this.position.x;
                this.positionOld.y =  this.position.y;

                this.rotation += this.speedR * dt;
            } 
            if(keyInput[87] == 1){
                this.rotationOld = this.rotation;
                this.positionOld.x =  this.position.x;
                this.positionOld.y =  this.position.y;

                this.position.x += Math.sin(this.rotation * Math.PI / 180)* this.speed * dt ;
                this.position.y -= Math.cos(this.rotation* Math.PI / 180)* this.speed * dt;
            }
            if(keyInput[83] == 1){
                this.rotationOld = this.rotation;
                this.positionOld.x =  this.position.x;
                this.positionOld.y =  this.position.y;

                this.position.x -= Math.sin(this.rotation * Math.PI / 180)* this.speed * dt;
                this.position.y += Math.cos(this.rotation* Math.PI / 180)* this.speed * dt;
            } 
            if(keyInput[81] == 1){
                this.shoot();
                keyInput[81] = 0;
            }
        } 
    }
}

class Tank_AI extends Tank2{
    constructor(position, rotation, origin, mapa){
        super(position, rotation, origin);
        this.maxLife = 10;
        this.mapa = mapa;
        this.smer = { l: 0, r : 0};
        this.speed = 20;
        this.mod = -1;
        this.HitAngle = 0;
        this.shotT = 0;
        this.maxS = 10;
        this.reloadS = 10;
    }
    update(keyInput, dt, pos){
        this.getMod(pos)
        this.posun(keyInput, dt);
        //this.pressedT = Date.now();
        
        if(this.rotation >360 ) this.rotation = 0;   
        if(this.rotation < 0) this.rotation = 360;
        this.updateShots(dt);      
    }


    draw (){
        Canvas.context.save();
        Canvas.context.translate(this.position.x, this.position.y); //zachovaj poradie!!
        Canvas.context.rotate(Math.floor(this.rotation)  *Math.PI/180);
        //Canvas.context.fillRect(-this.origin.x , -this.origin.y, Sprites.tankIMG.width, Sprites.tankIMG.height );// hitbox 
        Canvas.context.drawImage(Sprites.tank2IMG, -this.origin.x , -this.origin.y ); 
        Canvas.context.restore();
        //this.drawCollision();
        this.frontTile();
        
    }

    frontTile(){
        var frontPos = {x: 0, y :0};
        frontPos.x = this.position.x + Math.sin(this.rotation * Math.PI / 180)* this.speed*1,5  ;
        frontPos.y = this.position.y - Math.cos(this.rotation* Math.PI / 180)* this.speed*1.5 ;
       
        // Canvas.context.save();
        // Canvas.context.fillRect(frontPos.x,frontPos.y,5,5);
        // Canvas.context.restore();

        
        var rt = {x : frontPos.x +  Math.cos(this.rotation* Math.PI / 180)*this.origin.x + Math.sin(this.rotation* Math.PI / 180)*this.origin.y 
            , y : frontPos.y + Math.sin(this.rotation* Math.PI / 180)*this.origin.x - Math.cos(this.rotation* Math.PI / 180)*this.origin.y 
        }
        var lt = {x : frontPos.x -  Math.cos(this.rotation* Math.PI / 180)*this.origin.x + Math.sin(this.rotation* Math.PI / 180)*this.origin.y 
            , y : frontPos.y - Math.sin(this.rotation* Math.PI / 180)*this.origin.x - Math.cos(this.rotation* Math.PI / 180)*this.origin.y 
        }
        
        if(lt.x<0) lt.x = 0;
        if(lt.y<0) lt.y = 0;
        if(rt.x<0) rt.x = 0;
        if(rt.y<0) rt.y = 0; 
        if(lt.x>this.mapa.mapSize.x*this.mapa.tileSize) lt.x = this.mapa.mapSize.x*this.mapa.tileSize - 5;
        if(lt.y>this.mapa.mapSize.y*this.mapa.tileSize) lt.y = this.mapa.mapSize.y*this.mapa.tileSize - 5;
        if(rt.y>this.mapa.mapSize.y*this.mapa.tileSize) rt.y = this.mapa.mapSize.y*this.mapa.tileSize - 5;
        if(rt.x>this.mapa.mapSize.x*this.mapa.tileSize) rt.x = this.mapa.mapSize.x*this.mapa.tileSize - 5;

        // Canvas.context.fillRect(rt.x, rt.y, 2, 2 );
        // Canvas.context.fillRect(lt.x, lt.y, 2, 2 );
        //console.log(this.mapa.MapArray[0][Math.floor(frontPos.y / this.mapa.tileSize)][Math.floor(frontPos.x / this.mapa.tileSize)]);
        this.smer = {
            l: this.mapa.MapArray[this.mapa.level][Math.floor(lt.y / this.mapa.tileSize)][Math.floor(lt.x / this.mapa.tileSize)],
            r: this.mapa.MapArray[this.mapa.level][Math.floor(rt.y / this.mapa.tileSize)][Math.floor(rt.x / this.mapa.tileSize)]
        };

        //console.log(this.smer);
    }

    getMod(pos){
        var vzdialenost = Math.sqrt(Math.pow(this.position.x - pos.x, 2) + Math.pow(this.position.y - pos.y,2));
        var pom_vzdialenost = Math.sqrt(Math.pow(this.position.x - pos.x, 2) + Math.pow(pos.y,2));
        // console.log(pom_vzdialenost);
        this.HitAngle = Math.acos((Math.pow(pom_vzdialenost,2)-Math.pow(vzdialenost,2)-Math.pow(this.position.y,2))/(-2*this.position.y*vzdialenost))/Math.PI*180;
        if(this.position.x > pos.x) this.HitAngle=360-this.HitAngle;

        if(vzdialenost < 300){
            this.mod = 1;
            // console.log("hit" + this.HitAngle);
            // console.log(this.rotation);
           // console.log(Math.abs(this.HitAngle-Math.abs(this.rotation)));
            //console.log((this.HitAngle-Math.abs(this.rotation)));
            if( Math.abs(this.HitAngle-Math.abs(this.rotation)) <5   ){
                this.mod = 2;
            }

        } else{
            this.mod = 0;   
        }
        
    }

    posun(keyInput, dt){
        this.shotT += dt;
        if(this.mod == 0){

            if(this.smer.r >= 1 ) { 
                this.rotationOld = this.rotation;
                this.positionOld.x =  this.position.x;
            this.positionOld.y =  this.position.y;
            
            this.rotation -= this.speedR * dt;
            }
            else if(this.smer.l >= 1) {
                this.rotationOld = this.rotation;
                this.positionOld.x =  this.position.x;
                this.positionOld.y =  this.position.y;
                
                this.rotation += this.speedR * dt;
            } 
            if(this.smer.r == 0 || this.smer.l == 0){//dopredu
                this.rotationOld = this.rotation;
                this.positionOld.x =  this.position.x;
                this.positionOld.y =  this.position.y;
                
                this.position.x += Math.sin(this.rotation * Math.PI / 180)* this.speed * dt ;
                this.position.y -= Math.cos(this.rotation* Math.PI / 180)* this.speed * dt;
            }
        }else if(this.mod == 1){
            // console.log("ddsd" + Math.abs(this.HitAngle - this.rotation));
            // if(Math.abs(this.HitAngle - this.rotation) < 180){

            //     this.rotationOld = this.rotation;
            //     this.positionOld.x =  this.position.x;
            //     this.positionOld.y =  this.position.y;
                
            //     this.rotation += this.speedR * dt;
            // } else{
                this.rotationOld = this.rotation;
                this.positionOld.x =  this.position.x;
                this.positionOld.y =  this.position.y;
                
                this.rotation -= this.speedR * dt;
           // }
        } else if(this.mod == 2){

              
                if(this.shotT > this.reloadS){

                    this.shoot();
                  
                    keyInput[81] = 0;
                    this.mod = 0;
                    this.shotT = 0;
            
                }else{
                    this.rotationOld = this.rotation;
                    this.positionOld.x =  this.position.x;
                    this.positionOld.y =  this.position.y;
                
                    this.position.x -= Math.sin(this.rotation * Math.PI / 180)* this.speed * dt;
                    this.position.y += Math.cos(this.rotation* Math.PI / 180)* this.speed * dt;
                }
        
            }

    }

    reset(position){
        this.rotation = 0;
        this.life = this.maxLife;
        this.position = position;
        this.strely = [];
        this.strelyCounter = 0;
        this.mod = 0;
    }

}



