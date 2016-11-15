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

var state, gameScene, gameOverScene, layer, score, message, plane, distance, monster, fatBird, stupidBird, chicken, monsterImages,
    fatBirdImages, stupidBirdImages, chickenImages, gameTime, startTime, darkEffect, textureButton, textureButtonDown,
    textureButtonOver, buttonReplay, flag;
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
    background1: 'images/background/1.png',
    background2: 'images/background/2.png',
    background3: 'images/background/3.png',
    background4: 'images/background/4.png',
    background5: 'images/background/5.png',
    fatBird1: 'images/fat_bird/1.png',
    fatBird2: 'images/fat_bird/2.png',
    fatBird3: 'images/fat_bird/3.png',
    fatBird4: 'images/fat_bird/4.png',
    fatBird5: 'images/fat_bird/5.png',
    fatBird6: 'images/fat_bird/6.png',
    fatBird7: 'images/fat_bird/7.png',
    fatBird8: 'images/fat_bird/8.png',
    monsterFly1: 'images/monster/fly/1.png',
    monsterFly2: 'images/monster/fly/2.png',
    monsterFly3: 'images/monster/fly/3.png',
    monsterFly4: 'images/monster/fly/4.png',
    stupidBirdFly1: 'images/stupid_bird/fly/1.png',
    stupidBirdFly2: 'images/stupid_bird/fly/2.png',
    stupidBirdFly3: 'images/stupid_bird/fly/3.png',
    stupidBirdFly4: 'images/stupid_bird/fly/4.png',
    stupidBirdFly5: 'images/stupid_bird/fly/5.png',
    stupidBirdFly6: 'images/stupid_bird/fly/6.png',
    stupidBirdFly7: 'images/stupid_bird/fly/7.png',
    stupidBirdFly8: 'images/stupid_bird/fly/8.png',
    chickenFly1: 'images/chicken/fly/1.png',
    chickenFly2: 'images/chicken/fly/2.png',
    chickenFly3: 'images/chicken/fly/3.png',
    chickenFly4: 'images/chicken/fly/4.png',
    plane: 'images/plane/fighter.png',
    planeJSON: 'images/plane/fighter.json',
    replay_button: 'images/replay_button_1.png',
    replay_button_down: 'images/replay_button_2.png',
    replay_button_over: 'images/replay_button_3.png'
};

for (var key in imageLinks) {
    loader = loader.add(imageLinks[key]);
}

loader
    .on('progress', onProgressCallback)
    .load(function () {
        console.log("All files loaded");
        setup();
    });

function onProgressCallback(event) {
    console.log("progress: " + Math.round(event.progress) + '%');
}

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

    //Update the current game state
    state();

    renderer.render(stage);
}



