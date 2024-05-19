class Attack{
    coordinates = new Coordinates(0,0,0,0,0);

    activation = 0;
    duration = 0;
    
    vx = 0;
    vy = 0;

    dissapearOnHit = false;

    image = "TempAttack"

    constructor(ractivation, rduration, rPoint, rdissapearOnHit = false){
        this.activation = ractivation;
        this.duration = rduration;
        this.coordinates.x = rPoint.x;
        this.coordinates.y = rPoint.y;
        this.dissapearOnHit = rdissapearOnHit;
    }

    Update() {
        if(this.activation > 0) {
            this.activation --;
        }
        else if(this.duration > 0) {
            if(this.vy == 0){
                this.coordinates.angle = 0;
            }
            else{
                this.coordinates.angle = Math.atan(this.vx/-this.vy) * (180 / Math.PI); //vy is negative because the js y coordniate goes up as it goes down, vx/vy instead of vy/vx because I need the angle from the bearing
            }
            if(this.vy > 0){
                this.coordinates.angle += 180;
            }

            this.UpdateActive();
        }
    }
    
    UpdateActive(){
        this.duration--;

        this.coordinates.x += this.vx;
        this.coordinates.y += this.vy;

        if (CompareCollisionOfTwoObjects(soul.coordinates, this.coordinates)) { 
            if(this.dissapearOnHit){
                this.duration = 0;
            }
            soul.Hit();
        }
    }

    CheckIfShot(){
        for(let i=0; i < 10; i++){
            if(soul.shots[i].IsHittingCoordinates(this.coordinates)){
                this.IsShot(i);
                break;
            }
        }
    }
    IsShot(shotThatHit){ //This is a function so it can be overwritten by wing attacks
        this.duration = 0;
    }

    CanDraw(){
        return this.activation == 0 && this.duration > 0;
    }
}

class HomingAttack extends Attack {
    homingDuration = 0;
    constructor(ractivation, rduration, rPoint, rdissapearOnHit){
        super(ractivation, rduration, rPoint, rdissapearOnHit);
        this.homingDuration = 30; //I think this is the same for all homing attacks
        this.coordinates.width = 10;
        this.coordinates.height = 30;
    }
    UpdateActive(){
        //If still getting ready to hoam, change direction
        if(this.homingDuration > 0){
            let midpoint = new Point(this.coordinates.x + this.coordinates.width/2, this.coordinates.y + this.coordinates.height/2);
            let distances = new Point(soul.coordinates.x + soul.coordinates.width / 2 - midpoint.x, soul.coordinates.y + soul.coordinates.height / 2 - midpoint.y)
            this.vx = 5 * distances.x/(Math.abs(distances.x) + Math.abs(distances.y));
            this.vy = 5 * distances.y/(Math.abs(distances.x) + Math.abs(distances.y));
            this.homingDuration--;
        }
        else{
            super.UpdateActive();
        }
    }
}

class Square extends Attack {
    shootable = false;
    constructor(ractivation, rduration, rPoint, rdissapearOnHit, rShootable = false){
        super(ractivation, rduration, rPoint, rdissapearOnHit);
        this.coordinates.width = 20;
        this.coordinates.height = 20;
        this.vx = 0;
        this.vy = 0;
        this.shootable = rShootable;
    }
    UpdateActive(){
        super.UpdateActive();
        if(this.shootable){
            this.CheckIfShot();
        }
    }
}

class ClawAttack extends Attack {
    waitDuration = 0;
    facingLeft = false;
    constructor(ractivation, rWaitDuration, rPoint, rdissapearOnHit, rFacingLeft = false){
        super(ractivation, 30, rPoint, rdissapearOnHit);
        this.waitDuration = rWaitDuration;
        this.facingLeft = rFacingLeft;
        this.coordinates.width = 20;
        this.coordinates.height = 20;
        this.duration = 30;
        this.vx = this.facingLeft?-2:2;
        this.vy = 2;
    }
    UpdateActive(){
        if(this.waitDuration > 0){
            this.coordinates.x = soul.coordinates.x + (this.facingLeft?30:-30);
            this.coordinates.y = soul.coordinates.y - 30;
            this.waitDuration--;
        }
        else{
            super.UpdateActive();
        }
    }
}