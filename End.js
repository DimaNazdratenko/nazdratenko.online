function end() {
    gameOverScene.visible = true;

//Падение птиц и самолета при столкновении------------------------------------------------------------------------------
    if (detectCollision(plane, chicken)) {
        flag = 'chicken';
    } else if (detectCollision(plane, stupidBird)) {
        flag = 'stupidBird';
    } else if (detectCollision(plane, fatBird)) {
        flag = 'fatBird';
    } else if (detectCollision(plane, monster)) {
        flag = 'monster';
    }

    if (flag == 'chicken') {
        plane.rotation -= 0.03;
        plane.y += Position.STEP_Y;

        chicken.movieclip.rotation += 0.03;
        chicken.movieclip.y += Position.STEP_Y;

        stupidBird.movieclip.y += Position.STEP_Y / 2;
        fatBird.movieclip.y += Position.STEP_Y / 2;
        monster.movieclip.y += Position.STEP_Y / 2;
    } else if (flag == 'stupidBird') {
        plane.rotation -= 0.03;
        plane.y += Position.STEP_Y;

        stupidBird.movieclip.rotation += 0.03;
        stupidBird.movieclip.y += Position.STEP_Y;

        chicken.movieclip.y += Position.STEP_Y / 2;
        fatBird.movieclip.y += Position.STEP_Y / 2;
        monster.movieclip.y += Position.STEP_Y / 2;
    } else if (flag == 'fatBird') {
        plane.rotation -= 0.03;
        plane.y += Position.STEP_Y;

        fatBird.movieclip.rotation += 0.03;
        fatBird.movieclip.y += Position.STEP_Y;

        chicken.movieclip.y += Position.STEP_Y / 2;
        stupidBird.movieclip.y += Position.STEP_Y / 2;
        monster.movieclip.y += Position.STEP_Y / 2;
    } else if (flag == 'monster') {
        plane.rotation -= 0.03;
        plane.y += Position.STEP_Y;

        monster.movieclip.rotation += 0.03;
        monster.movieclip.y += Position.STEP_Y;

        chicken.movieclip.y += Position.STEP_Y / 2;
        stupidBird.movieclip.y += Position.STEP_Y / 2;
        fatBird.movieclip.y += Position.STEP_Y / 2;
    }
//Изменения сцены для текста Score, что бы он был сверху над темным фоном
    gameOverScene.addChild(score);
    gameScene.removeChild(score);

//Движение текста Score в центр экрана и увеличение---------------------------------------------------------------------
    if (score.x <= renderer.width / 2 - score.width / 2 && score.y >= renderer.height / 3 - score.height / 2 - message.height) {
        score.x += 6;
        score.y -= 6;
    }

    if (score.scale.x <= 1.2 && score.scale.y <= 1.2) {
        score.scale.x += 0.002;
        score.scale.y += 0.002;
    }

    preLoader.rotation += 0.1;
}


