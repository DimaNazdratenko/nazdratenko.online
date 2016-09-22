const Position = {
    START_X: 1920,
    START_Y: 0,
    END_X: 0,
    END_Y: 770,
    STEP_X: 10
};

// Class Monster =======================================================================================================
function Monster() {
    this.monster = null;
    //this.speed = getRandomIntValue(Position.STEP_X/2, Position.STEP_X*2);
}

// Prototype createAnimation ===========================================================================================
Monster.prototype = Object.create(null);
Monster.prototype.createAnimation = function (monsterImages) {
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

// Prototype updatePosition ============================================================================================
Monster.prototype.updatePosition = function () {
    if (this.monster.x > Position.END_X) {
        this.monster.x -= Position.STEP_X;
    }
    else {
        this.monster.x = Position.START_X;
        this.monster.y = getRandomIntValue(Position.START_Y, Position.END_Y);
    }
};

// Function which return random Int value ==============================================================================
function getRandomIntValue(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}