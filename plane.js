function planeAnimation() {
    var frames = [];

    for (var i = 0; i < 30; i++) {
        var val = i < 10 ? '0' + i : i;
        frames.push(Texture.fromFrame('rollSequence00' + val + '.png'));
    }

    plane = new AnimatedSprite(frames);

    plane.x = 200;
    plane.y = 400;
    plane.anchor.set(0.5);
    plane.animationSpeed = 0.5;
    plane.rotation = Math.PI/2;
    plane.width = 85;
    plane.height = 120;

    plane.play();
    gameScene.addChild(plane);
}

function planeVerticalMove (velocityVertical) {
    if (!plane) return;
    plane.y -= velocityVertical;
    if (plane.y <= 5 + plane.width / 2) {     // 5 это просто что бы самолет не касался краями конца канваса
        plane.y = 5 + plane.width / 2;
    } else if (plane.y >= Position.END_Y - plane.width / 2) {
        plane.y = Position.END_Y - plane.width / 2;
    }
}
function planeHorizontalMove (velocityHorizontal) {
    if (!plane) return;
    plane.x += velocityHorizontal;
    if (plane.x <= 5 + plane.height / 2) {    // 5 это просто что бы самолет не касался краями конца канваса
        plane.x = 5 + plane.height / 2;
    } else if (plane.x >= renderer.width - plane.height / 2 - 5) {
        plane.x = renderer.width - plane.height / 2 - 5;
    }
}
