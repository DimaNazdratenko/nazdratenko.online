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
