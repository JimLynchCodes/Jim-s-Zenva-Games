var FruitNinja = FruitNinja || {};

FruitNinja.Spawner = function (game_state, name, position, properties) {
    "use strict";
    FruitNinja.Prefab.call(this, game_state, name, position, properties);
    
    this.pool = this.game_state.groups[properties.pool];
    
    this.spawn_time = properties.spawn_time;
    
    this.velocity_x = properties.velocity_x;
    this.velocity_y = properties.velocity_y;
    
    this.spawn_timer = this.game_state.time.create();
    this.schedule_spawn();
};

FruitNinja.Spawner.prototype = Object.create(FruitNinja.Prefab.prototype);
FruitNinja.Spawner.prototype.constructor = FruitNinja.Spawner;

FruitNinja.Spawner.prototype.schedule_spawn = function () {
    "use strict";
    var time;
    time = this.game_state.rnd.between(this.spawn_time.min, this.spawn_time.max);
    this.spawn_timer.add(Phaser.Timer.SECOND * time, this.spawn, this);
    this.spawn_timer.start();
};

FruitNinja.Spawner.prototype.spawn = function () {
    "use strict";
    var object_name, object_position, object, object_velocity;
    object_position = new Phaser.Point(this.game_state.rnd.between(0.2 * this.game_state.game.world.width, 0.8 * this.game_state.game.world.width), this.game_state.game.world.height);
    object_velocity = new Phaser.Point(this.game_state.rnd.between(this.velocity_x.min, this.velocity_x.max), this.game_state.rnd.between(this.velocity_y.min, this.velocity_y.max));
    
    object = this.pool.getFirstDead();
    if (!object) {
        object_name = "object_" + this.pool.countLiving();
        object = this.create_object(object_name, object_position, object_velocity);
    } else {
        object.reset(object_position.x, object_position.y, object_velocity);
    }
    
    this.schedule_spawn();
};