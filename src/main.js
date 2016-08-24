import Snap from 'snapsvg';
import Spiral from './spiral.js';
import math from 'mathjs';
const svg = Snap(1000, 1000);

let a = 40, b=0.15, rev=2, length=1000;
let points;
let spiral;
let model;
// go();
rectAndSpiral();
function go(){
	svg.clear();

	// a = Number(document.getElementById('a').value);
	// b = Number(document.getElementById('b').value);
	// rev = Number(document.getElementById('rev').value);
	// length = Number(document.getElementById('points').value);

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
		fill: '#fff'
	});
	spiral.transform('translate(500 500)');
}




function caculateA(h) {

	let alpha = math.atan(b);
	return h * math.exp(-1*b * (5/2*math.pi + alpha)) / ((1 + math.exp(b * math.pi)) * math.cos(alpha));
}

function rectAndSpiral() {
	let rect = svg.rect(200, 200, 500, 250);
	rect.attr({
		stroke:'#000',
		strokeWidth:2,
		fill: '#fff'
	});
	const a = caculateA( Number(rect.attr().height) );
	let param = {a, b, rev, length};
	model = new Spiral(param);
	points = model.makeSpiral();
	draw();

	let alpha = math.atan(b);

	var x = model.makeSpiralPoint(alpha + 3 * math.pi);
	var y = model.makeSpiralPoint(alpha + 7 / 2 * math.pi);

	spiral.transform(`translate(${rect.attr().x - x[0]} ${rect.attr().y - y[1]})`);

	let tail = svg.path(`M${-1*x[0]} 0 Q${ Number(rect.attr().width *0.8)} ${Number(rect.attr().height) * -0.1} ${ Number(rect.attr().width)} ${Number(rect.attr().height)}`);
	tail.attr({
		stroke:'#000',
		strokeWidth:2,
		fill:'none'
	});
	tail.transform(`translate(${rect.attr().x} ${rect.attr().y})`);

	var group = svg.group(rect, spiral, tail);
	group.drag();
}