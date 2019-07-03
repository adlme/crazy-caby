'use strict';

function Building(canvas,positionX, positionY, buildingName) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.x = positionX;
    this.y = positionY;
    this.color = 'green';
    this.width = 70;
    this.height = 30;
    this.name = buildingName;
};

Building.prototype.draw = function() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(this.name, this.x + (this.width/2), this.y + this.height/2);
   
}
