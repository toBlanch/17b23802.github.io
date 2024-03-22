/*
Upcoming changes:
   Allow box to expand/shrink/move
   Allow attacks to be angled
   Graphical stuff
   Make attacks shootable
   Implement Square and Claw attacks
   Allow Martlet to be shot
   Allow attcks to flow
   Measure actual coordinates
*/
Loop();

function Loop(){
   const d = new Date();
   startTime = Math.round(d.getTime())

   if(running){
      RunningLoop();
      Draw();
   }
   
   
   if(shoot && !running){
      running = true;
      Starter();
   }

   leftHeld = left;
   rightHeld = right;
   upHeld = up;
   downHeld = down;
   shootHeld = shoot;
   dodgeHeld = dodge;

   setTimeout(Loop, 1000/60 - (Math.round(d.getTime()) - startTime));
}

function Starter(){
   soul = new Soul(100, 100, 20, 20, 92)
   box = new Box();
   box.UpdateCoordinates(new Coordinates(100, 200, 600, 200));
   menuBox = new Coordinates(40, 313, 718, 174);
   attackPatterns = [
      new AttackPattern(360, new Coordinates(50,50,50,50), [
         new HomingAttack(60,120,100,100, false),
         new HomingAttack(180,60,300,100, true)
      ]),
      new AttackPattern(360, new Coordinates(50,50,50,50),[
         new HomingAttack(60,120,100,100, false),
         new HomingAttack(60,180,100,150, false),
         new HomingAttack(180,60,300,100, true)
      ]),
      new AttackPattern(360, new Coordinates(50,50,50,50),[
         new HomingAttack(60,120,100,100, false),
         new HomingAttack(180,60,300,100, true)
      ]),
      new AttackPattern(360, new Coordinates(50,50,50,50),[
         new HomingAttack(60,120,100,100, false),
         new HomingAttack(180,60,300,100, true)
      ]),
      new AttackPattern(360, new Coordinates(50,50,50,50),[
         new HomingAttack(60,120,100,100, false),
         new HomingAttack(180,60,300,100, true)
      ])
   ]
}

function RunningLoop(){
   if(menu){
      if(soul.startNextAttack){
         currentAttack ++;
         menu = false;
         soul.startNextAttack = false;
         box.UpdateCoordinates(attackPatterns[currentAttack].boxCoordinates);
      }
      else{
         MenuUpdate();
      }
   }
   else{
      AttackUpdate();
   }
}

function MenuUpdate(){
   soul.MenuUpdate();
   box.TextUpdate();
}

function AttackUpdate(){
   soul.AttackUpdate();
   box.SoulUpdate();
   if(attackPatterns[currentAttack].duration == 0){
      menu = true;
      box.UpdateCoordinates(menuBox);
      soul.EndAttack();
      var menuTextSamples = ["First attack over","Second attack over","The enemy tries to persist"]
      box.menuText = menuTextSamples[currentAttack];
   }
   else if(attackPatterns[currentAttack].Update(soul)) { //If an attack hit the soul
      soul.Hit(damage);
   }
}

function Draw(){
   soul.Draw();
   box.Draw();
   for(var i=0;i<4;i++){
      var textToOutput="";
      if(soul.menuText[i]!=""){
         textToOutput = "*" + soul.menuText[i]
      }
      UpdateRect('.MenuButton'+i, soul.selectionCoords.x[i%2] + 30, soul.selectionCoords.y[1*(i>1)], 100, 20, true, 0);
      document.getElementById("MenuButton"+i).innerHTML = textToOutput;

   }
   // UpdateRect('.MenuButton1', soul.selectionCoords.x[1], soul.selectionCoords.y[0], 100, 20, true, 0);
   // document.getElementById("MenuButton1").innerHTML = soul.menuText[1];
   // UpdateRect('.MenuButton2', soul.selectionCoords.x[0], soul.selectionCoords.y[1], 100, 20, true, 0);
   // document.getElementById("MenuButton2").innerHTML = soul.menuText[2];
   // UpdateRect('.MenuButton3', soul.selectionCoords.x[1], soul.selectionCoords.y[1], 100, 20, true, 0);
   // document.getElementById("MenuButton3").innerHTML = "    * "*(soul.menuText[3]!="") + soul.menuText[3];
   UpdateRect('.Hp', 344, 500, 150*soul.hp/92, 25, true, 0);
   UpdateRect('.HpRed', 344, 500, 150, 25, true, 0);
   UpdateRect('.HpNumber', 530, 504, 200, 18, true, 0);
   document.getElementById("HpNumber").innerHTML = soul.hp;
   UpdateRect(".Fight", 40, 540, 136, 51, true, 0);
   UpdateRect(".Act", 231, 540, 136, 51, true, 0);
   UpdateRect(".Item", 431, 540, 136, 51, true, 0);
   UpdateRect(".Mercy", 625, 540, 136, 51, true, 0);
   UpdateRect(".MiscText", 37, 504, 587, 18, true, 0);
   attackPatterns[currentAttack].Draw();
}