function reset() {
    startTime = Date.now();
    gameOverScene.visible = false;

    plane.x = 200;
    plane.y = 400;

    monster.movieclip.x = 1920 + 170;
    fatBird.movieclip.x = 1920 + 170 + 500;
    stupidBird.movieclip.x = 1920 + 170 + 1000;
    chicken.movieclip.x = 1920 + 170 + 1500;

    gameScene.filters = false;

    state = play;
}