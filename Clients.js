'use strict';

function Client(canvas, typeClient, positionX, positionY, widthClient, heightClient, destiny,imageClient) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.type = typeClient;
    this.x = positionX;
    this.y = positionY;
    this.color = 'red';
    this.width = widthClient;
    this.height = heightClient;
    this.destiny = destiny;
    this.imageSRC = imageClient
};


Client.prototype.draw = function() {
    this.ctx.globalAlpha = 0;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.globalAlpha = 1.0;
    this.image = new Image();
    this.image.src = this.imageSRC;
    this.ctx.drawImage(this.image,this.x,this.y, this.width, this.height);
}
