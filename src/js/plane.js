function PlaneAnimation() {
    PIXI.extras.AnimatedSprite.apply(this, arguments);

    this.velocityVertical = 0;
    this.velocityHorizontal = 0;
    this.planeIndent = 5;  // 5 it's just that the plane would not touch the edges of the canvas
    this.x = 100;
    this.y = 200;
    this.anchor.set(0.5);
    this.animationSpeed = 0.5;
    this.rotation = Math.PI/2;
    this.width = 85;
    this.height = 120;
}

PlaneAnimation.prototype = Object.create(PIXI.extras.AnimatedSprite.prototype);
PlaneAnimation.prototype.constructor = PlaneAnimation;

PlaneAnimation.prototype.planeVerticalMove = function () {
    if (!this) return;
    this.y -= this.velocityVertical;
    if (this.y <= this.planeIndent + this.width / 2) {
        this.y = this.planeIndent + this.width / 2;
    } else if (this.y >= Position.END_Y - this.width / 2) {
        this.y = Position.END_Y - this.width / 2;
    }
};

PlaneAnimation.prototype.planeHorizontalMove = function () {
    if (!this) return;
    this.x += this.velocityHorizontal;
    if (this.x <= this.planeIndent + this.height / 2) {
        this.x = this.planeIndent + this.height / 2;
    } else if (this.x >= renderer.width - this.height / 2 - this.planeIndent) {
        this.x = renderer.width - this.height / 2 - this.planeIndent;
    }
};
