var FruitNinja = FruitNinja || {};

FruitNinja.LoginState = function () {
    "use strict";
    FruitNinja.JSONLevelState.call(this);
    
    this.prefab_classes = {
        "background": FruitNinja.Prefab.prototype.constructor,
        "title": FruitNinja.TextPrefab.prototype.constructor,
        "player_input": FruitNinja.PlayerInput.prototype.constructor,
        "button": FruitNinja.Button.prototype.constructor
    };
};

FruitNinja.LoginState.prototype = Object.create(FruitNinja.JSONLevelState.prototype);
FruitNinja.LoginState.prototype.constructor = FruitNinja.LoginState;

FruitNinja.LoginState.prototype.create = function () {
    "use strict";
    FruitNinja.JSONLevelState.prototype.create.call(this);
    
    this.game.input.keyboard.addCallbacks(this, null, null, this.save_player_input);
    this.current_player_input = this.prefabs.email_input.player_input;
};

FruitNinja.LoginState.prototype.save_player_input = function (char) {
    "use strict";
    this.current_player_input.text += char;
};

FruitNinja.LoginState.prototype.attempt_login = function () {
    "use strict";
    this.email = this.prefabs.email_input.player_input.text;
    this.password = this.prefabs.password_input.player_input.text;
    console.log("login with email " + this.email + " and password " + this.password);
};