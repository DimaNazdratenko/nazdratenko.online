function end() {
    gameOverScene.visible = true;

//Add Blur effect
    blurFilter = new filters.BlurFilter();
    gameScene.filters = [blurFilter];
    blurFilter.blur = 5;

}