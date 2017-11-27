function setup() {

// Create gameScene
    gameScene = new Container();
    stage.addChild(gameScene);

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

// // Create musics
//     musicBackground = new Howl({
//         src: ['assets/music/background_music.mp3'],
//         volume: 0.5
//     });

    musicGameOver = new Howl({
        src: ['../assets/music/game_over_music.mp3'],
        volume: 0.5
    });

// Create the gameOverScene
    gameOverScene = new Container();
    stage.addChild(gameOverScene);

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
    textureButton = Texture.fromImage(imageLinks.replay_button);
    textureButtonDown = Texture.fromImage(imageLinks.replay_button_down);
    textureButtonOver = Texture.fromImage(imageLinks.replay_button_over);

    buttonReplay = new Sprite(textureButton);
    buttonReplay.buttonMode = true;
    buttonReplay.scale.x = 0.5;
    buttonReplay.scale.y = 0.5;
    buttonReplay.x = renderer.width / 2 - buttonReplay.width / 2;
    buttonReplay.y = renderer.height / 2 - buttonReplay.height / 2;

// Make the button interactive
    buttonReplay.interactive = true;

    buttonReplay
    // set the mousedown callback...
        .on('mousedown', onButtonDown)
        .on('touchstart', onButtonDown)

        // set the mouseup callback...
        .on('mouseup', onButtonUp)
        .on('touchend', onButtonUp)

        .on('mouseupoutside', onButtonUpOutside)
        .on('touchendoutside', onButtonUpOutside)

        // set the mouseover callback...
        .on('mouseover', onButtonOver)

        // set the mouseout callback...
        .on('mouseout', onButtonOut);

// Add it to the gameOverScene
    gameOverScene.addChild(buttonReplay);

    function onButtonDown() {
        this.isdown = true;
        this.texture = textureButtonDown;
        this.alpha = 1;
    }

    function onButtonUp() {
        this.isdown = false;
        this.texture = textureButtonOver;
        state = reset;
        musicGameOver.stop();
    }

    function onButtonUpOutside() {
        this.isdown = false;
        this.texture = textureButton;
    }

    function onButtonOver() {
        if (this.isdown) {
            return;
        }
        this.texture = textureButtonOver;
    }

    function onButtonOut() {
        if (this.isdown) {
            return;
        }
        this.texture = textureButton;
    }

// Set the game state and refresh time
    startTime = Date.now();
    state = play;
}
