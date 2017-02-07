function end() {
    gameOverScene.visible = true;

// Falling birds and the plane in a collision
    if (flagCollision != undefined) {
        plane.rotation -= 0.03;
        plane.y += Position.STEP_Y;

        for (var i = 0; i < enemy.length; i++) {
            if (i != flagCollision) {
                enemy[i].movieclip.y += Position.STEP_Y / 2;
            } else {
                enemy[i].movieclip.rotation += 0.03;
                enemy[i].movieclip.y += Position.STEP_Y;
            }
        }
    }

// Change scene for Score, that it was on top of the dark background
    gameOverScene.addChild(score);
    gameScene.removeChild(score);

// Movement the "Score" to the center of the screen and scaling it
    if (score.x <= renderer.width / 2 - score.width / 2 || score.y >= renderer.height / 3 - message.height) {
        score.x += 2.7;
        score.y -= 3;
    }

    if (score.scale.x <= 1.2 && score.scale.y <= 1.2) {
        score.scale.x += 0.002;
        score.scale.y += 0.002;
    }

// Enable filter Blur
    gameScene.filters = [blurFilter];
    filtersValue += 0.005;
    blurFilter.blur = Math.sin(filtersValue) * 10;
}


