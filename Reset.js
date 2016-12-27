function reset() {
    gameOverScene.visible = false;

    plane.x = 200;
    plane.y = 400;
    plane.rotation = Math.PI/2;

    enemy[0].movieclip.x = 1920 + 170;
    enemy[0].movieclip.y = getRandomIntValue(Position.START_Y + enemy[0].movieclip.height / 2, Position.END_Y + enemy[0].movieclip.height / 2);
    enemy[0].movieclip.rotation = 0;

    enemy[1].movieclip.x = 1920 + 170 + 500;
    enemy[1].movieclip.y = getRandomIntValue(Position.START_Y + enemy[1].movieclip.height / 2, Position.END_Y + enemy[1].movieclip.height / 2);
    enemy[1].movieclip.rotation = 0;

    enemy[2].movieclip.x = 1920 + 170 + 1000;
    enemy[2].movieclip.y = getRandomIntValue(Position.START_Y + enemy[2].movieclip.height / 2, Position.END_Y + enemy[2].movieclip.height / 2);
    enemy[2].movieclip.rotation = 0;

    enemy[3].movieclip.x = 1920 + 170 + 1500;
    enemy[3].movieclip.y = getRandomIntValue(Position.START_Y + enemy[3].movieclip.height / 2, Position.END_Y + enemy[3].movieclip.height / 2);
    enemy[3].movieclip.rotation = 0;

    gameScene.addChild(score);
    gameOverScene.removeChild(score);

    score.x = 50;
    score.y = 960;
    score.scale.x = 1;
    score.scale.y = 1;

    startTime = Date.now();
    state = play;
    musicBackground.play();
}