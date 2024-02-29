var left = false;
var right = false;
var up = false;
var down = false;
var dodge = false;
var dodgeHeld = false;
var shoot = false;
var shootHeld = false;
var running = false;
var prevTime = 0;

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
   if (event.key == "x" || event.key == "Shift"){
      dodge = true;
   }
   if (event.key == "z" || event.key == "Enter"){
      shoot = true;
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
   if (event.key == "x" || event.key == "Shift"){
      dodge = false;
   }
   if (event.key == "z" || event.key == "Enter"){
      shoot = false;
   }
}, true);

//Starter();