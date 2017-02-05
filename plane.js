function PlaneAnimation() {
    var frames = [];

    for (var i = 0; i < 30; i++) {
        var val = i < 10 ? '0' + i : i;
        frames.push(Texture.fromFrame('rollSequence00' + val + '.png'));
    }

    this.AnimatedSprite = new AnimatedSprite(frames);

    this.AnimatedSprite.x = 200;
    this.AnimatedSprite.y = 400;
    this.AnimatedSprite.anchor.set(0.5);
    this.AnimatedSprite.animationSpeed = 0.5;
    this.AnimatedSprite.rotation = Math.PI/2;
    this.AnimatedSprite.width = 85;
    this.AnimatedSprite.height = 120;

    this.AnimatedSprite.play();
    gameScene.addChild(this.AnimatedSprite);
}

PlaneAnimation.prototype.planeVerticalMove = function (velocityVertical) {
    if (!this.AnimatedSprite) return;
    this.AnimatedSprite.y -= velocityVertical;
    if (this.AnimatedSprite.y <= 5 + this.AnimatedSprite.width / 2) {     // 5 it's just that the plane would not touch the edges of the canvas
        this.AnimatedSprite.y = 5 + this.AnimatedSprite.width / 2;
    } else if (this.AnimatedSprite.y >= Position.END_Y - this.AnimatedSprite.width / 2) {
        this.AnimatedSprite.y = Position.END_Y - this.AnimatedSprite.width / 2;
    }
};

PlaneAnimation.prototype.planeHorizontalMove = function (velocityHorizontal) {
    if (!this.AnimatedSprite) return;
    this.AnimatedSprite.x += velocityHorizontal;
    if (this.AnimatedSprite.x <= 5 + this.AnimatedSprite.height / 2) {    // 5 it's just that the plane would not touch the edges of the canvas
        this.AnimatedSprite.x = 5 + this.AnimatedSprite.height / 2;
    } else if (this.AnimatedSprite.x >= renderer.width - this.AnimatedSprite.height / 2 - 5) {
        this.AnimatedSprite.x = renderer.width - this.AnimatedSprite.height / 2 - 5;
    }
};
