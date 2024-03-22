class Shot{
    x=0;
    y=0;
    big = false;
    duration = 0;

    Activate(rx, ry, rbig){
        this.x = rx;
        this.y = ry;
        this.big = rbig;
        this.duration = 10000 * !this.big + 20*7;
    }

    Update(){
        if(this.duration > 0){
            if(this.big){
                this.x = soul.x + soul.width/2 - soul.bigShot.width/2;
                this.y = soul.y + soul.height/2 - soul.bigShot.height;
                this.duraiton--;
            }
            else{
                if(this.y + 10 * (1 + this.big) < 0){
                    this.duraiton = 0;
                }
                else{
                    this.y--;
                }
            }
        }
    }
}