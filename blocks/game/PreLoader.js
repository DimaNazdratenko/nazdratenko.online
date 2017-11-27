function preLoaderFunc() {

    preLoaderScene = new Container();
    stage.addChild(preLoaderScene);

// Create dark effect and add it into preLoaderScene
    darkEffectPreLoader = new Graphics();
    darkEffectPreLoader.beginFill(0x000000, 1);
    darkEffectPreLoader.drawRect(0, 0, 1920, 1080);
    preLoaderScene.addChild(darkEffectPreLoader);

// Create musics
    musicBackground = new Howl({
        src: ['../assets/music/background_music.mp3'],
        volume: 0.5
    });

// Create loader and add it into preLoaderScene
    var preLoaderImg = '../assets/images/preLoader.png';
    loader.add(preLoaderImg);
    texturePreLoader = Texture.fromImage(preLoaderImg);
    preLoader = new Sprite(texturePreLoader);
    preLoader.anchor.set(0.5);
    preLoader.x = renderer.width / 2 - preLoader.width / 2;
    preLoader.y = renderer.height / 2 - preLoader.height / 2;
    preLoaderScene.addChild(preLoader);

// Downloading assets
    for (var key in imageLinks) {
        loader = loader.add(imageLinks[key]);
    }

    loader
        .on('progress', onProgressCallback)
        .load(function () {
            console.log("All files loaded");
            preLoaderScene.removeChild(preLoader);

            // add start button
            createStartButton();
        });

    function onProgressCallback(event) {
        console.log("progress: " + Math.round(event.progress) + '%');
    }

    state = rotatePreLoader;

// Start the game loop
    gameLoop();
}

function rotatePreLoader() {
    preLoader.rotation += 0.1;
}

function createStartButton() {
// Add the "Start" button
    textureButtonStart = Texture.fromImage(imageLinks.start_button);
    textureButtonDownStart = Texture.fromImage(imageLinks.start_button_down);
    textureButtonOverStart = Texture.fromImage(imageLinks.start_button_over);

    buttonStart = new Sprite(textureButtonStart);
    buttonStart.buttonMode = true;
    buttonStart.scale.x = 0.5;
    buttonStart.scale.y = 0.5;
    buttonStart.x = renderer.width / 2 - buttonStart.width / 2;
    buttonStart.y = renderer.height / 2 - buttonStart.height / 2;

// make the button interactive...
    buttonStart.interactive = true;

    buttonStart
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

    preLoaderScene.addChild(buttonStart);

    function onButtonDown() {
        this.isdown = true;
        this.texture = textureButtonDownStart;
        this.alpha = 1;
    }

    function onButtonUp() {
        this.isdown = false;
        this.texture = textureButtonOverStart;
        state = setup;
        musicBackground.play();
        this.interactive = false;
    }

    function onButtonUpOutside() {
        this.isdown = false;
        this.texture = textureButtonStart;
    }

    function onButtonOver() {
        if (this.isdown) {
            return;
        }
        this.texture = textureButtonOverStart;
    }

    function onButtonOut() {
        if (this.isdown) {
            return;
        }
        this.texture = textureButtonStart;
    }
}

