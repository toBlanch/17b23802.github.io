class AttackPattern{
    duration = 1000;
    boxCoordinates = new Coordinates(0,0,0,0);
    attacks = [new HomingAttack(0,0,0,0,0,0,0,0)];

    constructor(rduration, rboxCoordinates, rattacks){
        this.duration = rduration;
        this.boxCoordinates = rboxCoordinates;
        this.attacks = rattacks;
    }

    Update() {
        let hitAttack = false;
        if(this.duration <= 0) {
            return false;
        }
        else {
            this.duration--;
            for(let i = 0; i < this.attacks.length; i++) {
                if(this.attacks[i].Update(soul)){
                    hitAttack = true;
                }
            }
        }
        return hitAttack;
    }

    Draw() {
        for(let i = 0; i < this.attacks.length; i++){
            if(this.attacks[i].activation == 0){
                var rotationAngle = Math.tan(this.attacks[i].vx/this.attacks[i].vy);
                UpdateRect(".Attack" + i, this.attacks[i].x, this.attacks[i].y, this.attacks[i].width, this.attacks[i].height, this.attacks[i].duration > 0, rotationAngle);
            }
        }
    }
}