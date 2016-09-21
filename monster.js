var monster;
const Position = {
    START_X: 1920,
    START_Y: 0,
    END_X: 0,
    END_Y: 1080 - 140,
    SHIFT_X: 5
};

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

    monster.x = Position.START_X;
    monster.y = getRandomIntValue(Position.START_Y, Position.END_Y);
    monster.scale.x = -1;
    monster.width = 175;
    monster.height = 140;
    monster.animationSpeed = 0.4;

    monster.play();
    scene.addChild(monster);
}



function monsterUpdate() {
    if (monster.x > Position.END_X) {
        monster.x -= Position.SHIFT_X;
    }
    else {
        monster.x = Position.START_X;
        monster.y = getRandomIntValue(Position.START_Y, Position.END_Y);
    }
}

function getRandomIntValue(min, max)
{
    return Math.round(Math.random() * (max - min) + min);
};