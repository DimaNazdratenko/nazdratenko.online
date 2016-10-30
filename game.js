var renderer = PIXI.autoDetectRenderer(1920, 1080);
document.body.appendChild(renderer.view);

// Create the root of the scene graph ==================================================================================
var scene = new PIXI.Container();

var velocityVertical = 0,
    velocityHorizontal = 0,
    distance = 0;

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

// Start animating =====================================================================================================
var startTime = Date.now();
function animate() {
    var now = Date.now();
    var gameTime = now - startTime;
    requestAnimationFrame(animate);

    if (detectCollision(plane, chicken)) {
        //There's a collision
        planeVerticalMove(velocityVertical);
        planeHorizontalMove(velocityHorizontal);
        monster.updatePosition();
        fatBird.updatePosition();
        stupidBird.updatePosition();
        console.log('1');

    } else {
        //There's no collision
        //Update
        backgroundLogic(layer.layer1, layer.layer10, 200, gameTime);
        backgroundLogic(layer.layer2, layer.layer20, 160, gameTime);
        backgroundLogic(layer.layer3, layer.layer30, 120, gameTime);
        backgroundLogic(layer.layer4, layer.layer40, 80, gameTime);
        backgroundLogic(layer.layer5, layer.layer50, 60, gameTime);
        planeVerticalMove(velocityVertical);
        planeHorizontalMove(velocityHorizontal);
        monster.updatePosition();
        fatBird.updatePosition();
        stupidBird.updatePosition();
        chicken.updatePosition();
        scoreChange(gameTime);
    }


// Render the container ================================================================================================
    renderer.render(scene);
}

// Loading assets ======================================================================================================
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
    planeJSON: 'images/plane/fighter.json'
};

var pixiLoader = PIXI.loader;
for (var key in imageLinks) {
    pixiLoader = pixiLoader.add(imageLinks[key]);
}

pixiLoader
    .on('progress', onProgressCallback)
    .load(function () {
        console.log("All files loaded");
        backgroundAddOnScene();
        monster.createAnimation(monsterImages, 1920 + 170);
        fatBird.createAnimation(fatBirdImages, 1920 + 170 + 500);
        stupidBird.createAnimation(stupidBirdImages, 1920 + 170 + 1000);
        chicken.createAnimation(chickenImages, 1920 + 170 + 1500);
        planeAnimation();
        scoreAdd();
        animate();
    });

function onProgressCallback(event) {
    console.log("progress: " +  Math.round(event.progress) + '%');
}

// Create enemies ======================================================================================================
var monster = new Monster();
var monsterImages = [
    imageLinks.monsterFly1,
    imageLinks.monsterFly2,
    imageLinks.monsterFly3,
    imageLinks.monsterFly4
];

var fatBird = new Monster();
var fatBirdImages = [
    imageLinks.fatBird1,
    imageLinks.fatBird2,
    imageLinks.fatBird3,
    imageLinks.fatBird4,
    imageLinks.fatBird5,
    imageLinks.fatBird6,
    imageLinks.fatBird7,
    imageLinks.fatBird8
];

var stupidBird = new Monster();
var stupidBirdImages = [
    imageLinks.stupidBirdFly1,
    imageLinks.stupidBirdFly2,
    imageLinks.stupidBirdFly3,
    imageLinks.stupidBirdFly4,
    imageLinks.stupidBirdFly5,
    imageLinks.stupidBirdFly6,
    imageLinks.stupidBirdFly7,
    imageLinks.stupidBirdFly8
];

var chicken = new Monster();
var chickenImages = [
    imageLinks.chickenFly1,
    imageLinks.chickenFly2,
    imageLinks.chickenFly3,
    imageLinks.chickenFly4
];

