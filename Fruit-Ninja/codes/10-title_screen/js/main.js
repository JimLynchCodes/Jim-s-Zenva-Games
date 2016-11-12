var FruitNinja = FruitNinja || {};

var game = new Phaser.Game("100%", "100%", Phaser.CANVAS);
game.state.add("BootState", new FruitNinja.BootState());
game.state.add("LoadingState", new FruitNinja.LoadingState());
game.state.add("GameState", new FruitNinja.LevelState());
game.state.add("TitleState", new FruitNinja.TitleState());
game.state.start("BootState", true, false, "assets/levels/title_screen.json", "TitleState");