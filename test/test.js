import test from 'ava';
import math from 'mathjs';
import Spiral from '../src/spiral.js';

function isNumberClose(a, b){
	if(typeof a !== 'number' || typeof b !== 'number') return false;

	if (math.abs( a - b ) < 0.009) {
		return true;
	}
	else return false;
}


test('foo', t =>{
	t.pass();
});

test('exp 90 test', t => {
	const pi = math.pi;


	if( !isNumberClose(math.exp(0), 1) ) t.fail();

	if( !isNumberClose(math.exp(pi), 23.1406926328) ) t.fail();

	if( !isNumberClose(math.exp(2*pi), 535.491655525) ) t.fail();

	t.pass();	
});

test('make a Spiral', t =>{
	let param = {
		a:10,
		b:0.2,
		rev: 2,
		length: 100
	};

	const degToRad = 0.0174532925;
	let rad = 60 * degToRad;
	let spiral = new Spiral(param).makeSpiralPoint(rad);

	let x = spiral[0], y = spiral[1];
	
// google計算機 www.google.com.tw/webhp?#newwindow=1&q=10*exp(0.2*60*pi%2F180)*cos(60*pi%2F180)
	if (!isNumberClose(6.1649339489, x)) t.fail();
	if (!isNumberClose(10.6779788248, y)) t.fail();

	t.pass();
});