// Class Monster =======================================================================================================
function Monster() {
    this.movieclip = null;
}
Monster.prototype = Object.create(null);

// Prototype createAnimation ===========================================================================================
Monster.prototype.createAnimation = function (monsterImages, startX) {
    var frames = [];

    for (var i = 0; i < monsterImages.length; i++) {
        var texture = Texture.fromImage(monsterImages[i]);
        frames.push(texture);
    }

    this.movieclip = new PIXI.extras.MovieClip(frames);

    this.movieclip.x = startX;
    this.movieclip.y = getRandomIntValue(Position.START_Y, Position.END_Y);
    this.movieclip.scale.x = -1;
    this.movieclip.width = 170;
    this.movieclip.height = 140;
    this.movieclip.animationSpeed = 0.4;

    this.movieclip.play();
    gameScene.addChild(this.movieclip);
};

// Prototype updatePosition ============================================================================================
Monster.prototype.updatePosition = function () {
    if (this.movieclip.x > Position.END_X) {
        this.movieclip.x -= Position.STEP_X;
    }
    else {
        this.movieclip.x = Position.START_X;
        this.movieclip.y = getRandomIntValue(Position.START_Y, Position.END_Y);
    }
};
