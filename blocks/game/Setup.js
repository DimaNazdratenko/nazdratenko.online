function setup() {

// Create gameScene
    gameScene = new Container();
    gameElements.addChild(gameScene);

// Add monsters and background on the scene
    backgroundAddOnScene();

    for (var i = 0; i < 4; i++) {
        enemy[i] = new Monster(monsterSprites[i], Position.START_X + gapBetweenBirds);

        // Equally gap Between Birds and canvas border => only when we have 3 birds on the canvas
        // In this situation we have 4 gap Between Birds
        // + birds.width because point anchor = 0.5
        gapBetweenBirds += (renderer.width - enemy[i].movieclip.width * 3) / 4 + enemy[i].movieclip.width;
    }

// Add Plane
    var frames = [];
    for (var j = 0; j < 30; j++) {
        var val = j < 10 ? '0' + j : j;
        frames.push(Texture.fromFrame('rollSequence00' + val + '.png'));
    }

    plane = new PlaneAnimation(frames);
    plane.play();
    gameScene.addChild(plane);

// Add Score
    scoreAdd();

// Create musics
    musicGameOver = new Howl({
        src: ['assets/music/game_over_music.mp3'],
        volume: 0.5
    });

// Create the gameOverScene
    gameOverScene = new Container();
    gameElements.addChild(gameOverScene);

// Make the gameOverScene invisible when the game first starts
    gameOverScene.visible = false;

// Create the black effect in gameOverScene
    darkEffectEndGame = new Graphics();
    darkEffectEndGame.beginFill(0x000000, 0.6);
    darkEffectEndGame.drawRect(0, 0, renderer.width, renderer.height);
    gameOverScene.addChild(darkEffectEndGame);

// Create the text sprite and add it to the gameOverScene
    style.fontSize = '50px';
    message = new Text('Game over!', style);
    message.x = renderer.width / 2 - message.width / 2;
    message.y = renderer.height / 3 - message.height / 2;
    gameOverScene.addChild(message);

// Add Replay button
    textureButtonReplay = {
        original: Texture.fromImage(imageLinks.replay_button),
        down: Texture.fromImage(imageLinks.replay_button_down),
        over: Texture.fromImage(imageLinks.replay_button_over),
        positionX: renderer.width / 2,
        positionY: renderer.height / 2,
        scale: 0.5
    };
    buttonReplay = new Button(textureButtonReplay, "replay");
    gameOverScene.addChild(buttonReplay);

// Set the game state and refresh time
    startTime = Date.now();
    state = play;
}