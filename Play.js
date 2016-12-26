function play() {

    if (detectCollision(plane, enemy[0]) || detectCollision(plane, enemy[1]) || detectCollision(plane, enemy[2]) || detectCollision(plane, enemy[3])) {
// There's a collision
        state = end;
        musicBackground.stop();
        musicGameOver.play();
    } else {
// There's no collision
// Update
        backgroundLogic(layer.layer1, layer.layer10, 200, gameTime);
        backgroundLogic(layer.layer2, layer.layer20, 160, gameTime);
        backgroundLogic(layer.layer3, layer.layer30, 120, gameTime);
        backgroundLogic(layer.layer4, layer.layer40, 80, gameTime);
        backgroundLogic(layer.layer5, layer.layer50, 60, gameTime);
        planeVerticalMove(velocityVertical);
        planeHorizontalMove(velocityHorizontal);

        for (var i = 0; i < enemy.length; i++) {
            enemy[i].updatePosition();
        }

        scoreChange(gameTime);
    }
}