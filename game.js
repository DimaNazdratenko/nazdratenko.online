var renderer = PIXI.autoDetectRenderer(1920, 1080);
document.body.appendChild(renderer.view);

// create the root of the scene graph___________________________________________________________________________________
var scene = new PIXI.Container();

var velocityVertical = 0,
    velocityHorizontal = 0;

document.body.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
        case 37:    //  left
            velocityHorizontal = -15;
            break;
        case 38:    //  top
            velocityVertical = 15;
            break;
        case 39:    //  right
            velocityHorizontal = 15;
            break;
        case 40:    //  down
            velocityVertical = -15;
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
// start animating______________________________________________________________________________________________________
var startTime = Date.now();
function animate() {
    var now = Date.now();
    var gameTime = now - startTime;
    requestAnimationFrame(animate);

// Update_______________________________________________________________________________________________________________
    backgroundLogic(layer.layer1, layer.layer10, 200, gameTime);
    backgroundLogic(layer.layer2, layer.layer20, 160, gameTime);
    backgroundLogic(layer.layer3, layer.layer30, 120, gameTime);
    backgroundLogic(layer.layer4, layer.layer40, 80, gameTime);
    backgroundLogic(layer.layer5, layer.layer50, 60, gameTime);
    planeVerticalMove(velocityVertical);
    planeHorizontalMove(velocityHorizontal);

// render the container_________________________________________________________________________________________________
    renderer.render(scene);
}

// Loading assets_______________________________________________________________________________________________________
var imageLinks = {
    background1: 'images/background/1.png',
    background2: 'images/background/2.png',
    background3: 'images/background/3.png',
    background4: 'images/background/4.png',
    background5: 'images/background/5.png',
    fatBird8: 'images/fat_bird/8.png',
    fatBird7: 'images/fat_bird/7.png',
    fatBird6: 'images/fat_bird/6.png',
    fatBird5: 'images/fat_bird/5.png',
    fatBird4: 'images/fat_bird/4.png',
    fatBird3: 'images/fat_bird/3.png',
    fatBird2: 'images/fat_bird/2.png',
    fatBird1: 'images/fat_bird/1.png',
    monsterFly1: 'images/monster/fly/1.png',
    monsterFly2: 'images/monster/fly/2.png',
    monsterFly3: 'images/monster/fly/3.png',
    monsterFly4: 'images/monster/fly/4.png',
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
        monsterAnimation();
        PlaneAnimation();
        animate();
        //FatBirdAnimation();
    });

function onProgressCallback(event) {
    console.log("progress: " +  Math.round(event.progress) + '%');
}

var asd;