function scoreAdd() {
    score = new Text('Score: ' + distance, style);
    score.x = 50;
    score.y = 960;
    gameScene.addChild(score);
}

function scoreChange(gameTime){
    distance = Math.round(gameTime / 1000 * 10);
    score.text = 'Score: ' + distance
}
