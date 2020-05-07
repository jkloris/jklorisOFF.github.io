class Canvas2D{
    constructor(canvasID){
        this.canvas = document.getElementById(canvasID);
        this.context = this.canvas.getContext("2d");
        
    }
        clear (){
            this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
        }

        drawImage (img, position){
            this.context.drawImage(img, position.x, position.y);
        
        }


}


let Canvas = new Canvas2D("canvas1");

