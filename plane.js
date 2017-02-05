function PlaneAnimation() {
    this.velocityVertical = 0;
    this.velocityHorizontal = 0;
    this.planeIndent = 5;  // 5 it's just that the plane would not touch the edges of the canvas

    var frames = [];
    for (var i = 0; i < 30; i++) {
        var val = i < 10 ? '0' + i : i;
        frames.push(Texture.fromFrame('rollSequence00' + val + '.png'));
    }

    this.AnimatedSprite = new AnimatedSprite(frames);
    this.AnimatedSprite.x = 100;
    this.AnimatedSprite.y = 200;
    this.AnimatedSprite.anchor.set(0.5);
    this.AnimatedSprite.animationSpeed = 0.5;
    this.AnimatedSprite.rotation = Math.PI/2;
    this.AnimatedSprite.width = 85;
    this.AnimatedSprite.height = 120;

    this.AnimatedSprite.play();
    gameScene.addChild(this.AnimatedSprite);
}

PlaneAnimation.prototype.planeVerticalMove = function () {
    if (!this.AnimatedSprite) return;
    this.AnimatedSprite.y -= this.velocityVertical;
    if (this.AnimatedSprite.y <= this.planeIndent + this.AnimatedSprite.width / 2) {
        this.AnimatedSprite.y = this.planeIndent + this.AnimatedSprite.width / 2;
    } else if (this.AnimatedSprite.y >= Position.END_Y - this.AnimatedSprite.width / 2) {
        this.AnimatedSprite.y = Position.END_Y - this.AnimatedSprite.width / 2;
    }
};

PlaneAnimation.prototype.planeHorizontalMove = function () {
    if (!this.AnimatedSprite) return;
    this.AnimatedSprite.x += this.velocityHorizontal;
    if (this.AnimatedSprite.x <= this.planeIndent + this.AnimatedSprite.height / 2) {
        this.AnimatedSprite.x = this.planeIndent + this.AnimatedSprite.height / 2;
    } else if (this.AnimatedSprite.x >= renderer.width - this.AnimatedSprite.height / 2 - this.planeIndent) {
        this.AnimatedSprite.x = renderer.width - this.AnimatedSprite.height / 2 - this.planeIndent;
    }
};
