var FruitNinja = FruitNinja || {};

FruitNinja.LevelState = function () {
    "use strict";
    Phaser.State.call(this);
    
    this.prefab_classes = {
        "background": FruitNinja.Prefab.prototype.constructor,
        "score": FruitNinja.Score.prototype.constructor,
        "lives": FruitNinja.Lives.prototype.constructor,
        "fruit_spawner": FruitNinja.FruitSpawner.prototype.constructor,
        "special_fruit_spawner": FruitNinja.SpecialFruitSpawner.prototype.constructor,
        "bomb_spawner": FruitNinja.BombSpawner.prototype.constructor
    };
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
    
    this.MINIMUM_SWIPE_LENGTH = 50;
    this.CUT_STYLE = {line_width: 5, color: 0xE82C0C, alpha: 1};
    
    this.score = 0;
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
    
    this.game.input.onDown.add(this.start_swipe, this);
    this.game.input.onUp.add(this.end_swipe, this);
};

FruitNinja.LevelState.prototype.create_prefab = function (prefab_name, prefab_data) {
    "use strict";
    var prefab_position, prefab;
    // create object according to its type
    if (this.prefab_classes.hasOwnProperty(prefab_data.type)) {
        if (prefab_data.position.x > 0 && prefab_data.position.x <= 1) {
            // position as percentage
            prefab_position = new Phaser.Point(prefab_data.position.x * this.game.world.width,
                                              prefab_data.position.y * this.game.world.height);
        } else {
            // position as absolute number
            prefab_position = prefab_data.position;
        }
        prefab = new this.prefab_classes[prefab_data.type](this, prefab_name, prefab_position, prefab_data.properties);
    }
};

FruitNinja.LevelState.prototype.start_swipe = function (pointer) {
    "use strict";
    this.start_swipe_point = new Phaser.Point(pointer.x, pointer.y);
};

FruitNinja.LevelState.prototype.end_swipe = function (pointer) {
    "use strict";
    var swipe_length, cut;
    this.end_swipe_point = new Phaser.Point(pointer.x, pointer.y);
    swipe_length = Phaser.Point.distance(this.end_swipe_point, this.start_swipe_point);
    if (swipe_length >= this.MINIMUM_SWIPE_LENGTH) {
        cut = new FruitNinja.Cut(this, "cut", {x: 0, y: 0}, {group: "cuts", start: this.start_swipe_point, end: this.end_swipe_point, duration: 0.3, style: Object.create(this.CUT_STYLE)});
        
        this.swipe = new Phaser.Line(this.start_swipe_point.x, this.start_swipe_point.y, this.end_swipe_point.x, this.end_swipe_point.y);
        
        this.groups.fruits.forEachAlive(this.check_collision, this);
        this.groups.special_fruits.forEachAlive(this.check_collision, this);
        this.groups.bombs.forEachAlive(this.check_collision, this);
    }
};

FruitNinja.LevelState.prototype.check_collision = function (object) {
    "use strict";
    var object_rectangle, line1, line2, line3, line4, intersection;

    object_rectangle = new Phaser.Rectangle(object.body.x, object.body.y, object.body.width, object.body.height);
    
    line1 = new Phaser.Line(object_rectangle.left, object_rectangle.bottom, object_rectangle.left, object_rectangle.top);
    line2 = new Phaser.Line(object_rectangle.left, object_rectangle.top, object_rectangle.right, object_rectangle.top);
    line3 = new Phaser.Line(object_rectangle.right, object_rectangle.top, object_rectangle.right, object_rectangle.bottom);
    line4 = new Phaser.Line(object_rectangle.right, object_rectangle.bottom, object_rectangle.left, object_rectangle.bottom);
    intersection = this.swipe.intersects(line1) || this.swipe.intersects(line2) || this.swipe.intersects(line3) || this.swipe.intersects(line4);
    if (intersection) {
        object.cut();
    }
};

FruitNinja.LevelState.prototype.game_over = function () {
    "use strict";
    this.game.state.restart(true, false, this.level_data);
};