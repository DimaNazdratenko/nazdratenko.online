class Button extends PIXI.Sprite {
    constructor(texture, type, ...arg) {
        super(...arg);

        this.textureButton = texture;
        this.texture = this.textureButton.original;

        this.buttonMode = true;
        this.interactive = true;
        this.scale.x = 0.5;
        this.scale.y = 0.5;
        this.x = renderer.width / 2 - this.width / 2;
        this.y = renderer.height / 2 - this.height / 2;
        this.isdown = false;
        this.buttonType = type;

        this.on('mousedown', this.onButtonDown)
            .on('touchstart', this.onButtonDown)

            .on('mouseup', this.onButtonUp)
            .on('touchend', this.onButtonUp)

            .on('mouseupoutside', this.onButtonUpOutside)
            .on('touchendoutside', this.onButtonUpOutside)

            .on('mouseover', this.onButtonOver)

            .on('mouseout', this.onButtonOut);
    }

    onButtonDown() {
        this.isdown = true;
        this.texture = this.textureButton.down;
        this.alpha = 1;
    }

    onButtonUp() {
        if (this.isdown) {
            this.isdown = false;
            this.texture = this.textureButton.original;

            if(this.buttonType === "start"){
                state = setup;
                musicBackground.play();
                this.interactive = false;
            } else if(this.buttonType === "replay") {
                state = reset;
                musicGameOver.stop();
            }
        }
    }

    onButtonUpOutside() {
        this.isdown = false;
        this.texture = this.textureButton.original;
    }

    onButtonOver() {
        if (this.isdown) {
            return;
        }
        this.texture = this.textureButton.over;
    }

    onButtonOut() {
        if (this.isdown) {
            return;
        }
        this.texture = this.textureButton.original;
    }
}