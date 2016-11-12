var FruitNinja = FruitNinja || {};

FruitNinja.SavePlayerName = function (game_state, name, position, properties) {
    "use strict";
    FruitNinja.TextPrefab.call(this, game_state, name, position, properties);
    
    this.text = "";
    
    this.game_state.game.input.keyboard.addCallbacks(this, this.save_player_name);
};

FruitNinja.SavePlayerName.prototype = Object.create(FruitNinja.TextPrefab.prototype);
FruitNinja.SavePlayerName.prototype.constructor = FruitNinja.SavePlayerName;

FruitNinja.SavePlayerName.prototype.save_player_name = function (event) {
    "use strict";
    if (event.keyCode === Phaser.Keyboard.ENTER) {
        console.log(this.text);
        this.game.player_ref = database.child(this.text);
        this.game.player_ref.once("value", this.game_state.save_player_data.bind(this.game_state));
    } else {
        this.text += String.fromCharCode(event.keyCode);
    }
};