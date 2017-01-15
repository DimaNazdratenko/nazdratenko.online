function reset() {
    gameOverScene.visible = false;

    plane.x = 200;
    plane.y = 400;
    plane.rotation = Math.PI/2;

    gapBetweenBirds = 0;
    for (var i = 0; i < enemy.length; i++) {
        enemy[i].movieclip.x = Position.START_X + gapBetweenBirds;

        // Equally gap Between Birds and canvas border => only when we have 3 birds on the canvas
        // In this situation we have 4 gap Between Birds
        // + birds.width because point anchor = 0.5
        gapBetweenBirds += (renderer.width - enemy[i].movieclip.width * 3) / 4 + enemy[i].movieclip.width;

        enemy[i].movieclip.y = getRandomIntValue(Position.START_Y + enemy[i].movieclip.height / 2, Position.END_Y - enemy[i].movieclip.height / 2);
        enemy[i].movieclip.rotation = 0;
    }

    gameScene.addChild(score);
    gameOverScene.removeChild(score);

    score.x = Position.SCORE_X;
    score.y = Position.SCORE_Y;
    score.scale.x = 1;
    score.scale.y = 1;

    startTime = Date.now();
    state = play;
    musicBackground.play();

// Disable filter Blur
    gameScene.filters = [];
    filtersValue = 0;
}