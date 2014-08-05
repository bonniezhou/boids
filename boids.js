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

function centre(j) {
	var cx = 0;
	var cy = 0;
	for (var i = 0; i < boids.length; i++) {
		if (i != j) {
			cx += boids[i].x;
			cy += boids[i].y;
		}
	}
	cx = cx/(boids.length - 1);
	cy = cy/(boids.length - 1);
	return {x: (cx - boids[j].x)/100, y: (cy - boids[j].y)/100};
}

function repel(j) {
	var cx = 0;
	var cy = 0;
	for (var i = 0; i < boids.length; i++) {
		if (i != j) {
			var dx = boids[i].x - boids[j].x;
			var dy = boids[i].y - boids[j].y;
			if (dx*dx + dy*dy < 400) {
				cx -= dx;
				cy -= dy;
			}
		}
	}
	return {x: cx, y: cy};
}

function tick() {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < boids.length; i++) {
		ctx.beginPath();
		ctx.arc(boids[i].x, boids[i].y, 10, 0, 2*Math.PI);
		ctx.stroke();
		var c = centre(i);
		var r = repel(i);
		boids[i].vx += c.x + r.x;
		boids[i].vy += c.y + r.y;
		boids[i].x += boids[i].vx;
		boids[i].y += boids[i].vy;
	}
}
setInterval(tick, 50);

