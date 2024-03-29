var FruitNinja = FruitNinja || {};

FruitNinja.UpgradeItem = function (game_state, name, position, properties) {
    "use strict";
    FruitNinja.MenuItem.call(this, game_state, name, position, properties);
    
    this.description = properties.description;
    this.price = properties.price;
    
    this.selected = false;
};

FruitNinja.UpgradeItem.prototype = Object.create(FruitNinja.MenuItem.prototype);
FruitNinja.UpgradeItem.prototype.constructor = FruitNinja.UpgradeItem;

FruitNinja.UpgradeItem.prototype.selection_over = function () {
    "use strict";
    FruitNinja.MenuItem.prototype.selection_over.call(this);
    this.game_state.prefabs.upgrade_description.text = this.description;
    this.game_state.prefabs.upgrade_price.text = this.price;
};

FruitNinja.UpgradeItem.prototype.selection_out = function () {
    "use strict";
    FruitNinja.MenuItem.prototype.selection_out.call(this);
    this.game_state.prefabs.upgrade_description.text = "";
    this.game_state.prefabs.upgrade_price.text = "";
};

FruitNinja.UpgradeItem.prototype.select = function () {
    "use strict";
    if (!this.selected && localStorage.money >= this.price) {
        localStorage.money -= this.price;
        this.selected = true;
    }
};