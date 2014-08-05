var canvas = document.getElementById("canvas"); //returns DOM element canvas
var ctx = canvas.getContext("2d");

var boids = [];
for (var i = 0; i < 50; i++) {
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

function velocity(j) {
	var cx = 0;
	var cy = 0;
	for (var i = 0; i < boids.length; i++) {
		if (i != j) {
			cx += boids[i].vx;
			cy += boids[i].vy;
		}
	}
	cx = cx/(boids.length - 1);
	cy = cy/(boids.length - 1);
	return {x: cx - boids[j].vx, y: cy - boids[j].vy}
}

var mouseX = 0;
var mouseY = 0;
document.addEventListener("mousemove", function(event) {
	mouseX = event.offsetX;
	mouseY = event.offsetY;
});

function mouse(j) {
	return {x: mouseX - boids[j].x, y: mouseY - boids[j].y};
}




function tick() {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < boids.length; i++) {
		ctx.beginPath();
		ctx.arc(boids[i].x, boids[i].y, 2, 0, 2*Math.PI);
		ctx.stroke();
		var c = centre(i);
		var r = repel(i);
		var v = velocity(i);
		var m = mouse(i);
		boids[i].vx += (c.x/10 + r.x/5 + v.x/20 + m.x/60)/5;
		boids[i].vy += (c.y/10 + r.y/5 + v.y/20 + m.y/60)/5;
		var maxv = 10;
		if (boids[i].vx > maxv) {
			boids[i].vx = maxv;
		} 
		if (boids[i].vx < -maxv) {
			boids[i].vx = -maxv;
		}
		if (boids[i].vy > maxv) {
			boids[i].vy = maxv;
		}
		if (boids[i].vy < -maxv) {
			boids[i].vy = -maxv;
		}
		boids[i].x += boids[i].vx;
		boids[i].y += boids[i].vy;
	}
}
setInterval(tick, 50);

