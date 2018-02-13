class Button extends PIXI.Sprite {
    constructor(texture, type, ...arg) {
        super(...arg);

        this.textureButton = texture;
        this.texture = this.textureButton.original;

        this.buttonMode = true;
        this.interactive = true;
        this.scale.set(this.textureButton.scale, this.textureButton.scale);
        this.x = this.textureButton.positionX - this.width / 2;
        this.y = this.textureButton.positionY - this.height / 2;
        this.isdown = false;
        this.fullIphone = false;
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

    onButtonUp(e) {
        if (this.isdown) {
            this.isdown = false;
            this.texture = this.textureButton.original;

            if (this.buttonType === "start") {
                state = setup;
                musicBackground.play();
                this.interactive = false;
            } else if (this.buttonType === "replay") {
                state = reset;
                musicGameOver.stop();
            } else if (this.buttonType === "fullscreen" && e.type == "mouseup") {
                Button.toggleFullScreen();
            } else if (this.buttonType === "fullscreen" && e.type == "touchend") {
                this.toggleFullScreenIphone();
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

    toggleFullScreenIphone() {

        if (!this.fullIphone && window.innerWidth / window.innerHeight > 1) {
            this.fullIphone = true;

            renderer.view.style.position = "absolute";
            renderer.view.style.top = "0";
            renderer.view.style.left = "0";
            renderer.view.style.width = "100%";
            renderer.view.style.height = "100%";
            renderer.view.style.zIndex = "1030";

            rotateScreen.visible = false;

        } else if (!this.fullIphone && window.innerWidth / window.innerHeight < 1) {
            this.fullIphone = false;

            rotateScreen.visible = true;

        } else {
            this.fullIphone = false;

            renderer.view.style.position = "";
            renderer.view.style.zIndex = "10";
            resizeCanvas();
        }
    }

    static toggleFullScreen() {
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
            fullscreenIndex = 1;

            if (renderer.view.requestFullscreen) {
                renderer.view.requestFullscreen();
            } else if (renderer.view.mozRequestFullScreen) {
                renderer.view.mozRequestFullScreen();
            } else if (renderer.view.webkitRequestFullscreen) {
                renderer.view.webkitRequestFullscreen();
            }
        } else {
            fullscreenIndex = 1.3;

            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }
}