import Snap from 'snapsvg';
import math from 'mathjs';

const svg = Snap(1000, 1000);

let a = 10, b=0.1, rev = 10, length = 150;
let points;

go();

function go(){
	svg.clear();


	a = Number(document.getElementById('a').value);
	b = Number(document.getElementById('b').value);
	rev = Number(document.getElementById('rev').value);
	length = Number(document.getElementById('points').value);

	points = makeSpiral();

	draw();
}

document.getElementById('a').onchange = go;
document.getElementById('b').onchange = go;
document.getElementById('rev').onchange = go;
document.getElementById('points').onchange = go;

function makeSpiral() {
	const points = new Array(2*length);
	let degreeStep = rev*2*math.pi / length;
	let nextAngle = 0;

	for (var i = 0; i < length; i++) {
		nextAngle = degreeStep*i;

		let p = makeSpiralPoint(nextAngle);
		points[2*i] = p[0];
		points[2*i + 1] = p[1];

	}

	return points;
}

function makeSpiralPoint(angle){
	let r = a * math.exp(b * angle);
	let x = r * math.cos(angle),
		y = r * math.sin(angle);

	// return [x, y];
	return [Math.round(x*100)/100, Math.round(y*100)/100];
}

function draw() {
	let d = `M${points[0]} ${points[1]} L`;

	for (var i = 2; i <= 2*length; i++) {
		d += ' ' + points[i];
	}

	let spiral = svg.path(d);
	spiral.attr({
		stroke:'#000',
		strokeWidth:2,
		fill: 'none'
	});
	spiral.transform('translate(500 500)');
}
function makeSupportLine() {
	
	return [];
}