/*
Upcoming changes:
   Graphical stuff
   Add indicator that a big shot is ready / charging
   Add little icons (for act item and mercy)
   Implement Square, falling feather, exploding, telegraphed attacks
   Allow attacks to change the size of the box???
   Measure actual coordinates

Notes from TS change:
    Variables initialised in Starter are now initialised in initialise.ts and have no assigned value
    The midpoint of homing attacks have been fixed to now be based around y + height/2 instead of y
    "let" has been used to delare local variables (eg line 46-47 in collision.ts) 
    shot.ts line 20, soul.ts line 170 and main.ts line 149 changed to use boolean?x:y instead of y + boolean
    Replaced itemsHealth with itemsDictionary in soul.ts
    Changed document.getelementbyid(id) to document.getelementbyid(id)! to confirm that the value won't be null, and where relevant added "as any"
*/

Loop();

function Loop(){
   const d = new Date();
   var startTime = Math.round(d.getTime())

   if(waitingUntilDodgePressed){
      WaitUntilDodgePressed();
   }
   else if(running){
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

   setTimeout(Loop, 1000/fps - (Math.round(d.getTime()) - startTime));
}

function Starter(){
   soul = new Soul(new Coordinates(100, 100, 20, 20, 0), 92)
   box = new Box();
   box.UpdateCoordinates(new Coordinates(100, 200, 600, 200, 0));
   menuBox = new Coordinates(40, 313, 718, 174);
   martlet = new Martlet;
   attackPatterns = [
      new AttackPattern(310, new Coordinates(50,50,50,50, 0), [
         new HomingAttack(60, 120,new Point(200,200), false),
         new ClawAttack(60, 120,new Point(100,100), false, true),
         new HomingAttack(180, 60, new Point(300,100), true)
      ]),
      new AttackPattern(360, new Coordinates(50,50,50,50, 0),[
         new HomingAttack(60,120,new Point(100,100), false),
         new HomingAttack(60,180,new Point(100,150), false),
         new HomingAttack(180,60,new Point(300,100), true)
      ]),
      new AttackPattern(360, new Coordinates(50,50,50,50, 0),[
         new HomingAttack(60,120,new Point(100,100), false),
         new HomingAttack(180,60,new Point(300,100), true)
      ])
   ]
}

function RunningLoop(){
   box.Update();
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
   martlet.Update();
   if(attackPatterns[currentAttack].duration == 0){
      menu = true;
      box.UpdateCoordinates(menuBox);
      soul.EndAttack();
      var menuTextSamples = ["First attack over","Second attack over","The enemy tries to persist"]
      box.menuText = menuTextSamples[currentAttack];
   }
   else {
      attackPatterns[currentAttack].Update();
      if(attackPatterns[currentAttack].duration < 120 && !soul.dodge.unlocked){
         DodgeCutscene();
      }
   }
}

function DodgeCutscene(){
   if(fps > 0){
      fps-=2;
   }
   if(fps <= 0){
      waitingUntilDodgePressed = true;
      box.textToOutput = "This is a beta version of a cutscene. Press x or shift to dodge. In future, an attack will be moving towards the player that's impossible to avoid without dodging"
      fps=60;
   }
}

function WaitUntilDodgePressed(){
   if (dodge){
      waitingUntilDodgePressed = false
      box.textToOutput = "";
      soul.dodge.unlocked = true;
      soul.dodge.cooldown = 120;
      soul.dodge.left = false;
      soul.dodge.right = false;
      soul.dodge.up = true;
      soul.dodge.down = false;
   }
   else{
      setTimeout(WaitUntilDodgePressed, 1000/60);
   }
}

function Draw(){
   DrawBorders();
   soul.Draw();
   box.Draw();
   for(var i=0;i<4;i++){
      var textToOutput="";
      if(soul.menuText[i]!=""){
         textToOutput = "*" + soul.menuText[i]
      }
      UpdateRect('.MenuButton'+i, new Coordinates(soul.selectionCoords.x[i%2] + 30, soul.selectionCoords.y[i>1?1:0], 100, 20, 0), true);
      document.getElementById("MenuButton"+i)!.innerHTML = textToOutput;
   }

   UpdateRect('.SoulHp', new Coordinates(344, 500, 150*soul.hp/92, 25, 0), true);
   UpdateRect('.SoulHpRed', new Coordinates(344, 500, 150, 25, 0), true);
   UpdateRect('.MartletHp', new Coordinates(200, 20, 400*martlet.hp/martlet.maxHp, 10, 0), true);
   UpdateRect('.MartletHpRed', new Coordinates(200, 20, 400, 10, 0), true);

   UpdateRect('.HpNumber', new Coordinates(530, 504, 200, 18, 0), true);
   document.getElementById("HpNumber")!.innerHTML = soul.hp;
   UpdateRect(".Fight", new Coordinates(40, 540, 136, 51, 0), true);
   UpdateRect(".Act", new Coordinates(231, 540, 136, 51, 0), true);
   UpdateRect(".Item", new Coordinates(431, 540, 136, 51, 0), true);
   UpdateRect(".Mercy", new Coordinates(625, 540, 136, 51, 0), true);
   UpdateRect(".AutoShoot", new Coordinates(700, 500, 50, 20, 0), soul.autoShoot);
   UpdateRect(".MiscText", new Coordinates(37, 504, 587, 18, 0), true);
   attackPatterns[currentAttack].Draw();
}