class Shot {
    coordinates = new Coordinates(0, 0, 0, 0, 0);
    big = false;
    duration = 0;
    Activate(rCoordinates, rbig) {
        this.coordinates = rCoordinates;
        this.big = rbig;
        this.duration = this.big ? 20 * 7 : 10000;
    }
    Update() {
        if (this.duration > 0) {
            if (this.big) {
                this.coordinates.x = soul.coordinates.x + soul.coordinates.width / 2 - soul.bigShot.width / 2;
                this.coordinates.y = soul.coordinates.y + soul.coordinates.height / 2 - soul.bigShot.height;
                this.duration--;
            }
            else {
                if ((this.coordinates.y + (this.big ? 20 : 10)) < 0) {
                    this.duration = 0;
                }
                else {
                    this.coordinates.y--;
                }
            }
        }
    }
    IsHitboxActive() {
        return this.duration > 0 && (!this.big || this.duration % 20 == 0);
    }
    IsHittingCoordinates(coordniates) {
        let returnValue = this.IsHitboxActive() && CompareCollisionOfTwoObjects(coordniates, this.coordinates);
        if (returnValue && !this.big) {
            this.duration = 0;
        }
        return returnValue;
    }
}
