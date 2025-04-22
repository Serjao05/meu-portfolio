const canvas = document.getElementById('starfield');
const ctx    = canvas.getContext('2d');
let w, h, cx, cy;

function resize() {
  w = canvas.width  = window.innerWidth;
  h = canvas.height = window.innerHeight;
  cx = w/2; cy = h/2;
}
window.addEventListener('resize', resize);
resize();

let mouseX = cx, mouseY = cy;
window.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

const numStars = 800;
const stars = Array.from({length: numStars}, () => ({
  x: (Math.random()-0.5)*w*2,
  y: (Math.random()-0.5)*h*2,
  z: Math.random()*w
}));

function draw() {
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fillRect(0,0,w,h);
  ctx.fillStyle = '#fff';

  for (let s of stars) {
    s.z -= 2.0;
    if (s.z <= 0) {
      s.z = w;
      s.x = (Math.random()-0.4)*w*2;
      s.y = (Math.random()-0.4)*h*2;
    }
    const k = 500.0/s.z;
    const px = (s.x*k) + (mouseX-cx) + cx;
    const py = (s.y*k) + (mouseY-cy) + cy;
    const size = (1 - s.z/w)*2;

    if (px>=0 && px<=w && py>=0 && py<=h) {
      ctx.beginPath();
      ctx.arc(px,py,size,0,Math.PI*2);
      ctx.fill();
    }
  }

  requestAnimationFrame(draw);
}

draw();

