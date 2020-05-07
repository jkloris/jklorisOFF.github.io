// class Shot{
//     constructor(){
//         this.speed = 10;
//         this.origin = {x : 25, y: 10};
//         this.position = 0;
//         this.rotation = {x : 25, y: 10};
//     }

//     update(){
//         this.position.x += Math.sin(this.rotation * Math.PI / 180)* this.speed ;
//         this.position.y -= Math.cos(this.rotation* Math.PI / 180)* this.speed;
//     }

//     draw (){
//         Canvas.context.save();
//         Canvas.context.translate(this.position.x, this.position.y); //zachovaj poradie!!
//         Canvas.context.rotate(Math.floor(this.rotation)  *Math.PI/180);
//         Canvas.context.drawImage(Sprites.raketa, -this.origin.x , -this.origin.y ); 
//         Canvas.context.restore();
//     }


// }