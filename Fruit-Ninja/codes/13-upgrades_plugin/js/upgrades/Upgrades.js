var FruitNinja = FruitNinja || {};

FruitNinja.Upgrades = function (game, parent) {
    "use strict";
    Phaser.Plugin.call(this, game, parent);
};

FruitNinja.Upgrades.prototype = Object.create(Phaser.Plugin.prototype);
FruitNinja.Upgrades.prototype.constructor = FruitNinja.Upgrades;

FruitNinja.Upgrades.prototype.init = function (game_state) {
    "use strict";
    this.game_state = game_state;
    this.upgrade_classes = {
        "super_blade": FruitNinja.Upgrade.prototype.constructor,
        "extra_blade": FruitNinja.Upgrade.prototype.constructor
    };
};

FruitNinja.Upgrades.prototype.apply_upgrades = function (upgrades) {
    "use strict";
    upgrades.forEach(function (upgrade_data) {
        var upgrade;
        if (this.upgrade_classes.hasOwnProperty(upgrade_data.type)) {
            upgrade = new this.upgrade_classes[upgrade_data.type](this.game_state, upgrade_data.properties);
            upgrade.apply();
        }
    }, this);
};