function reset() {
    gameOverScene.visible = false;

    plane.x = 200;
    plane.y = 400;
    plane.rotation = Math.PI/2;

    monster.movieclip.x = 1920 + 170;
    monster.movieclip.y = getRandomIntValue(Position.START_Y + monster.movieclip.height / 2, Position.END_Y + monster.movieclip.height / 2);
    monster.movieclip.rotation = 0;

    fatBird.movieclip.x = 1920 + 170 + 500;
    fatBird.movieclip.y = getRandomIntValue(Position.START_Y + fatBird.movieclip.height / 2, Position.END_Y + fatBird.movieclip.height / 2);
    fatBird.movieclip.rotation = 0;

    stupidBird.movieclip.x = 1920 + 170 + 1000;
    stupidBird.movieclip.y = getRandomIntValue(Position.START_Y + stupidBird.movieclip.height / 2, Position.END_Y + stupidBird.movieclip.height / 2);
    stupidBird.movieclip.rotation = 0;

    chicken.movieclip.x = 1920 + 170 + 1500;
    chicken.movieclip.y = getRandomIntValue(Position.START_Y + chicken.movieclip.height / 2, Position.END_Y + chicken.movieclip.height / 2);
    chicken.movieclip.rotation = 0;

    gameScene.addChild(score);
    gameOverScene.removeChild(score);

    score.x = 50;
    score.y = 960;
    score.scale.x = 1;
    score.scale.y = 1;

    startTime = Date.now();
    state = play;
}