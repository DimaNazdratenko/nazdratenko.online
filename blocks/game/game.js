// Aliases
let Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    Texture = PIXI.Texture,
    Sprite = PIXI.Sprite,
    tilingSprite = PIXI.extras.TilingSprite,
    Text = PIXI.Text,
    Graphics = PIXI.Graphics,
    filters = PIXI.filters,
    AnimatedSprite = PIXI.extras.AnimatedSprite;

const size = [960, 540],
    ratio = size[0] / size[1],
    renderer = autoDetectRenderer(size[0], size[1]);

let stage = new Container();

let gameElements = new Container(),
    uiElements = new Container();
stage.addChild(gameElements);
stage.addChild(uiElements);

document.querySelector("div.canvas").appendChild(renderer.view);

let state, preLoaderScene, gameScene, gameOverScene, layer, score, message, rotateScreen, plane, distance, gameTime, startTime,
    darkEffectEndGame, darkEffectPreLoader, textureButtonReplay, buttonReplay, textureButtonStart, buttonStart,
    textureButtonFullscreen, buttonFullscreen, texturePreLoader, preLoader, musicBackground, musicGameOver, flagCollision,
    gapBetweenBirds = 0,
    enemy = [],
    filtersValue = 0,
    fullscreenIndex = 1.3,
    blurFilter = new filters.BlurFilter();

const Position = {
    START_X: renderer.width + 85 / 2, // 85/2 it is monsters width/2, because point anchor = 0.5
    START_Y: 0,
    END_X: 0,
    END_Y: 450,
    STEP_X: 10,
    STEP_Y: 8,
    SCORE_X: 50,
    SCORE_Y: 480
};
let style = {
    fontFamily: 'Arial',
    fontSize: '30px',
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: '#ffffff',
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6
};

let imageLinks = {
    background1: 'assets/images/background/1.png',
    background2: 'assets/images/background/2.png',
    background3: 'assets/images/background/3.png',
    background4: 'assets/images/background/4.png',
    background5: 'assets/images/background/5.png',
    fatBird1: 'assets/images/fat_bird/1.png',
    fatBird2: 'assets/images/fat_bird/2.png',
    fatBird3: 'assets/images/fat_bird/3.png',
    fatBird4: 'assets/images/fat_bird/4.png',
    fatBird5: 'assets/images/fat_bird/5.png',
    fatBird6: 'assets/images/fat_bird/6.png',
    fatBird7: 'assets/images/fat_bird/7.png',
    fatBird8: 'assets/images/fat_bird/8.png',
    monsterFly1: 'assets/images/monster/fly/1.png',
    monsterFly2: 'assets/images/monster/fly/2.png',
    monsterFly3: 'assets/images/monster/fly/3.png',
    monsterFly4: 'assets/images/monster/fly/4.png',
    stupidBirdFly1: 'assets/images/stupid_bird/fly/1.png',
    stupidBirdFly2: 'assets/images/stupid_bird/fly/2.png',
    stupidBirdFly3: 'assets/images/stupid_bird/fly/3.png',
    stupidBirdFly4: 'assets/images/stupid_bird/fly/4.png',
    stupidBirdFly5: 'assets/images/stupid_bird/fly/5.png',
    stupidBirdFly6: 'assets/images/stupid_bird/fly/6.png',
    stupidBirdFly7: 'assets/images/stupid_bird/fly/7.png',
    stupidBirdFly8: 'assets/images/stupid_bird/fly/8.png',
    chickenFly1: 'assets/images/chicken/fly/1.png',
    chickenFly2: 'assets/images/chicken/fly/2.png',
    chickenFly3: 'assets/images/chicken/fly/3.png',
    chickenFly4: 'assets/images/chicken/fly/4.png',
    plane: 'assets/images/plane/fighter.png',
    planeJSON: 'assets/images/plane/fighter.json',
    replay_button: 'assets/images/replay_button/replay_button_1.png',
    replay_button_down: 'assets/images/replay_button/replay_button_2.png',
    replay_button_over: 'assets/images/replay_button/replay_button_3.png',
    start_button: 'assets/images/start_button/start_button_1.png',
    start_button_down: 'assets/images/start_button/start_button_2.png',
    start_button_over: 'assets/images/start_button/start_button_3.png',
    fullscreen_button: 'assets/images/fullscreen_button/fullscreen_button_1.png',
    fullscreen_button_over: 'assets/images/fullscreen_button/fullscreen_button_2.png',
    fullscreen_button_down: 'assets/images/fullscreen_button/fullscreen_button_3.png',
};

let monsterImages = [
    imageLinks.monsterFly1,
    imageLinks.monsterFly2,
    imageLinks.monsterFly3,
    imageLinks.monsterFly4
];

let fatBirdImages = [
    imageLinks.fatBird1,
    imageLinks.fatBird2,
    imageLinks.fatBird3,
    imageLinks.fatBird4,
    imageLinks.fatBird5,
    imageLinks.fatBird6,
    imageLinks.fatBird7,
    imageLinks.fatBird8
];

let stupidBirdImages = [
    imageLinks.stupidBirdFly1,
    imageLinks.stupidBirdFly2,
    imageLinks.stupidBirdFly3,
    imageLinks.stupidBirdFly4,
    imageLinks.stupidBirdFly5,
    imageLinks.stupidBirdFly6,
    imageLinks.stupidBirdFly7,
    imageLinks.stupidBirdFly8
];

let chickenImages = [
    imageLinks.chickenFly1,
    imageLinks.chickenFly2,
    imageLinks.chickenFly3,
    imageLinks.chickenFly4
];

let monsterSprites = [monsterImages, fatBirdImages, stupidBirdImages, chickenImages];

resizeCanvas();
preLoaderFunc();

// Game loop
startTime = Date.now();

function gameLoop() {
    let now = Date.now();
    gameTime = now - startTime;
    requestAnimationFrame(gameLoop);

// Update the current game state
    state();

    renderer.render(stage);
}

// Return random value
function getRandomIntValue(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// Resize canvas
function resizeCanvas() {
    let w,
        h;

    if (window.innerWidth / window.innerHeight >= ratio) {
        w = window.innerHeight * ratio;
        h = window.innerHeight;
    } else {
        w = window.innerWidth;
        h = window.innerWidth / ratio;
    }
    renderer.view.style.position = "";
    renderer.view.style.width = w / fullscreenIndex + 'px';
    renderer.view.style.height = h / fullscreenIndex + 'px';
}

// Events
document.body.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
        case 37:    //  left
            plane.velocityHorizontal = -20;
            break;
        case 38:    //  top
            plane.velocityVertical = 20;
            break;
        case 39:    //  right
            plane.velocityHorizontal = 20;
            break;
        case 40:    //  down
            plane.velocityVertical = -20;
            break;
    }
    e.preventDefault();
});

document.body.addEventListener('keyup', function (e) {
    if (e.keyCode == 38 || e.keyCode == 40) {
        plane.velocityVertical = 0;
    } else if (e.keyCode == 37 || e.keyCode == 39) {
        plane.velocityHorizontal = 0;
    }
});

window.addEventListener('resize', resizeCanvas);