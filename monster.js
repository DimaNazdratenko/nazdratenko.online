// Class Monster =======================================================================================================
function Monster (monsterImages, startX) {
    var frames = [];

    for (var i = 0; i < monsterImages.length; i++) {
        var texture = Texture.fromImage(monsterImages[i]);
        frames.push(texture);
    }

    this.movieclip = new PIXI.extras.AnimatedSprite(frames);

    this.movieclip.scale.x = -1;
    this.movieclip.anchor.set(0.5);
    this.movieclip.width = 170;
    this.movieclip.height = 140;
    this.movieclip.x = startX;
    this.movieclip.y = getRandomIntValue(Position.START_Y + this.movieclip.height / 2, Position.END_Y + this.movieclip.height / 2);
    this.movieclip.animationSpeed = 0.4;

    this.movieclip.play();
    gameScene.addChild(this.movieclip);
}

// Prototype updatePosition ============================================================================================
Monster.prototype.updatePosition = function () {
    if (this.movieclip.x > Position.END_X - this.movieclip.width / 2) {
        this.movieclip.x -= Position.STEP_X;
    } else {
        // this.createAnimation(monsterSprites[getRandomIntValue(0,monsterSprites.length - 1)]);

        this.movieclip.x = Position.START_X - this.movieclip.width / 2;
        this.movieclip.y = getRandomIntValue(Position.START_Y + this.movieclip.height / 2, Position.END_Y + this.movieclip.height / 2);
    }
};
