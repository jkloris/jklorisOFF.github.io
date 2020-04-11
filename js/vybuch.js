class Explosion{
    constructor(){

        this.origin = {x : 32, y : 32};
        this.counter = 0;
        this.position = {x : 0, y : 0};
    }


    drawExplosion(position, scale){
        Canvas.context.save();
        Canvas.context.translate(position.x, position.y); 
        Canvas.context.rotate(Math.floor((Math.random() * 300 )) * Math.PI / 360);
        Canvas.context.scale(scale,scale);
        Canvas.context.drawImage(Sprites.vybuch, -this.origin.x , -this.origin.y ); 
        Canvas.context.restore();
    }
}