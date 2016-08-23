import Snap from 'snapsvg';
import Spiral from './spiral.js';
import math from 'mathjs';
const svg = Snap(1000, 1000);

let a = 40, b=0.15, rev=2, length=1000;
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
	console.log(param);

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
		fill: 'yellow'
	});
	spiral.transform('translate(500 500)');

	lines();
}



function lines() {
	let bbox = Snap.path.getBBox(spiral);
// alert(`y ${bbox.y + bbox.height}`);


	let rect = svg.rect(bbox.x, bbox.y, bbox.width, bbox.height);
	rect.attr({
		stroke:'#000',
		strokeWidth:2,
		fill: 'none'
	});
	console.log(`rect (${bbox.x}, ${bbox.y})`);

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



	let H = model.makeSpiralPoint(alpha + 3*math.pi);
	let V = model.makeSpiralPoint(alpha + (7/2)*math.pi);
	let V2 = model.makeSpiralPoint(alpha + (5/2)*math.pi);

	let O = svg.circle(bbox.x - H[0],
				bbox.y - V[1],
				5);
	O.attr({
		fill:'red'
	});
	let pH = svg.circle(H[0], H[1], 10);
	pH.attr({
		fill:'blue'
	});

	let pV = svg.circle(V[0], V[1], 10);
	pV.attr({
		fill:'green'
	});
	let pV2 = svg.circle(V2[0], V2[1], 10);
	pV.attr({
		fill:'green'
	});
	let group = svg.g(rect, xLine, line60, lineAlpha, pH, pV, pV2, O);
	group.transform('translate(500 500)');
}
