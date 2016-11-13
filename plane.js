function planeAnimation() {
    var frames = [];

    for (var i = 0; i < 30; i++) {
        var val = i < 10 ? '0' + i : i;
        frames.push(Texture.fromFrame('rollSequence00' + val + '.png'));
    }

    plane = new PIXI.extras.MovieClip(frames);

    plane.x = 200;
    plane.y = 400;
    plane.anchor.set(0.5);
    plane.animationSpeed = 0.5;
    plane.rotation = Math.PI/2;

    plane.play();
    gameScene.addChild(plane);
}

function planeVerticalMove () {
    if (!plane) return;
    plane.y -= velocityVertical;
    if (plane.y <= 100) {
        plane.y = 100;
    } else if (plane.y >= 800) {
        plane.y = 800;
    }
}
function planeHorizontalMove (velocityHorizontal) {
    if (!plane) return;
    plane.x += velocityHorizontal;
    if (plane.x <= 150) {
        plane.x = 150;
    } else if (plane.x >= 1700) {
        plane.x = 1700;
    }
}
