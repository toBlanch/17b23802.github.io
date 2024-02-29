class Soul{
    invincibility = 0;
    x = 0;
    y = 0;
    vx = 0;
    vy = 0;

    dodge = {
        duration: 30,
        cooldown: 0,
        left: false,
        right: false,
        up: false,
        down: false,
        held: false
    }

    smallShot = {
        width: 10,
        height: 10
    }
    bigShot = {
        width: 20,
        height: 20
    }
    shootCooldown = 0;
    shots = [new Shot, new Shot, new Shot, new Shot, new Shot, new Shot, new Shot, new Shot, new Shot, new Shot];
    shootHeldDuration = false;

    constructor(x, y, width, height, hp){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.hp = hp;
    }
    Update(left, right, up, down, dodge, shoot){
        if (this.dodge.cooldown >= 120 - this.dodge.duration) { //If dodging
            this.x += 15*this.dodge.right - 15*this.dodge.left;
            this.y += 15*this.dodge.down - 15*this.dodge.up;
        }
        else { //If not dodging
            this.x += 10*right - 10*left;
            this.y += 10*down - 10*up;
        }

        if (this.x < box.x + box.border) { //If left of  box
           this.x = box.x + box.border;
        }
        else if (this.x + this.width > box.width - box.border) { //If right of box
           this.x = box.width - this.width + box.border;
        }
        if (this.y < box.y + box.border) { //If ontop of box
           this.y = box.y + box.border;
        }
        else if (this.y + this.height > box.height - box.border) { //If under box
           this.y = box.height - this.height + box.border;
        }

        if (dodge && this.dodge.cooldown <= 0 && !this.dodge.held && (left||right||up||down)) { //If a dodge should start
            this.dodge.cooldown=120;
            this.dodge.left = left;
            this.dodge.right = right;
            this.dodge.up = up;
            this.dodge.down = down;
        }

        if (!shoot && this.shootHeldDuration > 0 && this.shootCooldown <= 0) { //If a shot should be fired
            for(let i = 0; i < 10; i++){
                if(!this.shots[i].active){
                    if(this.shootHeldDuration>60){ //If a big shot
                        this.shots[i].Activate(this.x + this.width/2 - this.bigShot.width/2, this.y + this.height/2 - this.bigShot.height/2, true);
                    }
                    else{ //If a small shot
                        this.shots[i].Activate(this.x + this.width/2 - this.smallShot.width/2, this.y + this.height/2 - this.bigShot.height/2, false);
                    }
                    this.shootCooldown = 60;
                    break;
                }
            }
        }
        
        for(let i = 0; i < 10; i++){
            this.shots[i].Update();
        }

        this.dodge.held = dodge;
        this.dodge.cooldown--;

        this.shootHeldDuration = this.shootHeldDuration*shoot + shoot*(this.shootCooldown<=0);
        this.shootCooldown--;
    }
    Draw(){
        UpdateRect('.Soul', this.x, this.y, this.width, this.height, 0)
        for(let i = 0; i < 10; i++){
            UpdateRect(".Shot" + i, this.shots[i].x, this.shots[i].y, 10 * (1 + this.shots[i].big), 10 * (1 + this.shots[i].big));
        }
    }
}