function backgroundAddOnScene() {
    var textureLayer = {
        textureLayer5: Texture.fromImage(imageLinks.background5),
        textureLayer4: Texture.fromImage(imageLinks.background4),
        textureLayer3: Texture.fromImage(imageLinks.background3),
        textureLayer2: Texture.fromImage(imageLinks.background2),
        textureLayer1: Texture.fromImage(imageLinks.background1)
    };

    layer = {
        layer5: new tilingSprite(textureLayer.textureLayer5, renderer.width, renderer.height),
        layer4: new tilingSprite(textureLayer.textureLayer4, renderer.width, renderer.height),
        layer3: new tilingSprite(textureLayer.textureLayer3, renderer.width, renderer.height),
        layer2: new tilingSprite(textureLayer.textureLayer2, renderer.width, renderer.height),
        layer1: new tilingSprite(textureLayer.textureLayer1, renderer.width, renderer.height)
    };

    for (var key in layer) {
        gameScene.addChild(layer[key]);
    }
}

function backgroundLogic(layer1, speed, gameTime) {
    layer1.tilePosition.x = -(gameTime / 1000 * speed);
}