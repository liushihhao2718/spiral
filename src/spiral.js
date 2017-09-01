import math from 'mathjs';

export default class Spiral {
	constructor(param) {
		/*
		等角螺線
		https://en.wikipedia.org/wiki/Logarithmic_spiral
		f(angle) = a * exp(b * angle)
		a : number 間距
		b : number 角度
		rev : number 轉幾圈
		length : number 是螺旋線上的總點數，越多越滑順
		*/
		this.param = param;
	}

	makeSpiral() {
		const points = [];

		let degreeStep = this.param.rev*2*math.pi / (this.param.length-1);
		let nextAngle = 0;

		for (var i = 0; i < this.param.length; i++) {
			nextAngle = degreeStep*i;

			let p = this.makeSpiralPoint(nextAngle);

			points.push(p[0]);
			points.push(p[1]);
		}

		return points;
	}

	makeSpiralPoint(angle){
		let r = this.param.a * math.exp(this.param.b * angle);
		let x = r * math.cos(angle),
			y = r * math.sin(angle);

		// return [x, y];
		return [Math.round(x*100)/100, Math.round(y*100)/100];
	}
}