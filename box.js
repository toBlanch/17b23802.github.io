class Box{
    x = 0;
    y = 0;
    width = 0;
    height = 0;

    fullTextToOutput = "";
    charactersOutputted = 0;
    textToOutput = "";
    maxFramesBeforeNextCharacter = 2;
    framesBeforeNextCharacter = 0;

    menuText = "";
    menuHeld = false;

    UpdateCoordinates(rCoordinates){
        this.x = rCoordinates.x;
        this.y = rCoordinates.y;
        this.width = rCoordinates.width;
        this.height = rCoordinates.height;
    }

    TextUpdate(){
        if(!soul.menuItem.selectedMenuItem){
            if(soul.menuItem.x != -1){
                this.fullTextToOutput = "";
                this.textToOutput = "";
            }
            else if(this.textToOutput!=this.menuText){
                this.fullTextToOutput = this.menuText;
            }
        }
        if (this.charactersOutputted>=this.fullTextToOutput.length) { //If outputted all characters
            this.fullTextToOutput = "";
            this.charactersOutputted = 0;
        }
        else {
            if(this.framesBeforeNextCharacter == 0){
                this.charactersOutputted++;
                this.framesBeforeNextCharacter = this.maxFramesBeforeNextCharacter;
                box.textToOutput = box.fullTextToOutput.substring(0,box.charactersOutputted)
            }
            else{
                this.framesBeforeNextCharacter--;
            }
        }
    }

    SoulUpdate(){
        if (soul.x < this.x) { //If left of  box
          soul.x = this.x;
        }
        else if (soul.x + soul.width > this.x + this.width) { //If right of box
           soul.x = this.x + this.width - soul.width;
        }
        if (soul.y < this.y) { //If ontop of box
           soul.y = this.y;
        }
        else if (soul.y + soul.height > this.y + this.height) { //If under box
           soul.y = this.y + this.height - soul.height;
        }
    }

    Draw() {
        UpdateRect('.Box', this.x, this.y, this.width, this.height, true);
        document.getElementById("Box").innerHTML = this.textToOutput;
    }
}