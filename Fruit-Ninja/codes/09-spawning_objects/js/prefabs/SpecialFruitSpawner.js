var FruitNinja = FruitNinja || {};

FruitNinja.SpecialFruitSpawner = function (game_state, name, position, properties) {
    "use strict";
    FruitNinja.Spawner.call(this, game_state, name, position, properties);
};

FruitNinja.SpecialFruitSpawner.prototype = Object.create(FruitNinja.Spawner.prototype);
FruitNinja.SpecialFruitSpawner.prototype.constructor = FruitNinja.SpecialFruitSpawner;

FruitNinja.SpecialFruitSpawner.prototype.create_object = function (name, position, velocity) {
    "use strict";
    return new FruitNinja.SpecialFruit(this.game_state, name, position, {texture: "fruits_spritesheet", group: "special_fruits", frame: 15, velocity: velocity});
};