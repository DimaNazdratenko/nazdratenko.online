function detectCollision(plane, enemy) {

    var test = false;

    enemy.forEach(function (r2) {
        if (subDetectCollision(r2)) {
            test = true;
        }
    });

    return test;

    function subDetectCollision (r2) {
//Define the variables we'll need to calculate
        var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

        //hit will determine whether there's a collision
        hit = false;

        //Find the center points of each sprite
        plane.centerX = plane.x;
        plane.centerY = plane.y;
        r2.movieclip.centerX = r2.movieclip.x;
        r2.movieclip.centerY = r2.movieclip.y;

        //Find the half-widths and half-heights of each sprite
        plane.halfWidth = plane.width / 2;
        plane.halfHeight = plane.height / 2;
        r2.movieclip.halfWidth = r2.movieclip.width / 2;
        r2.movieclip.halfHeight = r2.movieclip.height / 2;

        //Calculate the distance vector between the sprites
        vx = plane.centerX - r2.movieclip.centerX;
        vy = plane.centerY - r2.movieclip.centerY;

        //Figure out the combined half-widths and half-heights
        combinedHalfWidths = plane.halfHeight + r2.movieclip.halfWidth;
        combinedHalfHeights = plane.halfWidth + r2.movieclip.halfHeight;

        //Check for a collision on the x axis
        if (Math.abs(vx) < combinedHalfWidths) {

            //A collision might be occuring. Check for a collision on the y axis
            if (Math.abs(vy) < combinedHalfHeights) {

                //There's definitely a collision happening
                hit = true;
            } else {
                //There's no collision on the y axis
                hit = false;
            }
        } else {
            //There's no collision on the x axis
            hit = false;
        }

        //`hit` will be either `true` or `false`
        return hit;
    }
}