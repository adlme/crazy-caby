"use strict";

function main() {
  var mainElement = document.querySelector("#site-main");
  function buildDom(html) {
    mainElement.innerHTML = html;
    return mainElement;
  }

  function createSplashScreen() {
    var splashScreen = buildDom(` 
        <section class = "splashScreen" style="width:800px;height:600px;border:0;">
            <button></button>
        </section>
        `);
    var startButton = splashScreen.querySelector("button");
    startButton.addEventListener("click", createGameScreen);
  }
  function createGameScreen() {
    var gameScreen = buildDom(`
        <section>
            <canvas width="800" height="600"></canvas>
        </section>
        <section id = "container">
            <article class = "chat">
                <div id= "destiny"></div>
            </article>
            <article class="bank">
                <div id = "bank"></div>
            </article>
            <article class="time">
                <div id = "timer"></div>
            </article>
        </section>
        `);
    // crear instancia de la constructora, no usas la FC porque quieres el objeto que ésta te crea
    var canvas = document.querySelector("canvas");
    var gameInstance = new Game(canvas);
    gameInstance.gameOverCallback(createGameOverScreen);
    gameInstance.startGame();
    document.addEventListener("keydown", event => {
      if (event.key === "ArrowDown") {
        gameInstance.caby.width = 55;
        gameInstance.caby.height = 62;
        gameInstance.caby.imageSRC = "./cabyDOWN.png";

        gameInstance.caby.setDirectionY(1);
        gameInstance.caby.setDirectionX(0);
      } else if (event.key === "ArrowUp") {
        gameInstance.caby.width = 55;
        gameInstance.caby.height = 62;
        gameInstance.caby.imageSRC = "./cabyUP.png";

        gameInstance.caby.setDirectionY(-1);
        gameInstance.caby.setDirectionX(0);
      } else if (event.key === "ArrowRight") {
        gameInstance.caby.width = 62;
        gameInstance.caby.height = 55;
        gameInstance.caby.imageSRC = "./cabyRIGHT.png";

        gameInstance.caby.setDirectionY(0);
        gameInstance.caby.setDirectionX(1);
      } else if (event.key === "ArrowLeft") {
        gameInstance.caby.width = 62;
        gameInstance.caby.height = 55;
        gameInstance.caby.imageSRC = "./cabyLEFT.png";

        gameInstance.caby.setDirectionX(-1);
        gameInstance.caby.setDirectionY(0);
      }
    });
    document.addEventListener("keyup", event => {
      gameInstance.caby.setDirectionX(0);
      gameInstance.caby.setDirectionY(0);
    });
  }

  function createGameOverScreen(bankValue, clientsDropped) {
    
    var gameOverScreen = buildDom(`
            <section class = "gameover" style="width:800px;height:600px;border:0;">    
                <p id = "bank-value">${bankValue}</p>
                <p id = "clients-dropped">${clientsDropped}</p>
                <button>Restart</button>
            </section>
        `);
    var restartButton = gameOverScreen.querySelector("button");
    restartButton.addEventListener("click", createSplashScreen);
  }

  createSplashScreen();
}

window.addEventListener("load", main);
