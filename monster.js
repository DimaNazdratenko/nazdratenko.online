var monster;

function monsterAnimation() {
    var monsterImages = [
        imageLinks.monsterFly4,
        imageLinks.monsterFly3,
        imageLinks.monsterFly2,
        imageLinks.monsterFly1
    ];

    var frames = [];

    for (var i = 0; i < 3; i++) {
        var texture = PIXI.Texture.fromImage(monsterImages[i]);
        frames.push(texture);
    }

    monster = new PIXI.extras.MovieClip(frames);

    monster.x = 1600;
    monster.y = 100;
    monster.scale.x = -1;
    monster.width = 175;
    monster.height = 140;
    monster.animationSpeed = 0.4;

    monster.play();
    scene.addChild(monster);
}



