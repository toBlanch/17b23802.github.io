class Attack{
    activation = 0;
    duration = 0;
    width=0;
    height=0;

    x=0;
    y=0;
    vx=0;
    vy=0;

    dissapearOnHit = false;
    shootable = false;

    constructor(ractivation, rduration, rx, ry, rdissapearOnHit){
        this.activation = ractivation;
        this.duration = rduration;
        this.x = rx;
        this.y = ry;
        this.dissapearOnHit = rdissapearOnHit;
    }
    BaseUpdate() {
        if(this.activation > 0) {
            this.activation --;
        }
        else if(this.duration > 0) {
            this.duration--;
            let hit = false;

            if (
                soul.x + soul.width > this.x && //Right of the soul is past the left of the attack
                soul.x < this.x + this.width && //Left of the soul is behind the right of the attack
                soul.y + soul.height > this.y && //Bottom of the soul is below the top of the attack
                soul.y < this.y + this.height //Top of the soul is behind the bottom of the attack
            ) { 
                if(this.dissapearOnHit){
                    this.duration = 0;
                }
                hit = true;
            }

            this.x += this.vx;
            this.y += this.vy;

            return hit;
        }
    }
}

class HomingAttack extends Attack {
    homingDuration = 0;
    width = 10;
    height = 30;
    vx = 5;
    xy = 10;
    Update(){
        //If still getting ready to hoam, change direction
        return this.BaseUpdate();
    }
}

class Square extends Attack {
    shootable = false;
    width = 20;
    height = 20;
    vx = 0;
    vy = 0;

    constructor(ractivation, rduration, rx, ry, rdissapearOnHit, rShootable){
        super(ractivation, rduration, rvx, rvy, rdissapearOnHit);
        this.shootable = rShootable;
    }
    Update(){
        //If still homing, change direction
        return this.BaseUpdate();
    }
}