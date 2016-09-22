const Position = {
    START_X: 1920,
    START_Y: 0,
    END_X: 0,
    END_Y: 1080 - 140,
    SHIFT_X: 5
};


//class Monster
function Monster() {
    this.monster = null;
    this.speed = getRandomIntValue(Position.SHIFT_X/2, Position.SHIFT_X*2);
}
Monster.prototype = Object.create(null);

Monster.prototype.createAnimation = function (monsterImages) {
    /*var monster1Images = [
        imageLinks.monsterFly4,
        imageLinks.monsterFly3,
        imageLinks.monsterFly2,
        imageLinks.monsterFly1
    ];*/

    var frames = [];

    for (var i = 0; i < monsterImages.length; i++) {
        var texture = PIXI.Texture.fromImage(monsterImages[i]);
        frames.push(texture);
    }

    this.monster = new PIXI.extras.MovieClip(frames);

    this.monster.x = Position.START_X;
    this.monster.y = getRandomIntValue(Position.START_Y, Position.END_Y);
    this.monster.scale.x = -1;
    this.monster.width = 175;
    this.monster.height = 140;
    this.monster.animationSpeed = 0.4;

    this.monster.play();
    scene.addChild(this.monster);
};



Monster.prototype.updatePosition = function () {
    if (this.monster.x > Position.END_X) {
        //this.monster.x -= Position.SHIFT_X;
        this.monster.x -= this.speed;
    }
    else {
        this.monster.x = Position.START_X;
        this.monster.y = getRandomIntValue(Position.START_Y, Position.END_Y);
    }
};

function getRandomNumberValue(min, max)
{
    return (Math.random() * (max - min) + min);
}
function getRandomIntValue(min, max)
{
    return Math.round(Math.random() * (max - min) + min);
}