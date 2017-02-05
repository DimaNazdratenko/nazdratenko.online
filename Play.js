function play() {
    if (detectCollision(plane, enemy)) {
// There's a collision
        state = end;
        musicBackground.stop();
        musicGameOver.play();
    } else {
// There's no collision
// Update
        backgroundLogic(layer.layer1, 200, gameTime);
        backgroundLogic(layer.layer2, 160, gameTime);
        backgroundLogic(layer.layer3, 120, gameTime);
        backgroundLogic(layer.layer4, 80, gameTime);
        backgroundLogic(layer.layer5, 60, gameTime);
        plane.planeVerticalMove();
        plane.planeHorizontalMove();

        for (var i = 0; i < enemy.length; i++) {
            enemy[i].updatePosition();
            if (enemy[i].hideEnemy) {
                enemy.splice(i, 1, new Monster(monsterSprites[getRandomIntValue(0,monsterSprites.length - 1)], Position.START_X));
            }
        }

        scoreChange(gameTime);
    }
}