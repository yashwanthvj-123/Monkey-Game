var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var ground,groundimage;
var survival_time;
var gameover,gameoverImage,replay,replayImage;
var PLAY=0;
var END=1;
var gameState=0;
var bg,bgImage;
var sound;
var sound2;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  groundimage=loadImage("wood.jpg");
  
  bgImage=loadImage("Forest.jpg");
  
  gameoverImage=loadImage("Game Over image.jpg");
  
  replayImage=loadImage("Replay button.jpg");
 
  sound=loadSound("Game over 2.m4a");
  
  sound2=loadSound("Up sound.m4a");
}

function setup() {
  
createCanvas(550,400);
  
bg=createSprite(270,230,550,300);
bg.addImage(bgImage);
bg.scale=1.9;
  
foodGroup = createGroup ();
obstacleGroup=createGroup ();
  
gameover=createSprite(280,100,10,10);
gameover.addImage(gameoverImage); 
gameover.scale=0.75;
  
replay=createSprite(300,200,10,10);
replay.addImage(replayImage);
replay.scale=0.5;
  
ground=createSprite(300,400,600,25);
ground.x=ground.width /2;
ground.shapeColor="black";
ground.lifetime=-1;

  
monkey=createSprite(70,230,10,10);
monkey.addAnimation("monkeyrunning",monkey_running);
monkey.scale=0.15;
if(monkey.isTouching(ground)){
  monkey.collide(ground);}
//monkey.debug=true;  
  
score = 0;
  
survival_time=0;
  
}

function draw() {

background("lightgreen");
  

  
if(gameState===PLAY){
  
gameover.visible=false;
replay.visible=false;
  
bg.velocityX=-6;
if(bg.x < 50){
bg.x=bg.width/2;  }
  
survival_time = survival_time + Math.round(getFrameRate()/61);
  
fruits () ;
  
rocks ();
  
if (monkey.isTouching(foodGroup)){
  foodGroup.destroyEach();
  score=score + 2;}
  
if (keyDown("space") && monkey.y >= 341){
  sound2.play();
  monkey.velocityY=-15;}

monkey.velocityY=monkey.velocityY+0.8;
monkey.collide(ground);

if (monkey.isTouching(obstacleGroup)){
  sound.play();
  gameState=END; } 
  
}
  
if (gameState===END){
    
foodGroup.destroyEach ();
obstacleGroup.destroyEach ();

monkey.visible=true
gameover.visible=true;
replay.visible=true;
  
monkey.collide(ground);
monkey.visible=false;
  
bg.velocityX=0;
  
if (mousePressedOver(replay)){
  reset ();}
  
}
  
drawSprites();
  
fill("white");
textSize (15) ;
text(" Score : "+score, 20,20);
  
text(" Survival Time : "+survival_time,400,20);
  
}

function fruits (){
  
if (frameCount % 80 === 0){
  
banana=createSprite(500,100,10,10);
banana.addImage(bananaImage);
banana.scale=0.1;
banana.velocityX=-(10+3*score/4);
foodGroup.add(banana);
banana.lifetime=-1;
banana.y=Math.round(random(150,300));
  
}  
  
}

function rocks () {
  
if(frameCount % 100 === 0){
  
obstacle=createSprite(600,360,10,10);
obstacle.addImage(obstacleImage);
obstacle.velocityX=-(10+3*survival_time/4);
obstacleGroup.add(obstacle);
obstacle.lifetime=-1;
obstacle.scale=0.15;
obstacle.debug=false;

}  
  
}

function reset () {
 
score=0;
survival_time=0;
  
monkey.visible=true;
  
obstacleGroup.destroyEach();
foodGroup.destroyEach();
  
gameState=PLAY;
  
}
