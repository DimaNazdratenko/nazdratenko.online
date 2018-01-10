class PlaneAnimation extends PIXI.extras.AnimatedSprite {
    constructor(...arg) {
        super(...arg);

        this.velocityVertical = 0;
        this.velocityHorizontal = 0;
        this.planeIndent = 5;  // 5 it's just that the plane would not touch the edges of the canvas
        this.x = 100;
        this.y = 200;
        this.anchor.set(0.5);
        this.animationSpeed = 0.5;
        this.rotation = Math.PI / 2;
        this.width = 85;
        this.height = 120;
        this.interactive = true;
        this.buttonMode = true;

        this.on('mousedown', this.onDragStart)
            .on('touchstart', this.onDragStart)
            .on('pointerup', this.onDragEnd)
            .on('pointerupoutside', this.onDragEnd)
            .on('mousemove', this.onDragMove)
            .on('touchmove', this.onDragMove);
    }

    onDragStart(e) {
        this.data = event.data;
        this.dragging = true;

        e.type === "touchstart" ? this.x += this.width : this.x;
    }

    onDragEnd() {
        this.alpha = 1;
        this.dragging = false;
        this.data = null;
    }

    onDragMove(e){
        if (this.dragging) {
            let newPosition = e.data.getLocalPosition(stage);
            this.x = e.type === "touchmove" ? newPosition.x + this.width : newPosition.x;
            this.y = newPosition.y;
        }
    }

    keyboardVerticalMove() {
        if (!this) return;
        this.y -= this.velocityVertical;
        if (this.y <= this.planeIndent + this.width / 2) {
            this.y = this.planeIndent + this.width / 2;
        } else if (this.y >= Position.END_Y - this.width / 2) {
            this.y = Position.END_Y - this.width / 2;
        }
    }

    keyboardHorizontalMove() {
        if (!this) return;
        this.x += this.velocityHorizontal;
        if (this.x <= this.planeIndent + this.height / 2) {
            this.x = this.planeIndent + this.height / 2;
        } else if (this.x >= renderer.width - this.height / 2 - this.planeIndent) {
            this.x = renderer.width - this.height / 2 - this.planeIndent;
        }
    }
}