function scoreAdd() {
    score = new Text('Score: ' + distance, style);
    score.x = Position.SCORE_X;
    score.y = Position.SCORE_Y;
    gameScene.addChild(score);
}

function scoreChange(gameTime) {
    distance = Math.round(gameTime / 1000 * 10);
    score.text = 'Score: ' + distance
}
