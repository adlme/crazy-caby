"use strict";

function main() {
  var mainElement = document.querySelector("#site-main");
  function buildDom(html) {
    mainElement.innerHTML = html;
    return mainElement;
  }

  function createSplashScreen() {
    var splashScreen = buildDom(` 
        <section>
            <h1>Crazy Caby</h1>
            <button>Start</button>
        </section>
        `);
    var startButton = splashScreen.querySelector("button");
    startButton.addEventListener("click", createGameScreen);
  }
  function createGameScreen() {
    var gameScreen = buildDom(`
        <section>
            <canvas width="800" height="600")></canvas>
        </section>
        <section id = "container">
            <article id="chat">
                <p class = "destiny">"Take me to the !"</p>
            </article>
            <article id="bank">
                <p>Money: </p>
            </article>
            <article id="time">
                <p>Time: </p>
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
          gameInstance.caby.width = 20;
          gameInstance.caby.height = 40;
 
        if (gameInstance.isCollide) {
          gameInstance.caby.setDirectionY(-1);
          gameInstance.isCollide = false;
        } else {
          gameInstance.caby.setDirectionY(1);
          gameInstance.caby.setDirectionX(0);
        }
      } else if (event.key === "ArrowUp") {
        gameInstance.caby.width = 20;
        gameInstance.caby.height = 40;
        if (gameInstance.isCollide) {
          gameInstance.caby.setDirectionY(1);
          gameInstance.isCollide = false;
        } else {
          gameInstance.caby.setDirectionY(-1);
          gameInstance.caby.setDirectionX(0);
        }
      } else if (event.key === "ArrowRight") {
        gameInstance.caby.width = 40;
        gameInstance.caby.height = 20;
        if (gameInstance.isCollide) {
          gameInstance.caby.setDirectionX(-1);
          gameInstance.isCollide = false;
        } else {
          gameInstance.caby.setDirectionY(0);
          gameInstance.caby.setDirectionX(1);
        }
      } else if (event.key === "ArrowLeft") {
        gameInstance.caby.width = 40;
        gameInstance.caby.height = 20;
        if (gameInstance.isCollide) {
          gameInstance.caby.setDirectionX(1);
          gameInstance.isCollide = false;
        } else {
          gameInstance.caby.setDirectionX(-1);
          gameInstance.caby.setDirectionY(0);
        }
      }
    });
    document.addEventListener("keyup", event => {
      gameInstance.caby.setDirectionX(0);
      gameInstance.caby.setDirectionY(0);
    });
  }

  function createGameOverScreen() {
    var gameOverScreen = buildDom(`
            <section>    
                <h1>Game Over</h1>
                <button>Restart</button>
            </section>
        `);
    var restartButton = gameOverScreen.querySelector("button");
    restartButton.addEventListener("click", createSplashScreen);
  }

  createSplashScreen();
}

window.addEventListener("load", main);
