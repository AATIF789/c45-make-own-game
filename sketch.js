
var PLAY=1
var END=0
var gameState=PLAY
var ground, backgroundImg,invisibleGround
var enemy,enemyAttack,enemyRun,enemyImg
var girl,girlImg ,girlRunning, girlColliding
var score
var obstacle
var gameOver,gameOverImg, restart, restartImg
var obstaclesGroup, obstacle1


function preload(){
  backgroundImg= loadImage("Background.png");
  girlRunning=loadAnimation("girl run 1.png","girl run 2.png","girl run 3.png","girl run 4.png","girl run 5.png","girl run 6.png","girl run 7.png","girl run 8.png","girl run 9.png","girl run 10.png","girl run 11.png","girl run 12.png","girl run 13.png","girl run 14.png","girl run 15.png","girl run 16.png","girl run 17.png","girl run 18.png","girl run 19.png");
  enemyAttack=loadAnimation("enemy attack 1.png","enemy attack 2.png","enemy attack 3.png","enemy attack 4.png","enemy attack 5.png","enemy attack 6.png","enemy attack 7.png");
  enemyRun=loadAnimation("enemy run 1.png","enemy run 2.png","enemy run 3.png","enemy run 4.png","enemy run 5.png","enemy run 6.png","enemy run 7.png","enemy run 8.png","enemy run 9.png","enemy run 10.png");
  enemyImg=loadImage("enemy image.png");
  girlImg=loadImage("girl image.png");
  restartImg=loadImage("restart.png");
  gameOverImg=loadImage("game over.png");
  girlColliding=loadImage("girl collided.png");
  obstacle1=loadImage("obstacle 1.png");
}
function setup() {
  createCanvas(600,500);
  obstacle= createSprite(660,450,10,40)
  ground=createSprite(0,0,0,0)
  ground.addImage("backgroundImg",backgroundImg)  
  ground.scale=1.4
  ground.velocityX=-1

  girl=createSprite(520,410,20,10)
  girl.addImage("girlImg",girlImg)
  girl.addAnimation("girlRunning",girlRunning)
  girl.addImage("girlColliding",girlColliding)
  girl.scale=0.2

  enemy = createSprite(50, 410, 600, 10);
  enemy.addAnimation("enemyRun", enemyRun);
  enemy.addAnimation("enemyAttack", enemyAttack);
  enemy.addImage("enemyImg", enemyImg);
  enemy.scale = 0.2;

  invisibleGround=createSprite(300,470,600,10)
  invisibleGround.visible=false

  gameOver=createSprite(300,100)
  gameOver.addImage(gameOverImg)

  restart=createSprite(350,115)
  restart.addImage(restartImg)

  obstaclesGroup = new Group();

  score=0

}


function draw() 
{
  girl.velocityY = girl.velocityY + 0.8;
  girl.collide(invisibleGround);

  enemy.velocityY=girl.velocityY+0.8
  enemy.collide(invisibleGround)


  if(gameState===PLAY){
    spawnObstacles();

    gameOver.visible=false
    restart.visible=false
    score = score + Math.round(getFrameRate() / 60);

    if (obstaclesGroup.isTouching(enemy)) {
      enemy.velocityY = -12;
    }
    ground.velocityX = -(4 + 3 * score / 100);

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    if ((keyDown("space") && girl.y >= 220)) {
      girl.velocityY = -12;
  }
  if (girl.isTouching(obstaclesGroup)) {
    gameState = END;
  }  

  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    ground.velocityX = 0;
    girl.velocityY = 0
    girl.changeImage("girlImage", girlImage);
    enemy.changeAnimation("enemyAttack", enemyAttack);
    enemy.x = girl.x;
    if (enemy.isTouching(girl)) {
      girl.changeImage("girl_collided", girl_collided);
      enemy.changeImage("enemyImg", enemyImg);
    }
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);

    if (mousePressedOver(restart)) {
      reset();
    }

  background("black");
  drawSprites()
}
  }
}
function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  girl.changeAnimation("girl_running", girl_running);
  obstaclesGroup.destroyEach();
  score = 0;
  enemy.x = 50;
}

function spawnObstacles(){
  if(frameCount %60===0){
   
    obstacle.velocityX=-6
    obstacle.addImage(obstacle1)
    obstacle.scale = 0.1;
    obstaclesGroup.add(obstacle);
    obstacle.debug = false;
    obstacle.setCollider("circle", 0, 0, 1);
  }
}