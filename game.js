var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    Texture = PIXI.Texture,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text,
    Graphics = PIXI.Graphics,
    filters = PIXI.filters;


var renderer = autoDetectRenderer(1920, 1080),
    stage = new Container();
document.body.appendChild(renderer.view);

var state, preLoaderScene, gameScene, gameOverScene, layer, score, message, plane, distance, monster, fatBird, stupidBird, chicken, monsterImages,
    fatBirdImages, stupidBirdImages, chickenImages, monsterSprites, gameTime, startTime, darkEffectEndGame, darkEffectPreLoader, textureButton, textureButtonDown,
    textureButtonOver, buttonReplay, textureButtonStart, textureButtonDownStart, textureButtonOverStart, buttonStart, flag, texturePreLoader, preLoader,
    musicBackground, musicGameOver;
var velocityVertical = 0,
    velocityHorizontal = 0;
const Position = {
    START_X: 1920 + 170,
    START_Y: 0,
    END_X: 0,
    END_Y: 770,
    STEP_X: 10,
    STEP_Y: 8
};
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
    dropShadowDistance: 6
};

var imageLinks = {
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
    start_button_over: 'assets/images/start_button/start_button_3.png'
};

preLoaderFunc();

document.body.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
        case 37:    //  left
            velocityHorizontal = -20;
            break;
        case 38:    //  top
            velocityVertical = 20;
            break;
        case 39:    //  right
            velocityHorizontal = 20;
            break;
        case 40:    //  down
            velocityVertical = -20;
            break;
    }
    e.preventDefault();
});

document.body.addEventListener('keyup', function (e) {
    if (e.keyCode == 38 || e.keyCode == 40) {
        velocityVertical = 0;
    } else if (e.keyCode == 37 || e.keyCode == 39) {
        velocityHorizontal = 0;
    }
});

function getRandomIntValue(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// Start animating =====================================================================================================
startTime = Date.now();
function gameLoop() {
    var now = Date.now();
    gameTime = now - startTime;
    requestAnimationFrame(gameLoop);

// Update the current game state
    state();

    renderer.render(stage);
}



