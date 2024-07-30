class Box {
    coordinates = new Coordinates(0, 0, 0, 0, 0);
    referredCoordinates = new Coordinates(0, 0, 0, 0, 0);

    fullTextToOutput = "";
    charactersOutputted = 0;
    textToOutput = "";
    maxFramesBeforeNextCharacter = 2;
    framesBeforeNextCharacter = 0;

    menuText = "";
    menuHeld = false;

    UpdateCoordinates(rCoordinates) {
        this.referredCoordinates = rCoordinates;
    }

    TextUpdate() {
        if (!soul.menuItem.selectedMenuItem) {
            if (soul.menuItem.x != -1) {
                this.fullTextToOutput = "";
                this.textToOutput = "";
            }
            else if (this.textToOutput != this.menuText) {
                this.fullTextToOutput = this.menuText;
            }
        }
        if (this.charactersOutputted >= this.fullTextToOutput.length) { //If outputted all characters
            this.fullTextToOutput = "";
            this.charactersOutputted = 0;
        }
        else {
            if (this.framesBeforeNextCharacter == 0) {
                this.charactersOutputted++;
                this.framesBeforeNextCharacter = this.maxFramesBeforeNextCharacter;
                box.textToOutput = box.fullTextToOutput.substring(0, box.charactersOutputted)
            }
            else {
                this.framesBeforeNextCharacter--;
            }
        }
    }

    SoulUpdate() {
        if (soul.coordinates.x < this.coordinates.x) { //If left of  box
            soul.coordinates.x = this.coordinates.x;
        }
        else if (soul.coordinates.x + soul.coordinates.width > this.coordinates.x + this.coordinates.width) { //If right of box
            soul.coordinates.x = this.coordinates.x + this.coordinates.width - soul.coordinates.width;
        }
        if (soul.coordinates.y < this.coordinates.y) { //If ontop of box
            soul.coordinates.y = this.coordinates.y;
        }
        else if (soul.coordinates.y + soul.coordinates.height > this.coordinates.y + this.coordinates.height) { //If under box
            soul.coordinates.y = this.coordinates.y + this.coordinates.height - soul.coordinates.height;
        }
    }

    Update() { //Updates position relative to the coordinates it should move to
        let distanceFromIntendedCoordinates = new Coordinates(this.referredCoordinates.x - this.coordinates.x, this.referredCoordinates.y - this.coordinates.y, this.referredCoordinates.width - this.coordinates.width, this.referredCoordinates.height - this.coordinates.height)
        if (Math.abs(distanceFromIntendedCoordinates.x) < 5) {
            this.coordinates.x = this.referredCoordinates.x;
        }
        else {
            this.coordinates.x += distanceFromIntendedCoordinates.x * 0.1;
        }

        if (Math.abs(distanceFromIntendedCoordinates.y) < 5) {
            this.coordinates.y = this.referredCoordinates.y;
        }
        else {
            this.coordinates.y += distanceFromIntendedCoordinates.y * 0.1;
        }

        if (Math.abs(distanceFromIntendedCoordinates.width) < 5) {
            this.coordinates.width = this.referredCoordinates.width;
        }
        else {
            this.coordinates.width += distanceFromIntendedCoordinates.width * 0.1;
        }

        if (Math.abs(distanceFromIntendedCoordinates.height) < 5) {
            this.coordinates.height = this.referredCoordinates.height;
        }
        else {
            this.coordinates.height += distanceFromIntendedCoordinates.height * 0.1;
        }
    }

    Draw() {
        UpdateRect('.Box', this.coordinates, 100);
        document.getElementById("Box")!.innerHTML = this.textToOutput;
    }
}