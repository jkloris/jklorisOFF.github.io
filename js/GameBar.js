class GameBar{
    constructor(position, size, color){
        this.position = position;
        this.size = size;
        this.color = color;
        
    }

    drawBar(){
        Canvas.context.fillStyle = this.color;
        Canvas.context.fillRect(this.position.x, this. position.y, this.size.x, this.size.y);
    }
}

class HealthBar extends GameBar{
    constructor(position, size, color, text ){
        super(position, size, color);
        this.text = text;
    
    }

    drawBar(life, maxLife){
        Canvas.context.beginPath();
        Canvas.context.fillStyle = this.color;
        Canvas.context.strokeStyle = "black";
        Canvas.context.lineWidth = "5";
        Canvas.context.fillRect(this.position.x, this. position.y, this.size.x / maxLife * life, this.size.y);
        Canvas.context.rect(this.position.x, this. position.y, this.size.x, this.size.y);
        Canvas.context.stroke();
        Canvas.context.fillStyle = "black";
        Canvas.context.font = "20px Arial";
        Canvas.context.fillText(this.text,this.position.x + 70, this. position.y + 60 );
    }
}

class Timer extends GameBar{
    constructor(position, size, color){
        super(position, size, color)
    }

    drawBar(limit){
        
        Canvas.context.save();
        Canvas.context.fillStyle = this.color;
        Canvas.context.fillRect(this.position.x, this. position.y, this.size.x, this.size.y);
        Canvas.context.fillStyle = "white";
        Canvas.context.textAlign = "center";
        Canvas.context.font = "30px Arial black";
        Canvas.context.fillText(limit, this.position.x + this.size.x / 2, this.position.y +this.size.y / 2 + 7);
        Canvas.context.restore();
    }
}