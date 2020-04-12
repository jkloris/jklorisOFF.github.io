let Sprites = {};
let Sounds = [];
let Notloaded_assets = 0;

function AssetsLoading_loop(callback){

    if(Notloaded_assets > 0){
        requestAnimationFrame(AssetsLoading_loop.bind(this,callback));
    } else callback();
}

function loadAssets(callback){

    function loadIMG(path, imgName){
        Notloaded_assets++;

        var img = new Image();
        img.src = path + imgName;

        img.onload = function(){
            Notloaded_assets--;
        }

        return img;
    }
   

    Sprites.background = loadIMG("Obrazky/", "Background_ingame.png");
    Sprites.tankIMG = loadIMG("Obrazky/", "Tank_brown.png");
    Sprites.tank2IMG = loadIMG("Obrazky/", "Tank_green.png");
    Sprites.raketa = loadIMG("Obrazky/", "raketa2.png");
    Sprites.brick = loadIMG("Obrazky/", "Wall_brick.png");
    Sprites.vybuch = loadIMG("Obrazky/", "vybuch.png");
    Sprites.menu = loadIMG("Obrazky/", "Menu_pozadie.png");
    Sprites.soundON = loadIMG("Obrazky/", "Sound_icon.png");
    Sprites.soundOFF = loadIMG("Obrazky/", "Sound_iconOFF.png");
    Sprites.instrukcie = loadIMG("Obrazky/", "Instrukcie.png");
    
    Sounds.ingameMusic = document.getElementById("inGameSong");
    Sounds.ingameMusic.loop = true;
    Sounds.klik = document.getElementById("klik");
    Sounds.shot = document.getElementById("shot");
    Sounds.vybuch = document.getElementById("vybuch");

    AssetsLoading_loop(callback);
}