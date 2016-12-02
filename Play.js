function play() {

    if (detectCollision(plane, chicken) || detectCollision(plane, stupidBird) || detectCollision(plane, fatBird) || detectCollision(plane, monster)) {
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
        monster.updatePosition();
        fatBird.updatePosition();
        stupidBird.updatePosition();
        chicken.updatePosition();
        scoreChange(gameTime);
    }
}