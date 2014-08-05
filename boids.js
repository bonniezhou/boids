var canvas = document.getElementById("canvas"); //returns DOM element canvas
var ctx = canvas.getContext("2d");

var boids = [];
for (var i = 0; i < 25; i++) {
	boids.push({
		x: Math.random()*canvas.width,
		y: Math.random()*canvas.height,
		vx: Math.random()*10 - 5,
		vy: Math.random()*10 - 5
	})
}


function tick() {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < boids.length; i++) {
		ctx.beginPath();
		ctx.arc(boids[i].x, boids[i].y, 20, 0, 2*Math.PI);
		ctx.stroke();
		boids[i].x += boids[i].vx;
		boids[i].y += boids[i].vy;
	}
}
setInterval(tick, 50);
