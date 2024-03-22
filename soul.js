class Soul{
    invincibility = 0;
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    vx = 0;
    vy = 0;
    hp = 92;
    maxhp = 92;

    dodge = {
        duration: 30,
        cooldown: 0,
        left: false,
        right: false,
        up: false,
        down: false
    }

    smallShot = {
        width: 10,
        height: 10
    }
    bigShot = {
        width: 20,
        height: 600
    }

    shootCooldown = 0;
    shots = [new Shot, new Shot, new Shot, new Shot, new Shot, new Shot, new Shot, new Shot, new Shot, new Shot];
    shootHeldDuration = 0;

    items = ["Gunpowder", "FL Cupcake","FL Cupcake","FL Cupcake","Cnm. Cookie","G Granola","G Granola","G Granola"]
    itemsHealth = [
        ["Gunpowder",99],
        ["FL Cupcake",50],
        ["Cnm. Cookie",35],
        ["G Granola",30]
    ]

    menuItem = {
        button: 1,
        x: -1,
        y: -1,
        secondPage: 0,
        selectedName: false,
        selectedMenuItem: false
    }
    buttonCoords = {
        x: [50, 241, 441, 635],
        y: 555
    }
    selectionCoords = {
        x: [130,530],
        y: [350,430]
    }
    attackUnlocked = false;
    startNextAttack = false;

    menuText = ["","", "", ""]
    menuLabels = {
        fight: ["Martlet","","",""],
        act: ["Martlet","","",""],
        actName: ["Check","Remind","",""],
        item: [this.items[0],this.items[1],this.items[2],this.items[3]],
        itemSecond: [this.items[4],this.items[5],this.items[6],this.items[7]],
        mercy: ["Spare","","",""],
        none: ["","","",""]
    }


    constructor(x, y, width, height, hp){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.hp = hp;
    }

    MenuUpdate(){
        if(this.menuItem.selectedMenuItem) { //If selected an option
            if(box.charactersOutputted == box.fullTextToOutput.length){ //If all the text has been output
                if(shoot && !shootHeld || box.textToOutput==""){ //If starting the next attack
                    this.menuItem.selectedMenuItem = false;
                    this.menuItem.secondPage = false;
                    this.startNextAttack = true;
                    this.dodge.cooldown = 0;
                    this.vx = 0;
                    this.vy = 0;
                    this.invincibility = 0;
                    this.shootCooldown = 0;
                    this.menuItem.x = -1;
                    this.menuItem.y = -1;
                    box.fullTextToOutput = "";
                    box.textToOutput = "";
                }
            }
            else if(dodge && !dodgeHeld){ //If speeding up the text
                box.charactersOutputted = box.fullTextToOutput.length - 1;
                box.framesBeforeNextCharacter = 0;
            }
        }
        else if(this.menuItem.x != -1){ //If pressed a button
            if(dodge && !dodgeHeld){ //Delect pressed
                if(this.menuItem.selectedName){
                    this.menuItem.x = 0;
                    this.menuItem.selectedName = false;
                    this.menuText = this.menuLabels.act;
                }
                else{
                    this.menuItem.x = -1;
                    this.menuItem.y = -1;
                    this.menuText = this.menuLabels.none;
                }
            }
            else if (!(shoot && !shootHeld)) { //Neither select or deselect pressed
                if (left && !leftHeld) {
                    if (this.menuItem.x == 0 && this.menuItem.secondPage == true && this.menuItem.button == 2) { //Previous page
                        this.menuItem.secondPage = false;
                        this.menuText = this.menuLabels.item;
                        this.menuItem.x = 1;
                    }
                    else{
                        this.menuItem.x = 0;
                    }
                }
                else if (right && !rightHeld){
                    if(this.menuItem.x == 1 && this.items[4]!="" && this.menuItem.secondPage == false && this.menuItem.button == 2){ //Next page
                        if(this.menuItem.y==1 && this.items[6]==""){
                            this.menuItem.y=0;
                        }
                        this.menuItem.secondPage = true;
                        this.menuText = this.menuLabels.itemSecond;
                        this.menuItem.x = 0;
                    }
                    else if(this.menuText[1 + 2*this.menuItem.y]!=""){
                        this.menuItem.x = 1;
                    }
                }
                else if (up && !upHeld){
                    if(this.menuItem.y == 1 && this.menuText[this.menuItem.x]!=""){
                        this.menuItem.y = 0;
                    }
                }
                else if (down && !downHeld){
                    if(this.menuItem.y == 0 && this.menuText[2+this.menuItem.x]!=""){
                        this.menuItem.y = 1;
                    }
                }
                this.x = this.selectionCoords.x[this.menuItem.x]
                this.y = this.selectionCoords.y[this.menuItem.y]
            }
            else { //Button pressed
                if (this.menuItem.button == 1 && !this.menuItem.selectedName){
                    this.menuItem.selectedName = true;
                    this.menuText = this.menuLabels.actName;
                }
                else {
                    if(this.menuItem.button == 0){
                        //Fight code
                    }
                    else if(this.menuItem.button == 1){
                        if(this.menuItem.x == 0){
                            box.fullTextToOutput = "Martlet - 1atk 1def. The easiest enemy, can't dodge forever"
                        }
                        else{
                            box.fullTextToOutput  = "You remind Martlet of something. I can't remember what though"
                        }
                    }
                    else if(this.menuItem.button == 2){
                        var itemConsumed = this.menuItem.secondPage * 4 + this.menuItem.y * 2 + this.menuItem.x;
                        for(let i = 0; i < this.itemsHealth.length; i++){
                            if(this.itemsHealth[i][0] == this.items[itemConsumed]){
                                this.hp += this.itemsHealth[i][1];
                                if(this.hp >= this.maxhp){
                                    this.hp = this.maxhp;
                                    box.fullTextToOutput = "You ate the "+this.items[itemConsumed]+", you recovered to full hp";
                                }
                                else{
                                    box.fullTextToOutput = "You ate the "+this.items[itemConsumed]+", you restored "+this.itemsHealth[i][1]+"Hp";
                                }
                                this.items[itemConsumed] = "";
                                for(let j=itemConsumed; j < this.items.length - 1; j++){
                                    [this.items[j], this.items[j + 1]] = [this.items[j + 1], this.items[j]];
                                }
                                this.menuLabels.item = [this.items[0],this.items[1],this.items[2],this.items[3]]; //Update labels
                                this.menuLabels.itemSecond = [this.items[4],this.items[5],this.items[6],this.items[7]];
                                break;
                            }
                        }
                    }
                    //Else if mercy =)
                    this.menuText = ["","","",""]
                    this.menuItem.selectedMenuItem = true;
                }
            }
        }
        else if(shoot){ //If pressing a button
            this.menuItem.y = 0;
            this.menuItem.x = 0;
            if(this.menuItem.button == 0){ //Fight
                this.menuText = this.menuLabels.fight;
            }
            else if(this.menuItem.button == 1){ //Act
                this.menuText = this.menuLabels.act;
            }
            else if(this.menuItem.button == 2){ //Item
                this.menuText = this.menuLabels.item;
            }
            else if(this.menuItem.button == 3){ //Mercy
                this.menuText = this.menuLabels.mercy;
            }
        }
        else { //If on the buttons
            if(left && !leftHeld){
                if(this.menuItem.button > 0){
                    if(this.attackUnlocked || this.menuItem.button != 1){
                        this.menuItem.button--;
                    }
                }
                else{
                    this.menuItem.button = 3;
                }
            }
            if(right && !rightHeld){
                if(this.menuItem.button < 3){
                    this.menuItem.button++;
                }
                else if(this.attackUnlocked){
                    this.menuItem.button = 0;
                }
            }
            this.x = this.buttonCoords.x[this.menuItem.button];
            this.y = this.buttonCoords.y;
        }
    }

    AttackUpdate(){
        if (this.dodge.cooldown >= 120 - this.dodge.duration) { //If dodging
            this.x += 15*this.dodge.right - 15*this.dodge.left;
            this.y += 15*this.dodge.down - 15*this.dodge.up;
        }
        else { //If not dodging
            this.x += 10*right - 10*left;
            this.y += 10*down - 10*up;
        }

        if (dodge && this.dodge.cooldown <= 0 && !dodgeHeld && (left||right||up||down)) { //If a dodge should start
            this.dodge.cooldown=120;
            this.dodge.left = left;
            this.dodge.right = right;
            this.dodge.up = up;
            this.dodge.down = down;
        }

        if (!shoot && this.shootHeldDuration > 0 && this.shootCooldown <= 0) { //If a shot should be fired
            for(let i = 0; i < 10; i++){
                if(this.shots[i].duration == 0){
                    let big = this.shootHeldDuration > 60;
                    this.shots[i].Activate(
                        this.x + this.width/2 - (this.smallShot.width * !big + this.bigShot.width * big)/2, 
                        this.y + this.height/2 - (this.smallShot.height * !big + this.bigShot.height * big), 
                        big);
                    this.shootCooldown = 60;
                    break;
                }
            }
        }
        
        for(let i = 0; i < 10; i++){
            this.shots[i].Update(); //Update all shots
        }

        this.shootHeldDuration = this.shootHeldDuration*shoot + shoot*(this.shootCooldown<=0);
        this.shootCooldown--;
        this.dodge.cooldown--;
        this.invincibility--;
    }

    Hit (damage){
        if (this.dodge.cooldown < 120 - this.dodge.duration && this.invincibility <= 0){
            this.invincibility = 100;
            this.hp -= damage;
        }
    }

    EndAttack(){
        for(let i = 0; i < 10; i++){
            this.shots[i].duration = 0;
        }
    }

    Draw(){
        UpdateRect('.Soul', this.x, this.y, this.width, this.height, true, 180*!menu);
        for(let i = 0; i < 10; i++){
            UpdateRect(".Shot" + i, this.shots[i].x, this.shots[i].y, this.smallShot.width * !this.shots[i].big + this.bigShot.width * this.shots[i].big, this.smallShot.height * !this.shots[i].big + this.bigShot.height * this.shots[i].big, this.shots[i].duration > 0);
        }
    }
}