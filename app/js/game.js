function backgroundAddOnScene() {
    var textureLayer = {
        textureLayer5: Texture.fromImage(imageLinks.background5),
        textureLayer4: Texture.fromImage(imageLinks.background4),
        textureLayer3: Texture.fromImage(imageLinks.background3),
        textureLayer2: Texture.fromImage(imageLinks.background2),
        textureLayer1: Texture.fromImage(imageLinks.background1)
    };

    layer = {
        layer5: new tilingSprite(textureLayer.textureLayer5, renderer.width, renderer.height),
        layer4: new tilingSprite(textureLayer.textureLayer4, renderer.width, renderer.height),
        layer3: new tilingSprite(textureLayer.textureLayer3, renderer.width, renderer.height),
        layer2: new tilingSprite(textureLayer.textureLayer2, renderer.width, renderer.height),
        layer1: new tilingSprite(textureLayer.textureLayer1, renderer.width, renderer.height)
    };

    for (var key in layer) {
        gameScene.addChild(layer[key]);
    }
}

function backgroundLogic(layer1, speed, gameTime) {
    layer1.tilePosition.x = -(gameTime / 1000 * speed);
}
function detectCollision(plane, enemy) {

    var resultDetectCollision = false;

    enemy.forEach(function (enemy_id, index) {
        if (subDetectCollision(enemy_id)) {
            resultDetectCollision = true;
            flagCollision = index;
        }
    });

    return resultDetectCollision;

    function subDetectCollision (enemy_id) {
//Define the variables we'll need to calculate
        var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

        //hit will determine whether there's a collision
        hit = false;

        //Find the center points of each sprite
        plane.centerX = plane.x;
        plane.centerY = plane.y;
        enemy_id.movieclip.centerX = enemy_id.movieclip.x;
        enemy_id.movieclip.centerY = enemy_id.movieclip.y;

        //Find the half-widths and half-heights of each sprite
        plane.halfWidth = plane.width / 2;
        plane.halfHeight = plane.height / 2;
        enemy_id.movieclip.halfWidth = enemy_id.movieclip.width / 2;
        enemy_id.movieclip.halfHeight = enemy_id.movieclip.height / 2;

        //Calculate the distance vector between the sprites
        vx = plane.centerX - enemy_id.movieclip.centerX;
        vy = plane.centerY - enemy_id.movieclip.centerY;

        //Figure out the combined half-widths and half-heights
        combinedHalfWidths = plane.halfHeight + enemy_id.movieclip.halfWidth;
        combinedHalfHeights = plane.halfWidth + enemy_id.movieclip.halfHeight;

        //Check for a collision on the x axis
        if (Math.abs(vx) < combinedHalfWidths) {

            //A collision might be occuring. Check for a collision on the y axis
            if (Math.abs(vy) < combinedHalfHeights) {

                //There's definitely a collision happening
                hit = true;
            } else {
                //There's no collision on the y axis
                hit = false;
            }
        } else {
            //There's no collision on the x axis
            hit = false;
        }

        //`hit` will be either `true` or `false`
        return hit;
    }
}
function end() {
    gameOverScene.visible = true;

// Falling birds and the plane in a collision
    if (flagCollision != undefined) {
        plane.rotation -= 0.03;
        plane.y += Position.STEP_Y;

        for (var i = 0; i < enemy.length; i++) {
            if (i != flagCollision) {
                enemy[i].movieclip.y += Position.STEP_Y / 2;
            } else {
                enemy[i].movieclip.rotation += 0.03;
                enemy[i].movieclip.y += Position.STEP_Y;
            }
        }
    }

// Change scene for Score, that it was on top of the dark background
    gameOverScene.addChild(score);
    gameScene.removeChild(score);

// Movement the "Score" to the center of the screen and scaling it
    if (score.x <= renderer.width / 2 - score.width / 2 || score.y >= renderer.height / 3 - message.height) {
        score.x += 2.7;
        score.y -= 3;
    }

    if (score.scale.x <= 1.2 && score.scale.y <= 1.2) {
        score.scale.x += 0.002;
        score.scale.y += 0.002;
    }

// Enable filter Blur
    gameScene.filters = [blurFilter];
    filtersValue += 0.005;
    blurFilter.blur = Math.sin(filtersValue) * 10;
}



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

resizeCanvas();

let stage = new Container();
document.querySelector("div.canvas").appendChild(renderer.view);

let state, preLoaderScene, gameScene, gameOverScene, layer, score, message, plane, distance, gameTime, startTime,
    darkEffectEndGame,
    darkEffectPreLoader, textureButton, textureButtonDown, textureButtonOver, buttonReplay, textureButtonStart,
    textureButtonDownStart,
    textureButtonOverStart, buttonStart, texturePreLoader, preLoader, musicBackground, musicGameOver, flagCollision,
    gapBetweenBirds = 0,
    enemy = [],
    filtersValue = 0,
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
    fill: 'white',
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
    start_button_over: 'assets/images/start_button/start_button_3.png'
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
    renderer.view.style.width = w / 1.3 + 'px';
    renderer.view.style.height = h / 1.3 + 'px';
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
// Class Monster
function Monster (monsterImages, startX) {
    this.hideEnemy = false;
    var frames = [];

    for (var i = 0; i < monsterImages.length; i++) {
        var texture = Texture.fromImage(monsterImages[i]);
        frames.push(texture);
    }

    this.movieclip = new AnimatedSprite(frames);

    this.movieclip.scale.x = -1;
    this.movieclip.anchor.set(0.5);
    this.movieclip.x = startX;
    this.movieclip.y = getRandomIntValue(Position.START_Y + this.movieclip.height / 2, Position.END_Y - this.movieclip.height / 2);
    this.movieclip.animationSpeed = 0.4;

    this.movieclip.play();
    gameScene.addChild(this.movieclip);
}

// Prototype updatePosition
Monster.prototype.updatePosition = function () {
    if (this.movieclip.x > Position.END_X - this.movieclip.width / 2) {
        this.movieclip.x -= Position.STEP_X;
    } else {
        this.hideEnemy = true;
        this.movieclip.destroy();
        this.movieclip = null;
    }
};

class PlaneAnimation extends PIXI.extras.AnimatedSprite {
    constructor(...arg) {
        super(...arg);

        this.velocityVertical = 0;
        this.velocityHorizontal = 0;
        this.planeIndent = 5;  // 5 it's just that the plane would not touch the edges of the canvas
        this.x = 100;
        this.y = 200;
        this.anchor.set(0.5);
        this.animationSpeed = 0.5;
        this.rotation = Math.PI / 2;
        this.width = 85;
        this.height = 120;
        this.interactive = true;
        this.buttonMode = true;

        this.on('pointerdown', this.onDragStart)
            .on('pointerup', this.onDragEnd)
            .on('pointerupoutside', this.onDragEnd)
            .on('pointermove', this.onDragMove)
    }

    onDragStart() {
        this.data = event.data;
        this.alpha = 0.5;
        this.dragging = true;
    }

    onDragEnd() {
        this.alpha = 1;
        this.dragging = false;
        this.data = null;
    }

    onDragMove(e){
        if (this.dragging) {
            let newPosition = e.data.getLocalPosition(stage);
            this.x = newPosition.x;
            this.y = newPosition.y;
        }
    }

    keyboardVerticalMove() {
        if (!this) return;
        this.y -= this.velocityVertical;
        if (this.y <= this.planeIndent + this.width / 2) {
            this.y = this.planeIndent + this.width / 2;
        } else if (this.y >= Position.END_Y - this.width / 2) {
            this.y = Position.END_Y - this.width / 2;
        }
    }

    keyboardHorizontalMove() {
        if (!this) return;
        this.x += this.velocityHorizontal;
        if (this.x <= this.planeIndent + this.height / 2) {
            this.x = this.planeIndent + this.height / 2;
        } else if (this.x >= renderer.width - this.height / 2 - this.planeIndent) {
            this.x = renderer.width - this.height / 2 - this.planeIndent;
        }
    }
}
function play() {
    if (detectCollision(plane, enemy)) {
// There's a collision
        state = end;
        musicBackground.stop();
        musicGameOver.play();
        plane.onDragEnd();
    } else {
// There's no collision
// Update
        backgroundLogic(layer.layer1, 200, gameTime);
        backgroundLogic(layer.layer2, 160, gameTime);
        backgroundLogic(layer.layer3, 120, gameTime);
        backgroundLogic(layer.layer4, 80, gameTime);
        backgroundLogic(layer.layer5, 60, gameTime);
        plane.keyboardVerticalMove();
        plane.keyboardHorizontalMove();

        for (let i = 0; i < enemy.length; i++) {
            enemy[i].updatePosition();
            if (enemy[i].hideEnemy) {
                enemy.splice(i, 1, new Monster(monsterSprites[getRandomIntValue(0,monsterSprites.length - 1)], Position.START_X));
            }
        }

        scoreChange(gameTime);
    }
}
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


function reset() {
    gameOverScene.visible = false;

    plane.x = 100;
    plane.y = 200;
    plane.rotation = Math.PI/2;

    gapBetweenBirds = 0;
    for (var i = 0; i < enemy.length; i++) {
        enemy[i].movieclip.x = Position.START_X + gapBetweenBirds;

        // Equally gap Between Birds and canvas border => only when we have 3 birds on the canvas
        // In this situation we have 4 gap Between Birds
        // + birds.width because point anchor = 0.5
        gapBetweenBirds += (renderer.width - enemy[i].movieclip.width * 3) / 4 + enemy[i].movieclip.width;

        enemy[i].movieclip.y = getRandomIntValue(Position.START_Y + enemy[i].movieclip.height / 2, Position.END_Y - enemy[i].movieclip.height / 2);
        enemy[i].movieclip.rotation = 0;
    }

    gameScene.addChild(score);
    gameOverScene.removeChild(score);

    score.x = Position.SCORE_X;
    score.y = Position.SCORE_Y;
    score.scale.x = 1;
    score.scale.y = 1;

    startTime = Date.now();
    state = play;
    musicBackground.play();

// Disable filter Blur
    gameScene.filters = [];
    filtersValue = 0;
}
function scoreAdd() {
    score = new Text('Score: ' + distance, style);
    score.x = Position.SCORE_X;
    score.y = Position.SCORE_Y;
    gameScene.addChild(score);
}

function scoreChange(gameTime) {
    distance = Math.round(gameTime / 1000 * 10);
    score.text = 'Score: ' + distance
}

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
