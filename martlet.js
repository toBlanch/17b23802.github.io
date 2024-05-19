class Martlet {
    coordinates = new Coordinates(200, 200, 400, 100, 0);
    hp = 300;
    maxHp = 300;
    Update() {
        for (let i = 0; i < soul.shots.length; i++) {
            if (soul.shots[i].IsHittingCoordinates(this.coordinates)) {
                this.hp -= 3;
            }
        }
    }
}
