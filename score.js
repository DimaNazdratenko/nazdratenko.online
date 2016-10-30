var score;

function scoreAdd() {
    var style = {
        fontFamily: 'Arial',
        fontSize: '60px',
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: 'white',
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440
    };

    score = new PIXI.Text('Score: ' + distance, style);
    score.x = 50;
    score.y = 960;

    scene.addChild(score);
}

function scoreChange(gameTime){
    distance = Math.round(gameTime / 1000 * 10);
    score.text = 'Score: ' + distance
}
