function xNormalisation(x) {
    if (window.innerWidth / 4 <= window.innerHeight / 3) { //If the relative width is less than relative height
        return x / 800 * 100; //Render as normal
    }
    else { //Else, scale
        var lowerBound = (window.innerWidth - window.innerHeight * 4 / 3) / window.innerWidth * 100 / 2; //The minimum x value as a percentage
        var centreReigon = (100 - lowerBound * 2) / 100;
        return lowerBound + centreReigon * x / 800 * 100;
    }
}

function yNormalisation(y) {
    if (window.innerWidth / 4 >= window.innerHeight / 3) { //If the relative height is less than relative width
        return y / 600 * 100; //Render as normal
    }
    else { //Else, scale
        var lowerBound = (window.innerHeight - window.innerWidth * 3 / 4) / window.innerHeight * 100 / 2; //The minimum x value as a percentage
        var centreReigon = (100 - lowerBound * 2) / 100;
        return lowerBound + centreReigon * y / 600 * 100;
    }
}

function UpdateRect(elementText, coordinates, display) {
    const element = document.querySelector(elementText);
    element.style.left = xNormalisation(coordinates.x) + "%";
    element.style.top = yNormalisation(coordinates.y) + "%";
    element.style.width = xNormalisation(coordinates.x + coordinates.width) - xNormalisation(coordinates.x) + "%";
    element.style.height = yNormalisation(coordinates.y + coordinates.height) - yNormalisation(coordinates.y) + "%";

    if (display) {
        element.style.display = "initial";
    }
    else {
        element.style.display = "none";
    }

    element.style.rotate = coordinates.angle + "deg"
}

function DrawBorders() {
    var lowerBound = (window.innerHeight - window.innerWidth * 3 / 4) / window.innerHeight * 100 / 2; //The minimum x value as a percentage
    const border1 = document.querySelector('.Border1')!;
    const border2 = document.querySelector('.Border2')!;
    if (window.innerWidth / 4 <= window.innerHeight / 3) { //If borders should be at the top and bottom
        var lowerBound = (window.innerHeight - window.innerWidth * 3 / 4) / window.innerHeight * 100 / 2; //The minimum x value as a percentage
        (border1 as any).style.left = "0%";
        (border1 as any).style.top = "0%";
        (border1 as any).style.width = "100%";
        (border1 as any).style.height = lowerBound + "%";

        (border2 as any).style.left = "0%";
        (border2 as any).style.top = 100 - lowerBound + "%";
        (border2 as any).style.width = "100%";
        (border2 as any).style.height = "100%";

    }
    else { //If borders should be at the left and right
        var lowerBound = (window.innerWidth - window.innerHeight * 4 / 3) / window.innerWidth * 100 / 2; //The minimum x value as a percentage
        (border1 as any).style.left = "0%";
        (border1 as any).style.top = "0%";
        (border1 as any).style.width = lowerBound + "%";
        (border1 as any).style.height = "100%";

        (border2 as any).style.left = 100 - lowerBound + "%";
        (border2 as any).style.top = "0%";
        (border2 as any).style.width = "100%";
        (border2 as any).style.height = "100%";
    }
}