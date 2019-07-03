'use strict';

function Client(canvas, positionX, positionY, destiny) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.x = positionX;
    this.y = positionY;
    this.color = 'red';
    this.width = 10;
    this.height = 10;
    this.destiny = destiny;
};


Client.prototype.draw = function() {
    
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height)
}
