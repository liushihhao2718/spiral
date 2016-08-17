import Snap from 'snapsvg';
import Spiral from './spiral.js';
import math from 'mathjs';
const svg = Snap(1000, 1000);

let a = 40, b=0.15, rev=2, length=100;
let points;
let spiral;
let model;
go();

function go(){
	svg.clear();

	a = Number(document.getElementById('a').value);
	b = Number(document.getElementById('b').value);
	rev = Number(document.getElementById('rev').value);
	length = Number(document.getElementById('points').value);

	let param = {a, b, rev, length};
	model = new Spiral(param);

	points = model.makeSpiral();

	draw();
}

document.getElementById('a').onchange = go;
document.getElementById('b').onchange = go;
document.getElementById('rev').onchange = go;
document.getElementById('points').onchange = go;


function draw() {
	let d = `M${points[0]} ${points[1]} L`;

	for (var i = 2; i < 2*length; i++) {
		d += ' ' + points[i];
	}

	spiral = svg.path(d);
	spiral.attr({
		stroke:'#000',
		strokeWidth:2,
		fill: 'none'
	});
	spiral.transform('translate(500 500)');
}



let bbox = Snap.path.getBBox(spiral);
// alert(`y ${bbox.y + bbox.height}`);


let rect = svg.rect(bbox.x, bbox.y, bbox.width, bbox.height);
rect.attr({
	stroke:'#000',
	strokeWidth:2,
	fill: 'none'
});

let xLine = svg.line(0, 0, 500, 0);
xLine.attr({
	stroke:'#00f',
	strokeWidth:2,
	fill: 'none'
});

let line60 = svg.line(0, 0, 250, -433.012701593);
line60.attr({
	stroke:'#f00',
	strokeWidth:2,
	fill: 'none'
});

let alpha = math.atan(b);
let lineAlpha = svg.line(500*math.cos(math.pi/2 + alpha), 500*math.sin(math.pi/2 + alpha), 500*math.cos(math.pi/-2 + alpha), 500*math.sin(math.pi/-2 + alpha));
lineAlpha.attr({
	stroke:'#f00',
	strokeWidth:2,
	fill: 'none'
});



let p1 = model.makeSpiralPoint(math.pi/-2 + alpha + 2*math.pi);

let p = svg.circle(p1[0], p1[1], 10);
p.attr({
	fill:'blue'
});
// alert(p1);

let group = svg.g(rect, xLine, line60, lineAlpha, p);
group.transform('translate(500 500)');
