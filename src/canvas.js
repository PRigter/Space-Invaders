let ctx = document.querySelector("canvas").getContext("2d");

// TEST IMAGE
/* 
let img = document.createElement("img");
img.src = "img/alien.png";
window.onload = function () {
    ctx.drawImage(img, 0, 0);
}
*/

function drawRectangle(myRectangle, context) {
    context.beginPath();
    context.rect(myRectangle.x, myRectangle.y, myRectangle.width, myRectangle.height);
    context.fillStyle = '#8ED6FF';
    context.fill();
    context.lineWidth = myRectangle.borderWidth;
    context.strokeStyle = 'black';
    context.stroke();

} var myRectangle = {
    x: 0,
    y: 75,
    width: 100,
    height: 50,
    borderWidth: 5
};

drawRectangle(myRectangle, ctx);


document.addEventListener('keydown', (event) => {
    if(event.key=='ArrowLeft')
    {
        myRectangle.x-=2;
        ctx.clearRect(0,0,document.querySelector("canvas").width,document.querySelector("canvas").height);
        drawRectangle(myRectangle, ctx);
        ctx.drawImage(img, 0, 0);
    }
    if(event.key=='ArrowRight')
    {
        myRectangle.x+=2;
        ctx.clearRect(0,0,document.querySelector("canvas").width,document.querySelector("canvas").height);
        drawRectangle(myRectangle, ctx);
       
    }
});


