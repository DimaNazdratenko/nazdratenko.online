function detectCollision(plane, enemy) {

    var resultDetectCollision = false;

    enemy.forEach(function (enemy_id, index) {
        if (subDetectCollision(enemy_id)) {
            resultDetectCollision = true;
            flagCollision = index;
        }
    });

    return resultDetectCollision;

    function subDetectCollision (enemy_id) {
//Define the variables we'll need to calculate
        var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

        //hit will determine whether there's a collision
        hit = false;

        //Find the center points of each sprite
        plane.centerX = plane.x;
        plane.centerY = plane.y;
        enemy_id.movieclip.centerX = enemy_id.movieclip.x;
        enemy_id.movieclip.centerY = enemy_id.movieclip.y;

        //Find the half-widths and half-heights of each sprite
        plane.halfWidth = plane.width / 2;
        plane.halfHeight = plane.height / 2;
        enemy_id.movieclip.halfWidth = enemy_id.movieclip.width / 2;
        enemy_id.movieclip.halfHeight = enemy_id.movieclip.height / 2;

        //Calculate the distance vector between the sprites
        vx = plane.centerX - enemy_id.movieclip.centerX;
        vy = plane.centerY - enemy_id.movieclip.centerY;

        //Figure out the combined half-widths and half-heights
        combinedHalfWidths = plane.halfHeight + enemy_id.movieclip.halfWidth;
        combinedHalfHeights = plane.halfWidth + enemy_id.movieclip.halfHeight;

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