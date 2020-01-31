var parts = 10;

var particles = [];
let button;
let slider;
let color;



function setup() {

  createCanvas(600, 400);
  colorMode(HSB, 255);
  slider = createSlider(0, 40, 10);
  slider.position(20, 520);
  color = createSlider(0, 255, random(256));
  color.position(160, 520);
  button = createButton("Uppdatera / Starta")
  button.position(20, 560);

}

function init() {
  particles = [];
  for (var i = 0; i < parts; i++) {
    particles.push(new Particle());

  }



}

function draw() {

  parts = slider.value();
  button.mousePressed(init);
  background(51);
if (particles.length != 0) {
  for (var c = 0; c < particles.length; c++) {
    particles[c].update();
    particles[c].move();
  }

  for (var i = 0; i < particles.length; i++) {
    for (var j = 0; j < particles.length; j++) {
      if (particles[i] == particles[j]) {
        continue;
      }
      if (dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y) <= particles[i].d) {
        var deltaVX = particles[i].vx - particles[j].vx;
        var deltaVY = particles[i].vy - particles[j].vy;

        var deltaX = particles[j].x - particles[i].x;
        var deltaY = particles[j].y - particles[i].y;

        if (deltaVX * deltaX + deltaVY * deltaY >= 0) {

          var  angle = -atan2(particles[j].y - particles[i].y, particles[j].x - particles[i].x);

          var m1 = particles[i].mass;
          var m2 = particles[j].mass;

          var u1x = particles[i].vx * cos(angle) - particles[i].vy * sin(angle);
          var u1y = particles[i].vx * sin(angle) + particles[i].vy * cos(angle);

          var u2x = particles[j].vx * cos(angle) - particles[j].vy * sin(angle);
          var u2y = particles[j].vx * sin(angle) + particles[j].vy * cos(angle);

          var v1x = u1x * (m1 - m2) / (m1 + m2) + u2x * 2 * m2 / (m1 + m2);
          var v1y = u1y;
          var v2x = u2x * (m1 - m2) / (m1 + m2) + u1x * 2 * m2 / (m1 + m2);
          var v2y = u2y;

          var uf1x = v1x * cos(-angle) - v1y * sin(-angle);
          var uf1y = v1x * sin(-angle) + v1y * cos(-angle);

          var uf2x = v2x * cos(-angle) - v2y * sin(-angle);
          var uf2y = v2x * sin(-angle) + v2y * cos(-angle);

          particles[i].vx = uf1x;
          particles[i].vy = uf1y;

          particles[j].vx = uf2x;
          particles[j].vy = uf2y;
        }
      }
    }
  }
}
}

class Particle {
  constructor() {
    this.vx = int(random(-5, 5));
    this.vy = int(random(-5, 5));
    this.d = 45;
    this.x = random(this.d / 2, width - (this.d / 2));
    this.y = random(this.d / 2, height - (this.d / 2));

     this.c = color.value();
    this.mass = 1;
    if (particles.length != 0) {
    	for (var i = 0; i < particles.length; i++) {
    		if (dist(this.x, this.y, particles[i].x, particles[i].y) < this.d + 5) {
       	  this.x = random(this.d / 2, width - (this.d / 2));
    			this.y = random(this.d / 2, height - (this.d / 2));
          i = -1;
        }
      }


  }
}

  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x + this.d / 2 >= width) {
      this.vx = -this.vx;
      this.x = width - this.d / 2;
    } else if (this.x - this.d / 2 <= 0) {
      this.vx = -this.vx;
      this.x = this.d / 2;
    } else if (this.y + this.d / 2 >= height) {
      this.vy = -this.vy;
      this.y = height - this.d / 2;
    } else if (this.y - this.d / 2 <= 0) {
    	this.vy = -this.vy;
      this.y = this.d / 2;
    }

  }

  update() {
    strokeWeight(2);
    fill(51);
    stroke(this.c, 200, 255);
    ellipse(this.x, this.y, this.d, this.d);
  }
}
