class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100, 200, 25, 25);
    car1.shapeColor = "blue";
    car2 = createSprite(300, 200, 50, 50);
    car1.shapeColor = "green";
    car3 = createSprite(500, 200, 75, 75);
    car1.shapeColor = "yellow";
    car4 = createSprite(700, 200, 100, 100);
    car1.shapeColor = "pink";
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      var display_position = 130;
      //index of the array
      var index = 0;
      var x = 0, y = 0;
      for(var plr in allPlayers){
        index = index + 1;
        x = x + 200;
        y = displayHeight - allPlayers[plr].distance
        cars[index - 1].x = x
        cars[index - 1].y = y

        if (index === player.index) {
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index - 1].y;
        }         
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance += 50
      player.update();
    }
  }
}
