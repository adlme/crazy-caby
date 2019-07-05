'use strict';

function Caby(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.height = 55;
  this.width = 62;
  this.x = 200;
  this.y = 300;
  this.velocity = 4;
  this.directionX = null;
  this.directionY = null;
  this.img = new Image();
  this.img.src = './cabyRIGHT.png'
}

Caby.prototype.checkScreen = function() {
  var checkRight = this.x > this.canvas.width-this.width;
  var checkLeft = this.x < 0;
  var checkUp = this.y < 0;
  var checkDown = this.y > this.canvas.height-this.height;

  if(checkRight) {
    this.x = this.canvas.width-this.width - 1;
    this.directionX = 0;
  };

  if(checkLeft) {
    this.x = 1;
    this.directionX = 0;
  };

  if(checkUp) {
    this.y = 1;
    this.directionY = 0;
  };

  if(checkDown) {
    this.y = this.canvas.height-this.height - 1;
    this.directionY = 0;
  };
};

Caby.prototype.move = function() {
  this.y = this.y + this.directionY * this.velocity;
  this.x = this.x + this.directionX * this.velocity;
};
Caby.prototype.moveBack = function() {
  this.y = this.y - this.directionY * this.velocity;
  this.x = this.x - this.directionX * this.velocity;
};

Caby.prototype.draw = function() {
  this.ctx.drawImage(this.img,this.x,this.y, this.width, this.height);
};

Caby.prototype.setImg = function(direction){
  
  if(direction === "right"){
    this.img.src = './cabyRIGHT.png';
  } 
  else if(direction === "left"){
    this.img.src = './cabyLEFT.png';
  } 
  else if(direction === "down"){
    this.img.src = "./cabyDOWN.png"

  } else if(direction === "up"){
    this.img.src = "./cabyUP.png"
  }
}

Caby.prototype.setDirectionX = function(newDirectionX, newDirectionY) {
  this.directionX = newDirectionX;
};

Caby.prototype.setDirectionY = function(newDirectionY, newDirectionX) {
  this.directionY = newDirectionY;
};