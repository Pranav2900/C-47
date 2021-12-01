var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombieImg;
var bulletImg;
var life1, life2, life3;
var lifeImg1, lifeImg2, lifeImg3;
var life = 3;
var PLAY=1;
var END=0;
var gameState = PLAY;
var gameOver, restart, gameOverImg, restartImg;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
zombieImg = loadImage("assets/zombie.png");
bulletImg = loadImage("assets/bullet1.png");

lifeImg1 = loadImage("assets/heart_1.png");
lifeImg2 = loadImage("assets/heart_2.png");
lifeImg3 = loadImage("assets/heart_3.png");

gameOverImg = loadImage("assets/gameOver.png");
restartImg = loadImage("assets/restart.png");
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1

gameOver = createSprite(width/2, height/2-100,10,10);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.9;
gameOver.visible = false;

restart = createSprite(width/2, height/2,10,10);
restart.addImage(restartImg);
restart.scale = 0.9;
restart.visible = false;
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = false
   player.setCollider("rectangle",0,0,300,300);

   life3 = createSprite(width/2+500, height/2-250,10,10);
   life3.visible = true;
   life3.addImage(lifeImg3);
   life3.scale = 0.3;

   life2 = createSprite(width/2+500, height/2-250,10,10);
   life2.visible = false;
   life2.addImage(lifeImg2);
   life2.scale = 0.3;

   life1 = createSprite(width/2+500, height/2-250,10,10);
   life1.visible = false;
   life1.addImage(lifeImg1);
   life1.scale = 0.3;

bulletGroup = new Group();
zombieGroup = new Group();
}

function draw() {
  background(0); 
  if(gameState===PLAY){
    if(life===3){
      life1.visible = false;
      life2.visible = false;
      life3.visible = true;
    }
    if(life===2){
      life1.visible = false;
      life2.visible = true;
      life3.visible = false;
    }
    if(life===1){
      life1.visible = true;
      life2.visible = false;
      life3.visible = false;
    }
    if(life===0){
      life1.visible = false;
      life2.visible = false;
      life3.visible = false;
     player.visible = false;
      gameState=END;
    }
    if(bulletGroup.collide(zombieGroup)){
      bulletGroup.destroyEach();
      zombieGroup.destroyEach();
    }
    for(var i=0;i<zombieGroup.length;i++){
      if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy();
      life = life-1
      }
    }
     //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
  showBullet();
}


//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
  
}

spawnZombies();
  }
  if(gameState===END){
   zombieGroup.setVelocityEach(0,0);
   gameOver.visible = true;
   restart.visible = true;
   if(mousePressedOver(restart)){
     reset();
   }
  }


  




 
drawSprites();

}
function spawnZombies(){
if(frameCount%60===0){
  zombie = createSprite(windowWidth, windowHeight-150,10,40);
  zombie.y = Math.round(random(windowHeight-600,windowHeight));
  zombie.velocityX = -10;
  zombie.addImage(zombieImg);
  zombie.scale = 0.15;
  zombieGroup.add(zombie);
}
}
function showBullet(){
  bullet = createSprite(player.x+80, player.y-20,10,10);
  bullet.velocityX= 10;
  bullet.addImage(bulletImg);
  bullet.scale = 0.1;
  bulletGroup.add(bullet);
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  life = 3;
  zombieGroup.destroyEach();
player.visible = true;
}