function DoLinesMeet(line1, line2) {
    return line1.initial <= line2.initial + line2.length && line1.initial + line1.length >= line2.initial;
}

function LineIntersectsCoordinate(line, coordinate) {
    return (coordinate - line.minimum) / (line.length);
}

function ObtainRange(values) {
    var lowerValue = values[0];
    var higherValue = values[0];
    for (var k = 1; k < values.length; k++) {
        if (values[k] < lowerValue) {
            lowerValue = values[k];
        }
        else if (values[k] > higherValue) {
            higherValue = values[k];
        }
    }
    return new Line(lowerValue, higherValue - lowerValue);
}

function ObtainHorizontalRange(points) {
    return ObtainRange([points[0].x, points[1].x, points[2].x, points[3].x])
}

function ObtainVerticalRange(points) {
    return ObtainRange([points[0].y, points[1].y, points[2].y, points[3].y])
}

function ObtainMidpoint(coordinates) {
    return new Point(coordinates.x + coordinates.width / 2, coordinates.y + coordinates.height / 2)
}

function ObtainPoints(coordinates) {
    var midpoint = new Point(coordinates.x + coordinates.width / 2, coordinates.y + coordinates.height / 2);
    return [
        RotatePointAboutPoint(midpoint, new Point(coordinates.x, coordinates.y), coordinates.angle),
        RotatePointAboutPoint(midpoint, new Point(coordinates.x + coordinates.width, coordinates.y), coordinates.angle),
        RotatePointAboutPoint(midpoint, new Point(coordinates.x, coordinates.y + coordinates.height), coordinates.angle),
        RotatePointAboutPoint(midpoint, new Point(coordinates.x + coordinates.width, coordinates.y + coordinates.height), coordinates.angle)
    ];
}

function CompareHorizontalAndVerticalOfTwoObjects(object1, object2) {
    let object1Points = ObtainPoints(object1);
    let object2Points = ObtainPoints(object2);
    var horizontal = DoLinesMeet(ObtainHorizontalRange(object1Points), ObtainHorizontalRange(object2Points));
    var vertical = DoLinesMeet(ObtainVerticalRange(object1Points), ObtainVerticalRange(object2Points));
    return horizontal && vertical;
}

function RotatePointAboutPoint(midpoint, point, angle) {
    var radians = (Math.PI / 180) * angle;
    var cos = Math.cos(radians);
    var sin = Math.sin(radians);
    var x = point.x - midpoint.x;
    var y = point.y - midpoint.y;
    return new Point(
        x * cos - y * sin + midpoint.x,
        x * sin + y * cos + midpoint.y);
}

function RotateCoordinatesAboutPoint(midpoint, coordinates, angle) {
    var coordinatesPoints = ObtainPoints(coordinates); //Rotate coordinates about its own angle
    var topLeft = RotatePointAboutPoint(midpoint, coordinatesPoints[0], angle); //Rotate the top left coordinate about the midpoint
    var bottomLeft = RotatePointAboutPoint(midpoint, coordinatesPoints[2], angle); //Rotate the bottom left coordinate about the midpoint
    var bottomRight = RotatePointAboutPoint(midpoint, coordinatesPoints[3], angle); //Rotate the bottom right coordinate about the midpoint
    var newAngle = Math.atan(
        (topLeft.x - bottomLeft.x) / //Opposite
        (topLeft.y - bottomLeft.y)  //Ajacent
    ) * 180 / Math.PI; //The angle of rotation is the angle between the top left and bottom right coordinates
    var newMidpoint = new Point( //Find the midpoint of two opposite points
        topLeft.x + (bottomRight.x - topLeft.x) / 2,
        topLeft.y + (bottomRight.y - topLeft.y) / 2
    )
    return new Coordinates(newMidpoint.x - coordinates.width / 2, newMidpoint.y - coordinates.height / 2, coordinates.width, coordinates.height, -newAngle); //Use the midpoint to find the top left coordinate and make the new shape
}

function CompareCollisionOfTwoObjects(object1, object2) {
    //Make object1 straight and rotate object2 about object1
    var rotatedAboutObject2 = CompareHorizontalAndVerticalOfTwoObjects(new Coordinates(object1.x, object1.y, object1.width, object1.height, 0), RotateCoordinatesAboutPoint(ObtainMidpoint(object1), object2, -object1.angle));
    //Make object2 straight and rotate object1 about object2
    var rotatedAboutObject1 = CompareHorizontalAndVerticalOfTwoObjects(RotateCoordinatesAboutPoint(ObtainMidpoint(object2), object1, -object2.angle), new Coordinates(object2.x, object2.y, object2.width, object2.height, 0));
    return rotatedAboutObject2 && rotatedAboutObject1;
}