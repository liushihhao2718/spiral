import test from 'ava';
import math from 'mathjs';

test('foo', t =>{
	t.pass();
});

test('bar', async t =>{
	const bar = Promise.resolve('bar');

	t.is(await bar, 'bar');
});

test('exp 90 test', t => {
	const pi = math.pi;


	if( !isNumberClose(math.exp(0), 1) ) t.fail();

	if( !isNumberClose(math.exp(pi), 23.1406926328) ) t.fail();

	if( !isNumberClose(math.exp(2*pi), 535.491655525) ) t.fail();

	t.pass();

	function isNumberClose(a, b){
		if(typeof a !== 'number' || typeof b !== 'number') return false;

		if (math.abs( a - b ) < 0.00001) {
			return true;
		}
		else return false;
	}
});

test('Q90 of spiral bezier curve', function(){
	let Q90 =  makeQ(pi).x;
	
	
});