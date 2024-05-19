var left = false;
var leftHeld = false;
var right = false;
var rightHeld = false;
var up = false;
var upHeld = false;
var down = false;
var downHeld = false;
var shoot = false;
var shootHeld = false;
var dodge = false;
var dodgeHeld = false;

var fps = 60;
var waitingUntilDodgePressed = false;

var menu = false;

var running = false;
var currentAttack = 0;
var currentAttackDuration = 0;
var prevTime = 0;
var damage = 11;

var soul;
var box;
var menuBox;
var martlet;
var attackPatterns;

class Coordinates{
   x=0;
   y=0;
   width=0;
   height=0;
   angle=0;

   constructor(rx=0, ry=0, rwidth=0, rheight=0, rangle=0){
      this.x = rx;
      this.y = ry;
      this.width = rwidth;
      this.height = rheight;
      this.angle = rangle;

      while(this.angle < 0){
         this.angle += 360;
      }
      while (this.angle > 360){
         this.angle -= 360;
      }
   }
}

class Point{
   x=0;
   y=0;

   constructor(rx,ry){
      this.x=rx;
      this.y=ry;
   }
}

class Line{
   initial=0;
   length=0;

   constructor(rinitial,rlength){
      if(rlength<0){ //If the length is backwards
         this.initial = rinitial + rlength; //Move the initial value back
         this.length = -rlength; //Use the correct length
      }
      else{ //Otherwise use the inputted values
         this.initial = rinitial;
         this.length = rlength;
      }
   }
}

window.addEventListener("keydown", function (event) {
   if (event.key=="ArrowDown"){
      down = true;
   }
   if (event.key == "ArrowUp"){
      up = true;
   }
   if (event.key == "ArrowLeft"){
      left = true;
   }
   if (event.key == "ArrowRight"){
      right = true;
   }
   if (event.key == "z" || event.key == "Enter"){
      shoot = true;
   }
   if (event.key == "x" || event.key == "Shift"){
      dodge = true;
   }
   if (event.key == "c"){
      soul.autoShoot =! soul.autoShoot;
   }
}, true);

window.addEventListener("keyup", function (event) {
   if (event.key=="ArrowDown"){
      down = false;
   }
   if (event.key == "ArrowUp"){
      up = false;
   }
   if (event.key == "ArrowLeft"){
      left = false;
   }
   if (event.key == "ArrowRight"){
      right = false;
   }
   if (event.key == "z" || event.key == "Enter"){
      shoot = false;
   }
   if (event.key == "x" || event.key == "Shift"){
      dodge = false;
   }
}, true);
