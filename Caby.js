'use strict';

function Caby(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.height = 20;
  this.width = 40;
  this.x = 200;
  this.y = 300;
  this.velocity = 4;
  this.directionX = null;
  this.directionY = null;
  this.color = 'blue';
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

Caby.prototype.draw = function() {
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
  this.image = new Image();
  this.image.src = '';
  this.ctx.drawImage(this.image,this.x,this.y, this.width, this.height);
};

Caby.prototype.setDirectionX = function(newDirectionX) {
  this.directionX = newDirectionX;
};

Caby.prototype.setDirectionY = function(newDirectionY) {
  this.directionY = newDirectionY;
};