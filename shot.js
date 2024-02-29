class Shot{
    x=0;
    y=0;
    big = false;
    active = false;

    Activate(rx, ry, rbig){
        this.x = rx;
        this.y = ry;
        this.big = rbig;
        this.active = true;
    }

    Update(){
        if(this.active){
            if(this.y + 10 * (1 + this.big) < 0){
                this.active = false;
            }
            else{
                this.y--;
            }
        }
    }
}