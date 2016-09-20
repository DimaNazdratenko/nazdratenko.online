var fatBird;

function FatBirdAnimation() {
    var fatBirdImages = [
        imageLinks.fatBird8,
        imageLinks.fatBird7,
        imageLinks.fatBird6,
        imageLinks.fatBird5,
        imageLinks.fatBird4,
        imageLinks.fatBird3,
        imageLinks.fatBird2,
        imageLinks.fatBird1
    ];

    var frames = [];

    for (var i = 0; i < 8; i++) {
        var texture = PIXI.Texture.fromImage(fatBirdImages[i]);
        frames.push(texture);
    }

    fatBird = new PIXI.extras.MovieClip(frames);

    fatBird.x = 1600;
    fatBird.y = 100;
    fatBird.scale.x = -1;
    fatBird.width = 175;
    fatBird.height = 140;
    fatBird.animationSpeed = 0.5;

    fatBird.play();
    scene.addChild(fatBird);
}

var asd;



