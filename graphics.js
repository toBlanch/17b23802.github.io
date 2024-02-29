function xNormalisation(x, width){
    if(window.innerWidth / 4 <= window.innerHeight / 3) { //If the relative width is less than relative height
        return x/800*100 + "%"; //Render as normal
    }
    else { //Else, scale
        var lowerBound = (window.innerWidth-window.innerHeight*4/3) /window.innerWidth*100/2; //The minimum x value as a percentage
        var mid = 100-lowerBound*2;
        return lowerBound*!width + mid/100*x/800*100 + "%";
    }
}
 
function yNormalisation(y, height){
    if(window.innerWidth / 4 >= window.innerHeight / 3) { //If the relative height is less than relative width
        return y/600*100 + "%"; //Render as normal
    }
    else { //Else, scale
        var lowerBound = (window.innerHeight-window.innerWidth*3/4) /window.innerHeight*100/2; //The minimum x value as a percentage
        var mid = 100 - lowerBound * 2;
        return lowerBound*!height + mid/100 * y/600*100 + "%";
    }
}

function UpdateRect(elementText, x, y, width, height, border){
    const element = document.querySelector(elementText);
    element.style.left = xNormalisation(x, false);
    element.style.top = yNormalisation(y, false);
    element.style.width = xNormalisation(width, true);
    element.style.height = yNormalisation(height, true);
    element.style.border = xNormalisation(border);
}