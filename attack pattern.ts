class AttackPattern {
    duration = 1000;
    boxCoordinates = new Coordinates(0, 0, 0, 0);
    attacks = [new HomingAttack(0, 0, 0, 0)];

    constructor(rduration, rboxCoordinates, rattacks) {
        this.duration = rduration;
        this.boxCoordinates = rboxCoordinates;
        this.attacks = rattacks;
    }

    Update() {
        if (this.duration <= 0) {
            return false;
        }
        else {
            this.duration--;
            for (let i = 0; i < this.attacks.length; i++) {
                this.attacks[i].Update();
            }
        }
    }

    Draw() {
        for (let i = 0; i < this.attacks.length; i++) {
            (document.getElementById("Attack" + i)! as any).src = "Images/" + this.attacks[i].image + ".png";
            UpdateRect(".Attack" + i, this.attacks[i].coordinates, this.attacks[i].CanDraw() && this.duration > 0);
        }
    }
}