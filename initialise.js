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

var menu = false;

var running = false;
var currentAttack = 0;
var currentAttackDuration = 0;
var prevTime = 0;
var damage = 11;

class Coordinates{
   x = 0;
   y = 0;
   width = 0;
   height = 0;

   constructor(rx,ry,rwidth,rheight){
      this.x=rx;
      this.y=ry;
      this.width=rwidth;
      this.height=rheight;
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
