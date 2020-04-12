class Tank{
    constructor(position, rotation, origin){
        this.position = position;
        this.rotation = rotation;
        this.origin = origin; //polovičky strán
        //this.firedB = false;
        this.pressedT = 0;
        this.speed = 30;
        this.speedR = 20;
        this.maxLife = 10;
        this.life = this.maxLife;
        this.score = 0;
        
        this.strely = [];
        this.speedS = 8 ;
        this.maxS = 5;

        this.positionOld = {x : 0, y : 0};
        this.rotationOld = 0;
        
    }

    
    update(keyInput, dt){
        this.posun(keyInput, dt);
        //this.pressedT = Date.now();

        if(this.rotation >360) this.rotation = 0;   
        this.updateShots();     
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
        if(this.strely.length < this.maxS){
            
            this.strely.push({x : this.position.x , y : this.position.y , r: this.rotation });
        }
    }

    updateShots(){
        for(var i = 0; i < this.strely.length; i++){       
            this.strely[i].x += Math.sin(this.strely[i].r * Math.PI / 180)* this.speedS ;
            this.strely[i].y -= Math.cos(this.strely[i].r* Math.PI / 180)* this.speedS;
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




