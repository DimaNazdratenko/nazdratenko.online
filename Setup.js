function setup() {
    monster = new Monster();
    fatBird = new Monster();
    stupidBird = new Monster();
    chicken = new Monster();

    monsterImages = [
        imageLinks.monsterFly1,
        imageLinks.monsterFly2,
        imageLinks.monsterFly3,
        imageLinks.monsterFly4
    ];

    fatBirdImages = [
        imageLinks.fatBird1,
        imageLinks.fatBird2,
        imageLinks.fatBird3,
        imageLinks.fatBird4,
        imageLinks.fatBird5,
        imageLinks.fatBird6,
        imageLinks.fatBird7,
        imageLinks.fatBird8
    ];

    stupidBirdImages = [
        imageLinks.stupidBirdFly1,
        imageLinks.stupidBirdFly2,
        imageLinks.stupidBirdFly3,
        imageLinks.stupidBirdFly4,
        imageLinks.stupidBirdFly5,
        imageLinks.stupidBirdFly6,
        imageLinks.stupidBirdFly7,
        imageLinks.stupidBirdFly8
    ];

    chickenImages = [
        imageLinks.chickenFly1,
        imageLinks.chickenFly2,
        imageLinks.chickenFly3,
        imageLinks.chickenFly4
    ];

    gameScene = new Container();
    stage.addChild(gameScene);

    backgroundAddOnScene();
    monster.createAnimation(monsterImages, 1920 + 170);
    fatBird.createAnimation(fatBirdImages, 1920 + 170 + 500);
    stupidBird.createAnimation(stupidBirdImages, 1920 + 170 + 1000);
    chicken.createAnimation(chickenImages, 1920 + 170 + 1500);
    planeAnimation();
    scoreAdd();

    //Create the `gameOver` stage
    gameOverScene = new Container();
    stage.addChild(gameOverScene);

    //Make the `gameOver` stage invisible when the game first starts
    gameOverScene.visible = false;

    // Create the black effect in gameOverScene
    darkEffect = new Graphics();
    darkEffect.beginFill('black', 0.6);
    darkEffect.drawRect(0, 0, 1920, 1080);
    gameOverScene.addChild(darkEffect);

    //Create the text sprite and add it to the `gameOver` stage
    style.fontSize = '100px';
    message = new Text('Game over!', style);
    message.x = renderer.width / 2 - message.width / 2;
    message.y = renderer.height / 3 - message.height / 2;
    gameOverScene.addChild(message);

// Добавляем кнопку Replay----------------------------------------------------------------------------------------------
    textureButton = Texture.fromImage(imageLinks.replay_button);
    textureButtonDown = Texture.fromImage(imageLinks.replay_button_down);
    textureButtonOver = Texture.fromImage(imageLinks.replay_button_over);

    buttonReplay = new Sprite(textureButton);
    buttonReplay.buttonMode = true;
    buttonReplay.scale.x = 0.5;
    buttonReplay.scale.y = 0.5;
    buttonReplay.x = renderer.width / 2 - buttonReplay.width / 2;
    buttonReplay.y = renderer.height / 3 + message.height - message.height / 2;

    // make the button interactive...
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

    // add it to the stage
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
        console.log('1')
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
//----------------------------------------------------------------------------------------------------------------------

    //Set the game state
    state = play;

    //Start the game loop
    gameLoop();
}
