// class Tank2 extends Tank{
//     constructor(position, rotation, origin){
//         super(position, rotation, origin);
//         this.life = 10;

//     }

//     draw (){
//         Canvas.context.save();
//         Canvas.context.translate(this.position.x, this.position.y); //zachovaj poradie!!
//         Canvas.context.rotate(Math.floor(this.rotation)  *Math.PI/180);
//         Canvas.context.fillRect(-this.origin.x , -this.origin.y, Sprites.tankIMG.width, Sprites.tankIMG.height );// hitbox 
//         Canvas.context.drawImage(Sprites.tank2IMG, -this.origin.x , -this.origin.y ); 
//         Canvas.context.restore();
        
//     }

    

//     posun (keyInput, dt){

//         if( (Date.now() - this.pressedT  > 15)){

//             if(keyInput[65] == 1) { 
//                 this.rotation -= this.speedR * dt;
//             }
//             if(keyInput[68] == 1) {
//                 this.rotation += this.speedR * dt;
//             } 
//             if(keyInput[87] == 1){
//                 this.position.x += Math.sin(this.rotation * Math.PI / 180)* this.speed * dt ;
//                 this.position.y -= Math.cos(this.rotation* Math.PI / 180)* this.speed * dt;
//             }
//             if(keyInput[83] == 1){
//                 this.position.x -= Math.sin(this.rotation * Math.PI / 180)* this.speed * dt;
//                 this.position.y += Math.cos(this.rotation* Math.PI / 180)* this.speed * dt;
//             } 
//             if(keyInput[81] == 1){
//                 this.shoot();
//                 keyInput[81] = 0;
//             }
//         } 
//     }
// }