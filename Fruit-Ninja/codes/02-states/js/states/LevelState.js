var FruitNinja = FruitNinja || {};

FruitNinja.LevelState = function () {
    "use strict";
    Phaser.State.call(this);

    this.prefab_classes = {
        "background": FruitNinja.Prefab.prototype.constructor
    }
};

FruitNinja.LevelState.prototype = Object.create(Phaser.State.prototype);
FruitNinja.LevelState.prototype.constructor = FruitNinja.LevelState;

FruitNinja.LevelState.prototype.init = function (level_data) {
    "use strict";
    this.level_data = level_data;
    
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1000;
};

FruitNinja.LevelState.prototype.create = function () {
    "use strict";
    var group_name, prefab_name;
    
    this.groups = {};
    this.level_data.groups.forEach(function (group_name) {
        this.groups[group_name] = this.game.add.group();
    }, this);
    
    this.prefabs = {};
    for (prefab_name in this.level_data.prefabs) {
        if (this.level_data.prefabs.hasOwnProperty(prefab_name)) {
            this.create_prefab(prefab_name, this.level_data.prefabs[prefab_name]);
        }
    }
};

FruitNinja.LevelState.prototype.create_prefab = function (prefab_name, prefab_data) {
    "use strict";
    var prefab_position, prefab;
    if (this.prefab_classes.hasOwnProperty(prefab_data.type)) {
        if (prefab_data.position.x > 0 && prefab_data.position.x <= 1) {
            prefab_position = new Phaser.Point(prefab_data.position.x * this.game.world.width, prefab_data.position.y * this.game.world.height);
        } else {
            prefab_position = prefab_data.position;
        }
        prefab = new this.prefab_classes[prefab_data.type](this, prefab_name, prefab_position, prefab_data.properties);
    }
};