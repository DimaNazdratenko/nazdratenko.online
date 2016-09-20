var layer = {};

function backgroundAddOnScene() {
    var textureLayer = {
        textureLayer5: PIXI.Texture.fromImage(imageLinks.background5),
        textureLayer4: PIXI.Texture.fromImage(imageLinks.background4),
        textureLayer3: PIXI.Texture.fromImage(imageLinks.background3),
        textureLayer2: PIXI.Texture.fromImage(imageLinks.background2),
        textureLayer1: PIXI.Texture.fromImage(imageLinks.background1)
    };

    layer = {
        layer5: new PIXI.Sprite(textureLayer.textureLayer5),
        layer50: new PIXI.Sprite(textureLayer.textureLayer5),
        layer4: new PIXI.Sprite(textureLayer.textureLayer4),
        layer40: new PIXI.Sprite(textureLayer.textureLayer4),
        layer3: new PIXI.Sprite(textureLayer.textureLayer3),
        layer30: new PIXI.Sprite(textureLayer.textureLayer3),
        layer2: new PIXI.Sprite(textureLayer.textureLayer2),
        layer20: new PIXI.Sprite(textureLayer.textureLayer2),
        layer1: new PIXI.Sprite(textureLayer.textureLayer1),
        layer10: new PIXI.Sprite(textureLayer.textureLayer1)
    };

    for (var key in layer) {
        scene.addChild(layer[key]);
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