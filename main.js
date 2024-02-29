function Starter(){
   soul = new Soul(100, 100, 10, 10, 92)
   box = new Box(0, 0, 800, 600, 1);
   Loop()
}

function Loop(){
   const d = new Date();
   startTime = Math.round(d.getTime())

   Update();
   Draw();

   setTimeout(Loop, 1000/60 - (Math.round(d.getTime()) - startTime));
}

function Update(){
   soul.Update(left, right, up, down, dodge, shoot);
}

function Draw(){
   soul.Draw();
   UpdateRect('.Box', box.x, box.y, box.width, box.height, box.border);
   UpdateRect('.Hp', 200, 500, 400*soul.hp/92, 50, 0);
   document.getElementById("HpNumber").innerHTML = soul.hp;
}

function test(){
   const element = document.querySelector('.Soul');
   element.style.backgroundColor = "blue";
}
