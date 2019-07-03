"use strict";

function Game(canvas) {
  this.caby = null;
  this.clients = [];
  this.buildings = [];
  this.isGameOver = false;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.onGameOver = null;
  this.time = 100;
  this.isCollide=false;
  this.cabyFull=false;
}

Game.prototype.startGame = function() {
  //inicializar caby y clients
  this.caby = new Caby(this.canvas);

  //se crean los CLIENTS con posiciones fijadas
  for (var i = 0; i < 6; i++) {
    // debugger;
    if (i === 0) {
      this.clients.push(
        new Client(this.canvas, 40, 30, "Club")
      );
    } else if (i === 1) {
      this.clients.push(
        new Client(this.canvas, 90, 60, "Restaurant")
      );
    } else if (i === 2) {
      this.clients.push(new Client(this.canvas, 80, 300, "Beach"));
    } else if (i === 3) {
      this.clients.push(
        new Client(this.canvas, 500, 250, "Supermarket")
      );
    } else if (i === 4) {
      this.clients.push(
        new Client(this.canvas, 325, 210, "Hospital")
      );
    } else if (i === 5) {
      this.clients.push(
        new Client(this.canvas, 200, 20, "Park")
      );
    }
  }

  //se crean los BUILDINGS con posiciones fijadas
  for (var i = 0; i < 6; i++) {
    // debugger;
    if (i === 0) {
      this.buildings.push(new Building(this.canvas, 60, 60, "Club"));
    } else if (i === 1) {
      this.buildings.push(new Building(this.canvas, 80, 300, "Restaurant"));
    } else if (i === 2) {
      this.buildings.push(new Building(this.canvas, 40, 270, "Beach"));
    } else if (i === 3) {
      this.buildings.push(new Building(this.canvas, 400, 40, "Supermarket"));
    } else if (i === 4) {
      this.buildings.push(new Building(this.canvas, 500, 210, "Hospital"));
    } else if (i === 5) {
      this.buildings.push(new Building(this.canvas, 540, 230, "Park"));
    }
  }

  var loop = () => {
    this.update();
    this.clear();
    this.draw();
    this.caby.checkScreen();
    this.checkCollisionsClients();
    this.checkCollisionsBuildings();
    if (!this.isGameOver) {
      requestAnimationFrame(loop);
    } else {
      this.onGameOver();
    }
  };
  loop();
};

Game.prototype.update = function() {
  this.caby.move();
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.draw = function() {
  this.caby.draw();
  this.clients.forEach(function(client) {
    client.draw();
  });
  this.buildings.forEach(function(building) {
    building.draw();
  });
};

Game.prototype.checkCollisionsClients = function() {
  this.clients.forEach((client, index) => {
    var rightLeft = this.caby.x + this.caby.width >= client.x;
    var leftRight = this.caby.x <= client.x + client.width;
    var botttomTop = this.caby.y + this.caby.height >= client.y;
    var topBottom = this.caby.y <= client.y + client.height;

    if (rightLeft && leftRight && botttomTop && topBottom && !this.cabyFull) {
      this.clients.splice(index, 1);
      this.cabyFull={isFull: true, client: client.destiny};
      // AQUI METER LO DE HACER EL DOM MANIPULATION PARA INCLUIR EL DESTINO
    }
  });
};

Game.prototype.checkCollisionsBuildings = function() {
  this.buildings.forEach((building, index) => {
    var rightLeft = this.caby.x + this.caby.width > building.x;
    var leftRight = this.caby.x < building.x + building.width;
    var bottomTop = this.caby.y + this.caby.height > building.y;
    var topBottom = this.caby.y < building.y + building.height;

    if (rightLeft && leftRight && bottomTop && topBottom) {
    if (this.cabyFull) {
        if(this.buildings[index].name === this.cabyFull.client) {
            this.cabyFull = null;
            this.time += 10;
        }
    }
      this.caby.directionX = 0;
      this.caby.directionY = 0;
      this.isCollide=true;
    }
  });
};

Game.prototype.gameOverCallback = function(callback) {
  this.onGameOver = callback;
};
