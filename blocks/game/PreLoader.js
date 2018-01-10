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
        src: ['assets/music/background_music.mp3'],
        volume: 0.5
    });

// Create loader and add it into preLoaderScene
    var preLoaderImg = 'assets/images/preLoader.png';
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
            createFullscreenButton();
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
    textureButtonStart = {
        original: Texture.fromImage(imageLinks.start_button),
        down: Texture.fromImage(imageLinks.start_button_down),
        over: Texture.fromImage(imageLinks.start_button_over),
        positionX: renderer.width / 2,
        positionY: renderer.height / 2,
        scale: 0.5
    };

    buttonStart = new Button(textureButtonStart, "start");

    preLoaderScene.addChild(buttonStart);
}

function createFullscreenButton() {
    textureButtonFullscreen = {
        original: Texture.fromImage(imageLinks.fullscreen_button),
        over: Texture.fromImage(imageLinks.fullscreen_button_over),
        down: Texture.fromImage(imageLinks.fullscreen_button_down),
        positionX: renderer.width - 50,
        positionY: renderer.height - 40,
        scale: 0.3
    };

    buttonFullscreen  = new Button(textureButtonFullscreen, "fullscreen");

    preLoaderScene.addChild(buttonFullscreen);
}

