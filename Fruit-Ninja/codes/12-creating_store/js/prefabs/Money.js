var FruitNinja = FruitNinja || {};

FruitNinja.Money = function (game_state, name, position, properties) {
    "use strict";
    FruitNinja.TextPrefab.call(this, game_state, name, position, properties);
};

FruitNinja.Money.prototype = Object.create(FruitNinja.TextPrefab.prototype);
FruitNinja.Money.prototype.constructor = FruitNinja.Money;

FruitNinja.Money.prototype.update = function () {
    "use strict";
    this.text = "Money: " + localStorage.money;
};