class Soul {
    invincibility = 0;
    coordinates = new Coordinates(0, 0, 0, 0, 0);
    vx = 0;
    vy = 0;
    hp = 92;
    maxhp = 92;

    dodge = {
        unlocked: false,
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
    autoShoot = false;

    items = ["Gunpowder", "FL Cupcake", "FL Cupcake", "FL Cupcake", "Cnm. Cookie", "G Granola", "G Granola", "G Granola"]
    itemsDictionary = {
        "Gunpowder": { health: 99 },
        "FL Cupcake": { health: 50 },
        "Cnm. Cookie": { health: 35 },
        "G Granola": { health: 30 },
    }

    menuItem = {
        button: 1,
        x: -1,
        y: -1,
        secondPage: false,
        selectedName: false,
        selectedMenuItem: false
    }
    buttonCoords = {
        x: [50, 241, 441, 635],
        y: 555
    }
    selectionCoords = {
        x: [130, 530],
        y: [350, 430]
    }
    attackUnlocked = false;
    startNextAttack = false;

    menuText = ["", "", "", ""]
    menuLabels = {
        fight: ["Martlet", "", "", ""],
        act: ["Martlet", "", "", ""],
        actName: ["Check", "Remind", "", ""],
        item: [this.items[0], this.items[1], this.items[2], this.items[3]],
        itemSecond: [this.items[4], this.items[5], this.items[6], this.items[7]],
        mercy: ["Spare", "", "", ""],
        none: ["", "", "", ""]
    }


    constructor(rCoordinates, hp) {
        this.coordinates = rCoordinates;
        this.hp = hp;
    }

    MenuUpdate() {
        if (this.menuItem.selectedMenuItem) { //If selected an option
            if (box.charactersOutputted == box.fullTextToOutput.length) { //If all the text has been output
                if (shoot && !shootHeld || box.textToOutput == "") { //If starting the next attack
                    this.menuItem.selectedMenuItem = false;
                    this.menuItem.secondPage = false;
                    this.startNextAttack = true;
                    this.dodge.cooldown = 0;
                    this.shootHeldDuration = this.autoShoot ? 0 : -10000; //Makes it so that a shot isn't fired as soon as the attack starts unless auto shoot is active
                    this.vx = 0;
                    this.vy = 0;
                    this.invincibility = 0;
                    this.shootCooldown = 0;
                    this.menuItem.x = -1;
                    this.menuItem.y = -1;
                    box.fullTextToOutput = "";
                    box.textToOutput = "";
                    this.coordinates.angle = 180;
                }
            }
            else if (dodge && !dodgeHeld) { //If speeding up the text
                box.charactersOutputted = box.fullTextToOutput.length - 1;
                box.framesBeforeNextCharacter = 0;
            }
        }
        else if (this.menuItem.x != -1) { //If pressed a button
            if (dodge && !dodgeHeld) { //Delect pressed
                if (this.menuItem.selectedName) {
                    this.menuItem.x = 0;
                    this.menuItem.selectedName = false;
                    this.menuText = this.menuLabels.act;
                }
                else {
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
                    else {
                        this.menuItem.x = 0;
                    }
                }
                else if (right && !rightHeld) {
                    if (this.menuItem.x == 1 && this.items[4] != "" && this.menuItem.secondPage == false && this.menuItem.button == 2) { //Next page
                        if (this.menuItem.y == 1 && this.items[6] == "") {
                            this.menuItem.y = 0;
                        }
                        this.menuItem.secondPage = true;
                        this.menuText = this.menuLabels.itemSecond;
                        this.menuItem.x = 0;
                    }
                    else if (this.menuText[1 + 2 * this.menuItem.y] != "") {
                        this.menuItem.x = 1;
                    }
                }
                else if (up && !upHeld) {
                    if (this.menuItem.y == 1 && this.menuText[this.menuItem.x] != "") {
                        this.menuItem.y = 0;
                    }
                }
                else if (down && !downHeld) {
                    if (this.menuItem.y == 0 && this.menuText[2 + this.menuItem.x] != "") {
                        this.menuItem.y = 1;
                    }
                }
                this.coordinates.x = this.selectionCoords.x[this.menuItem.x]
                this.coordinates.y = this.selectionCoords.y[this.menuItem.y]
            }
            else { //Button pressed
                if (this.menuItem.button == 1 && !this.menuItem.selectedName) {
                    this.menuItem.selectedName = true;
                    this.menuText = this.menuLabels.actName;
                }
                else {
                    if (this.menuItem.button == 0) {
                        //Fight code
                    }
                    else if (this.menuItem.button == 1) {
                        if (this.menuItem.x == 0) {
                            box.fullTextToOutput = "Martlet - 1atk 1def. The easiest enemy, can't dodge forever"
                        }
                        else {
                            box.fullTextToOutput = "You remind Martlet of something. I can't remember what though"
                        }
                    }
                    else if (this.menuItem.button == 2) {
                        let itemConsumedIndex = (this.menuItem.secondPage ? 4 : 0) + this.menuItem.y * 2 + this.menuItem.x;
                        let itemConsumed = this.items[itemConsumedIndex];
                        this.items[itemConsumedIndex] = "";
                        for (let j = itemConsumedIndex; j < this.items.length - 1; j++) {
                            [this.items[j], this.items[j + 1]] = [this.items[j + 1], this.items[j]];
                        }
                        this.menuLabels.item = [this.items[0], this.items[1], this.items[2], this.items[3]]; //Update labels
                        this.menuLabels.itemSecond = [this.items[4], this.items[5], this.items[6], this.items[7]];

                        this.hp += this.itemsDictionary[itemConsumed].health;
                        if (this.hp >= this.maxhp) {
                            this.hp = this.maxhp;
                            box.fullTextToOutput = "You ate the " + itemConsumed + ", you recovered to full hp";
                        }
                        else {
                            box.fullTextToOutput = "You ate the " + itemConsumed + ", you restored " + this.itemsDictionary[itemConsumed].health + "Hp";
                        }
                    }
                    //Else if mercy =)
                    this.menuText = ["", "", "", ""]
                    this.menuItem.selectedMenuItem = true;
                }
            }
        }
        else if (shoot) { //If pressing a button
            this.menuItem.y = 0;
            this.menuItem.x = 0;
            if (this.menuItem.button == 0) { //Fight
                this.menuText = this.menuLabels.fight;
            }
            else if (this.menuItem.button == 1) { //Act
                this.menuText = this.menuLabels.act;
            }
            else if (this.menuItem.button == 2) { //Item
                this.menuText = this.menuLabels.item;
            }
            else if (this.menuItem.button == 3) { //Mercy
                this.menuText = this.menuLabels.mercy;
            }
        }
        else { //If on the buttons
            if (left && !leftHeld) {
                if (this.menuItem.button > 0) {
                    if (this.attackUnlocked || this.menuItem.button != 1) {
                        this.menuItem.button--;
                    }
                }
                else {
                    this.menuItem.button = 3;
                }
            }
            if (right && !rightHeld) {
                if (this.menuItem.button < 3) {
                    this.menuItem.button++;
                }
                else if (this.attackUnlocked) {
                    this.menuItem.button = 0;
                }
            }
            this.coordinates.x = this.buttonCoords.x[this.menuItem.button];
            this.coordinates.y = this.buttonCoords.y;
        }
    }

    AttackUpdate() {
        if (this.dodge.cooldown >= 120 - this.dodge.duration) { //If dodging
            this.coordinates.x += (this.dodge.right ? 15 : 0) - (this.dodge.left ? 15 : 0);
            this.coordinates.y += (this.dodge.down ? 15 : 0) - (this.dodge.up ? 15 : 0);
        }
        else { //If not dodging
            this.coordinates.x += (right ? 10 : 0) - (left ? 10 : 0);
            this.coordinates.y += (down ? 10 : 0) - (up ? 10 : 0);
        }

        if (dodge && this.dodge.unlocked && this.dodge.cooldown <= 0 && !dodgeHeld && (left || right || up || down)) { //If a dodge should start
            this.dodge.cooldown = 120;
            this.dodge.left = left;
            this.dodge.right = right;
            this.dodge.up = up;
            this.dodge.down = down;
        }

        if (!shoot && this.shootHeldDuration > 0 && this.shootCooldown <= 0) { //If a shot should be fired
            for (let i = 0; i < 10; i++) {
                if (this.shots[i].duration == 0) {
                    let big = this.shootHeldDuration >= 60;
                    var newShotWidth = big ? this.bigShot.width : this.smallShot.width;
                    var newShotHeight = big ? this.bigShot.height : this.smallShot.height;
                    this.shots[i].Activate(new Coordinates(this.coordinates.x + this.coordinates.width / 2 - newShotWidth / 2, this.coordinates.y + this.coordinates.height / 2 - newShotHeight, newShotWidth, newShotHeight), big);
                    this.shootCooldown = 60;
                    break;
                }
            }
        }

        for (let i = 0; i < 10; i++) {
            this.shots[i].Update(); //Update all shots
        }

        this.shootHeldDuration = ((shoot || this.autoShoot) ? 1 : 0) * (this.shootHeldDuration + ((this.shootCooldown <= 0) ? 1 : 0)); //Increases the duration if shooting and shot is off cooldown
        this.shootCooldown--;
        this.dodge.cooldown--;
        this.invincibility--;
    }

    Hit() {
        if (this.dodge.cooldown < 120 - this.dodge.duration && this.invincibility <= 0) {
            this.invincibility = 100;
            this.hp -= damage;
        }
    }

    EndAttack() {
        for (let i = 0; i < this.shots.length; i++) {
            this.shots[i].duration = 0;
        }
        this.coordinates.angle = 0;
    }

    Draw() {
        UpdateRect('.Soul', this.coordinates, true);
        for (let i = 0; i < this.shots.length; i++) {
            // var shotID = document.getElementById(".Shot" + i);
            // if(this.shots[i].big){
            //     shotID.src="";
            //     shotID.style.backgroundColor = "yellow";
            // }
            // else{
            //     shotID.src="Images/TempShot.png";
            //     shotID.style.backgroundColor = "none";
            // }
            if (this.shots[i].big) {
                (document.getElementById("Shot" + i)! as any).src = "";
                document.getElementById("Shot" + i)!.style.backgroundColor = "yellow";
            }
            else {
                (document.getElementById("Shot" + i)! as any).src = "Images/TempShot.png";
                document.getElementById("Shot" + i)!.style.backgroundColor = "none";
            }
            UpdateRect(".Shot" + i, this.shots[i].coordinates, this.shots[i].duration > 0);
        }
    }
}