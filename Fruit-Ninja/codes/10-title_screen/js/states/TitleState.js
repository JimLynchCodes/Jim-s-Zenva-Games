var FruitNinja = FruitNinja || {};

FruitNinja.TitleState = function () {
    "use strict";
    FruitNinja.JSONLevelState.call(this);
    
    this.prefab_classes = {
        "background": FruitNinja.Prefab.prototype.constructor,
        "title": FruitNinja.TextPrefab.prototype.constructor
    };
};

FruitNinja.TitleState.prototype = Object.create(FruitNinja.JSONLevelState.prototype);
FruitNinja.TitleState.prototype.constructor = FruitNinja.TitleState;