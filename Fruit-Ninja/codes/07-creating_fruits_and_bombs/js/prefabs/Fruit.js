var FruitNinja = FruitNinja || {};

FruitNinja.Fruit = function (game_state, name, position, properties) {
    "use strict";
    var frame_index;
    FruitNinja.Cuttable.call(this, game_state, name, position, properties);
    
    this.body.setSize(20, 20);    
    
    this.frames = properties.frames;
    this.frame = this.game_state.game.rnd.pick(this.frames);
};

FruitNinja.Fruit.prototype = Object.create(FruitNinja.Cuttable.prototype);
FruitNinja.Fruit.prototype.constructor = FruitNinja.Fruit;

FruitNinja.Fruit.prototype.reset = function (position_x, position_y, velocity) {
    "use strict";
    var frame_index;
    FruitNinja.Cuttable.prototype.reset.call(this, position_x, position_y, velocity);
    
    this.frame = this.game_state.game.rnd.pick(this.frames);
};

FruitNinja.Fruit.prototype.cut = function () {
    "use strict";
    FruitNinja.Cuttable.prototype.cut.call(this);
    this.game_state.score += 1;
    this.kill();
};