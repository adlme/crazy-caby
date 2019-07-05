"use strict";

function Game(canvas) {
  this.caby = null;
  this.clients = [];
  this.buildings = [];
  this.isGameOver = false;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.onGameOver = null;
  this.timeLeft = 25;
  this.cabyFull = false;
  this.clients.client = " ";
  this.bankValue = 0;
  this.gameSong = new Audio("./the-offspring-all-i-want.mp3");
  this.gameSong.volume = 0.12;
  this.hello = new Audio("./hello-there-sound-effectstar-wars.mp3");
  this.bye = new Audio("./bye-have-a-beautiful-time-sound-effect.mp3");
  this.yell = new Audio("./FU.mp3")
  this.yell.volume = 0.4;
  this.isShowMessage = false;
  this.clientsDropped = 0;
  this.addMoney = false;
  this.addTime = false;
  this.cont = 0;
}

Game.prototype.startGame = function() {
  //inicializar caby y clients
  this.gameSong.play();
  this.caby = new Caby(this.canvas);
  this.timer();

  // this.bank();
  //se crean los CLIENTS con posiciones fijadas
  for (var i = 0; i < 11; i++) {
    // debugger;
    if (i === 0) {
      this.clients.push(
        new Client(this.canvas, "client", 220, 500, 25, 38, "Club", "./p1.png")
      );
    } else if (i === 1) {
      this.clients.push(
        new Client(
          this.canvas,
          "client",
          290,
          200,
          25,
          34,
          "Restaurant",
          "./p2.png"
        )
      );
    } else if (i === 2) {
      this.clients.push(
        new Client(this.canvas, "client", 80, 300, 25, 41, "Beach", "./p3.png")
      );
    } else if (i === 3) {
      this.clients.push(
        new Client(
          this.canvas,
          "client",
          500,
          500,
          25,
          19,
          "Supermarket",
          "./p4.png"
        )
      );
    } else if (i === 4) {
      this.clients.push(
        new Client(
          this.canvas,
          "client",
          125,
          410,
          25,
          34,
          "Hospital",
          "./p5.png"
        )
      );
    } else if (i === 5) {
      this.clients.push(
        new Client(this.canvas, "client", 500, 300, 25, 21, "Park", "./p6.png")
      );
    } else if (i === 6) {
      this.clients.push(
        new Client(
          this.canvas,
          "taxist",
          400,
          300,
          50,
          22.5,
          "HAHAHAHA!",
          "./taxi.png"
        )
      );
    } else if (i === 7) {
      this.clients.push(
        new Client(
          this.canvas,
          "taxist",
          450,
          500,
          50,
          22.5,
          "HAHAHAHA!",
          "./taxi.png"
        )
      );
    } else if (i === 8) {
      this.clients.push(
        new Client(
          this.canvas,
          "taxist",
          600,
          150,
          50,
          22.5,
          "HAHAHAHA!",
          "./taxi.png"
        )
      );
    } else if (i === 9) {
      this.clients.push(
        new Client(
          this.canvas,
          "taxist",
          270,
          400,
          50,
          22.5,
          "HAHAHAHA!",
          "./taxi.png"
        )
      );
    } else if (i === 10) {
      this.clients.push(
        new Client(
          this.canvas,
          "taxist",
          50,
          420,
          50,
          22.5,
          "HAHAHAHA!",
          "./taxi.png"
        )
      );
    }
  }

  //se crean los BUILDINGS con posiciones fijadas
  for (var i = 0; i < 6; i++) {
    // debugger;
    if (i === 0) {
      this.buildings.push(
        new Building(this.canvas, 670, 110, "Club", 70, 70, "grey")
      );
    } else if (i === 1) {
      this.buildings.push(
        new Building(this.canvas, 240, 270, "Restaurant", 80, 30, "brown")
      );
    } else if (i === 2) {
      this.buildings.push(
        new Building(this.canvas, 680, 310, "Beach", 60, 140, "yellow")
      );
    } else if (i === 3) {
      this.buildings.push(
        new Building(this.canvas, 80, 470, "Supermarket", 90, 40, "cyan")
      );
    } else if (i === 4) {
      this.buildings.push(
        new Building(this.canvas, 0, 160, "Hospital", 70, 70, "red")
      );
    } else if (i === 5) {
      this.buildings.push(
        new Building(this.canvas, 380, 180, "Park", 100, 50, "green")
      );
    }
  }

  var loop = () => {
    this.cont++;
    this.timer();
    this.update();
    this.clear();
    this.draw();
    this.checkCollisionsClients();
    var hasCollided = this.checkCollisionsBuildings();
    if (!this.addMoney) {
      this.bank();
    }
    if (this.clientsDropped === 6) {
      this.isGameOver = true;
    }
    if (hasCollided) {
      this.caby.moveBack();
    }
    this.caby.checkScreen();
    if (!this.isGameOver) {
      requestAnimationFrame(loop);
    } else {
      this.onGameOver(this.bankValue, this.clientsDropped);
      this.gameSong.pause();
    }
  };
  loop();
};

Game.prototype.timer = function() {
  if (this.cont % 60 === 0) {
    this.timeLeft--;
  }

  if (!this.addTime) {
    var timerElement = document.querySelector("#timer");
    timerElement.innerHTML = `<p>${this.timeLeft}</p>`;
  }
  if (this.timeLeft <= 0) {
    this.isGameOver = true;
    this.gameSong.pause();
  }
};

Game.prototype.bank = function() {
  var bankElement = document.querySelector("#bank");
  bankElement.innerHTML = `${this.bankValue}`;
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

    if (rightLeft && leftRight && botttomTop && topBottom && client.type === "taxist") 
    { this.bankValue -= 10;
      this.timeLeft -= 10;
      this.yell.play();
      this.clients.splice(index, 1);
      this.showMessage();
      this.cabyFull = null;
    } else if (rightLeft && leftRight && botttomTop && topBottom && !this.cabyFull
    ) {
      this.clients.splice(index, 1);
      this.hello.play();

      this.cabyFull = {
        isFull: true,
        client: client.destiny,
        type: client.type
      };
      // muestre destino
      var destinyElement = document.querySelector("#destiny");
      function buildDestiny(html) {
        destinyElement.innerHTML = html;
        return destinyElement;
      }
      var showDestiny = () => {
        var destinyWindow = buildDestiny(` 
                <p>Take me to ${this.cabyFull.client}!</p>
                `);
      };
      showDestiny();
    } else if (!this.cabyFull && !this.isShowMessage) {
      var destinyElement = document.querySelector("#destiny");
      function buildDestiny(html) {
        destinyElement.innerHTML = html;
        return destinyElement;
      }
      var showDestiny = () => {
        var destinyWindow = buildDestiny(` 
                <p>Find a customer!!!</p>
                `);
      };
      showDestiny();
    }
  });
};

Game.prototype.showMessage = function() {
  this.isShowMessage = true;
  var destinyElement = document.querySelector("#destiny");
  destinyElement.innerHTML = "<p>HAHAHAHA</p>";
  setTimeout(() => {
    this.isShowMessage = false;
  }, 3000);
};

Game.prototype.showAddMoney = function() {
  this.addMoney = true;
  var destinyElement = document.querySelector("#bank");
  destinyElement.innerHTML = "<p>+ $5</p>";
  setTimeout(() => {
    this.addMoney = false;
  }, 3000);
};

Game.prototype.showAddTime = function() {
  this.addTime = true;
  var destinyElement = document.querySelector("#timer");
  destinyElement.innerHTML = "<p>+5 secs</p>";
  setTimeout(() => {
    this.addTime = false;
  }, 3000);
};

Game.prototype.checkCollisionsBuildings = function() {
  var collision = false;
  this.buildings.forEach((building, index) => {
    var rightLeft = this.caby.x + this.caby.width > building.x;
    var leftRight = this.caby.x < building.x + building.width;
    var bottomTop = this.caby.y + this.caby.height > building.y;
    var topBottom = this.caby.y < building.y + building.height;

    if (rightLeft && leftRight && bottomTop && topBottom) {
      collision = true;
      if (this.cabyFull) {
        if (this.buildings[index].name === this.cabyFull.client) {
          this.showAddMoney();
          this.showAddTime();
          this.cabyFull = null;
          this.clientsDropped++;
          this.timeLeft += 5;
          this.bankValue += 5;
          this.bye.play();
        }
      }
    }
  });
  return collision;
};

Game.prototype.gameOverCallback = function(callback) {
  this.onGameOver = callback;
};
