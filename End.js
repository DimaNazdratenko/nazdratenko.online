function end() {
    gameOverScene.visible = true;

// Падение птиц и самолета при столкновении------------------------------------------------------------------------------

    if (flagCollision != undefined) {
        plane.rotation -= 0.03;
        plane.y += Position.STEP_Y;

        for (var i = 0; i < enemy.length; i++) {
            if (i != flagCollision) {
                enemy[i].movieclip.y += Position.STEP_Y / 2;
            } else {
                enemy[i].movieclip.rotation += 0.03;
                enemy[i].movieclip.y += Position.STEP_Y;
            }
        }
    }

// Изменения сцены для текста Score, что бы он был сверху над темным фоном
    gameOverScene.addChild(score);
    gameScene.removeChild(score);

// Движение текста Score в центр экрана и увеличение--------------------------------------------------------------------
    if (score.x <= renderer.width / 2 - score.width / 2 && score.y >= renderer.height / 3 - score.height / 2 - message.height) {
        score.x += 6;
        score.y -= 6;
    }

    if (score.scale.x <= 1.2 && score.scale.y <= 1.2) {
        score.scale.x += 0.002;
        score.scale.y += 0.002;
    }

// =====================================================================================================================
//     gameScene.filters = [blurFilter];
//     count += 0.006;
//     blurFilter.blur = 20 * (count);
// =====================================================================================================================


}


