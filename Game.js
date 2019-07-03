"use strict";

function Game(canvas) {
  this.caby = null;
  this.clients = [];
  this.buildings = [];
  this.isGameOver = false;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.onGameOver = null;
  this.timeLeft = 20;
  this.isCollide = false;
  this.cabyFull = false;
  this.clients.client = " ";
  this.bank = 0;
  this.gameSong = new Audio("./the-offspring-all-i-want.mp3");
  this.gameSong.volume = 0.15;
  this.hello = new Audio("./hello-there-sound-effectstar-wars.mp3");
  this.bye = new Audio("./bye-have-a-beautiful-time-sound-effect.mp3");
}

Game.prototype.startGame = function() {
  //inicializar caby y clients
  this.gameSong.play();
  this.caby = new Caby(this.canvas);
  this.timer();
  // this.bank();
  //se crean los CLIENTS con posiciones fijadas
  for (var i = 0; i < 7; i++) {
    // debugger;
    if (i === 0) {
      this.clients.push(new Client(this.canvas, 220, 150, "Club", "./p1.png"));
    } else if (i === 1) {
      this.clients.push(
        new Client(this.canvas, 290, 200, "Restaurant", "./p2.png")
      );
    } else if (i === 2) {
      this.clients.push(new Client(this.canvas, 80, 300, "Beach", "./p3.png"));
    } else if (i === 3) {
      this.clients.push(
        new Client(this.canvas, 500, 500, "Supermarket", "./p4.png")
      );
    } else if (i === 4) {
      this.clients.push(
        new Client(this.canvas, 125, 410, "Hospital", "./p5.png")
      );
    } else if (i === 5) {
      this.clients.push(new Client(this.canvas, 500, 300, "Park", "./p5.png"));
    }
  }

  //se crean los BUILDINGS con posiciones fijadas
  for (var i = 0; i < 6; i++) {
    // debugger;
    if (i === 0) {
      this.buildings.push(new Building(this.canvas, 670, 110, "Club", 70, 70));
    } else if (i === 1) {
      this.buildings.push(
        new Building(this.canvas, 240, 270, "Restaurant", 80, 30)
      );
    } else if (i === 2) {
      this.buildings.push(
        new Building(this.canvas, 680, 310, "Beach", 60, 140)
      );
    } else if (i === 3) {
      this.buildings.push(
        new Building(this.canvas, 80, 470, "Supermarket", 90, 40)
      );
    } else if (i === 4) {
      this.buildings.push(
        new Building(this.canvas, 0, 160, "Hospital", 70, 70)
      );
    } else if (i === 5) {
      this.buildings.push(new Building(this.canvas, 380, 180, "Park", 100, 50));
    }
  }

  var loop = () => {
    this.checkCollisionsClients();
    this.checkCollisionsBuildings();
    this.update();
    this.checkCollisionsClients();
    this.clear();
    this.draw();
    this.checkCollisionsBuildings();
    this.caby.checkScreen();
    if (!this.isGameOver) {
      requestAnimationFrame(loop);
    } else {
      this.onGameOver();
    }
  };
  loop();
};

Game.prototype.timer = function() {
  var downloadTimer = setInterval(() => {
    this.timeLeft = this.timeLeft - 1;
    if (this.timeLeft <= 0) {
      clearInterval(downloadTimer);
      this.isGameOver = true;
      this.gameSong.pause();
    }
    var timerElement = document.querySelector("#timer");
    function buildTimer(html) {
      timerElement.innerHTML = html;
      return timerElement;
    }
    var showTimer = () => {
      var timerWindow = buildTimer(` 
              <p>${this.timeLeft}</p>
              `);
    };
    showTimer();
  }, 1000);
};

// Game.prototype.bank = function() {
//     var bankElement = document.querySelector("#bank");
//     function buildBank(html) {
//     bankElement.innerHTML = html;
//     return bankElement;
//     };
//     var showBank = () => {
//         var bankWindow = buildBank(`
//             <p>$${this.bank}</p>
//             `);
//           };
//           showBank();
// };

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
      this.hello.play();
      this.cabyFull = { isFull: true, client: client.destiny };
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
    } else if (!this.cabyFull) {
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

Game.prototype.checkCollisionsBuildings = function() {
  var hadCollide = false;
  var newPosition = this.caby;
  this.buildings.forEach((building, index) => {
    var rightLeft = this.caby.x + this.caby.width > building.x;
    var leftRight = this.caby.x < building.x + building.width;
    var bottomTop = this.caby.y + this.caby.height > building.y;
    var topBottom = this.caby.y < building.y + building.height;

    if (rightLeft && leftRight && bottomTop && topBottom) {
      
      if(this.caby.directionX===1){
        this.caby.directionX=0;
        this.caby.x-=3;
      }else if(this.caby.directionX===-1){
        this.caby.directionX=0;
        this.caby.x+=3;
      }else if(this.caby.directionY===1){
        this.caby.directionY=0;
        this.caby.y-=3;
      }else if(this.caby.directionY===-1){
        this.caby.directionY=0;
        this.caby.y+=3;
      }

      if (this.cabyFull) {
        if(this.buildings[index].name === this.cabyFull.client) {
            this.cabyFull = null;
            this.timeLeft += 2;
            this.bank +=5;
            this.bye.play();
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
