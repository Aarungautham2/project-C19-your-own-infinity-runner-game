var score =0;
var spaceShipImg;
var blastImg;
var powerImg;
var monsterImg;



var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;

var redBubbleGroup, redBubbleGroup, bulletGroup;


var life =3;
var score=0;
var gameState=1

function preload(){
  spaceShipImg = loadImage("ship10.png")
  blastImg = loadImage("blaster.png")
  powerImg = loadImage("power.png")
  monsterImg = loadImage("monster.png")
  bgImg = loadImage("background_space.png")
  
}
function setup() {
  createCanvas(800, 800);
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale=4;

 
  
  spaceShip= createSprite(100, height/2, 50,50);
  spaceShip.addImage(spaceShipImg)
  spaceShip.scale=0.2
  
  powerGroup = new Group();   
  monsterGroup = new Group();   
   
  
 
}

function draw() {
 
  
 
  if(gameState===1){
    spaceShip.y=mouseY  

    if (frameCount % 80 === 0) {
      drawMonster();
    }

   

    if(keyDown("space")){
      shootPower();
    }

    if (monsterGroup.collide(spaceShip)){
      handleGameover(monsterGroup);
    }
    
   
    
    
    if(monsterGroup.collide(powerGroup)){
      handleMonsterCollision(monsterGroup);
    }

    

    drawSprites();
  }
    
  
}

function drawMonster(){
    monster  = createSprite(800,random(20,780),40,40);
    monster .addImage(monsterImg);
    monster .scale = 0.1;
    monster .velocityX = -8;
    monster.lifetime = 400;
    monsterGroup .add(monster);
}


function shootPower(){
  power = createSprite(150, width/2, 50,20)
  power.y= spaceShip.y-20
  power .addImage(powerImg)
  power.scale=0.12
  power.velocityX= 7
  powerGroup.add(power)
}

function handleMonsterCollision(monsterGroup){
    if (life > 0) {
       score=score+1;
    }

     blast= createSprite(power.x+60, power.y, 50,50);
    blast.addImage(blastImg);

    /* blast= sprite(bullet.x+60, bullet.y, 50,50);
    blast.addImage(blastImg) */

    /* blast= createSprite(bullet.x+60, bullet.y, 50,50);
    blast.add(blastImg) */

    /* blast= createSprite(bullet.x+60, bullet.y, 50,50);
    image(blastImg) */
    
    blast.scale=0.3
    blast.life=20
    powerGroup.destroyEach()
    monsterGroup.destroyEach()
}

function handleGameover(monsterGroup){
  
    life=life-1;
    monsterGroup.destroyEach();
    

    if (life === 0) {
      gameState=2
      
      swal({
        title: `Game Over`,
        text: "Oops you lost the game....!!!",
        text: "Your Score is " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"
      });
    }
  
}