function setup() {

// Create gameScene
    gameScene = new Container();
    stage.addChild(gameScene);

// Add monsters and background on the scene
    backgroundAddOnScene();

    for (var i = 0; i < 4; i++) {
        enemy[i] = new Monster(monsterSprites[i], Position.START_X + gapBetweenBirds);
        gapBetweenBirds+=500;
    }

    planeAnimation();
    scoreAdd();

// Create musics
    musicBackground = new Howl({
        src: ['assets/music/background_music.mp3'],
        volume: 0.5
    });

    musicGameOver = new Howl({
        src: ['assets/music/game_over_music.mp3'],
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
    darkEffectEndGame.drawRect(0, 0, 1920, 1080);
    gameOverScene.addChild(darkEffectEndGame);

// Create the text sprite and add it to the gameOverScene
    style.fontSize = '100px';
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
    buttonReplay.y = renderer.height / 3 + message.height - message.height / 2;

// Make the button interactive
    buttonReplay.interactive = true;

    buttonReplay
        // set the mousedown callback...
        .on('mousedown', onButtonDown)

        // set the mouseup callback...
        .on('mouseup', onButtonUp)
        .on('mouseupoutside', onButtonUp)

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

        if (this.isOver) {
            this.texture = textureButtonOver;
            state = reset;
            musicGameOver.stop();
        } else {
            this.texture = textureButton;
        }
    }

    function onButtonOver() {
        this.isOver = true;

        if (this.isdown) {
            return;
        }
        this.texture = textureButtonOver;
    }

    function onButtonOut() {
        this.isOver = false;

        if (this.isdown) {
            return;
        }
        this.texture = textureButton;
    }
// Set the game state and refresh time
    startTime = Date.now();
    state = play;
    musicBackground.play();
}
