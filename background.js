function backgroundAddOnScene() {
    var textureLayer = {
        textureLayer5: Texture.fromImage(imageLinks.background5),
        textureLayer4: Texture.fromImage(imageLinks.background4),
        textureLayer3: Texture.fromImage(imageLinks.background3),
        textureLayer2: Texture.fromImage(imageLinks.background2),
        textureLayer1: Texture.fromImage(imageLinks.background1)
    };

    layer = {
        layer5: new Sprite(textureLayer.textureLayer5),
        layer50: new Sprite(textureLayer.textureLayer5),
        layer4: new Sprite(textureLayer.textureLayer4),
        layer40: new Sprite(textureLayer.textureLayer4),
        layer3: new Sprite(textureLayer.textureLayer3),
        layer30: new Sprite(textureLayer.textureLayer3),
        layer2: new Sprite(textureLayer.textureLayer2),
        layer20: new Sprite(textureLayer.textureLayer2),
        layer1: new Sprite(textureLayer.textureLayer1),
        layer10: new Sprite(textureLayer.textureLayer1)
    };

    for (var key in layer) {
        gameScene.addChild(layer[key]);
    }
}

function backgroundLogic(layer1, layer10, speed, gameTime) {
    layer1.x = -(gameTime / 1000 * speed);
    layer1.x %= 1920 * 2;
    if (layer1.x < -1920) {
        layer1.x += 1920 * 2;
    }

    layer10.x = 1920 - (gameTime / 1000 * speed);
    layer10.x %= 1920 * 2;
    if (layer10.x < -1920) {
        layer10.x += 1920 * 2;
    }
}