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
    this.img = new Image();
    this.img.src = imageClient
};


Client.prototype.draw = function() {
    this.ctx.drawImage(this.img,this.x,this.y, this.width, this.height);
}
