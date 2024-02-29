class Box{
    constructor(x, y, width, height, border){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.border = border;
    }
    Draw(){
        UpdateRect('.Box', x, y, width, height, border)
    }
}