export default class RectProto {
	//Position with x, y, rotate
	//size circle r
	constructor(entity, parent) {
		this._parent = parent;
		this.entity = entity;

		let circle = this._createCircle(),
			directLine = this._createLine(),
			pedicel = this._createPedicel();
		this._groupComponents( circle, directLine, pedicel);
	}

	updatePostion(cx, cy) {
		this.entity.position.x = cx;
		this.entity.position.y = cy;
	}

	_groupComponents(circle, directLine, pedicel ) {

		var flower = this._parent.group(circle, directLine, pedicel);
		this._drag(flower);
	}

	_drag(el) {
		const self = this;

		el.drag(move, start, stop);

		function move(dx,dy) {
			this.attr({
				'transform': this.data('origTransform') + (this.data('origTransform') ? 'T' : 't') + [dx, dy]
			});
		}

		function start() {
			this.data('origTransform', this.transform().local );
		}
		function stop() {
			let matrix = this.transform().localMatrix,		
				old_x = this.select('circle').attr().cx,
				old_y = this.select('circle').attr().cy,
				cx = matrix.x(old_x, old_y),
				cy = matrix.y(old_x, old_y);
			self.updatePostion(cx, cy);
		}
	}
}

function rotate (a, x, y) {
	return 'rotate('+a+','+x+','+y+')';
}