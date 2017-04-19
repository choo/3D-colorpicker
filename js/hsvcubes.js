/**
 * @module HSVConeCubes
 */

var HSVConeCubes;

(function() {

	/**
	 * @class
	 * @construtor
	 * @param {Number} n  unit number of cubes on a Circumference
	 * @param {Number} steps   
	 * @param {Number} radius  
	 * @param {Number} height  
	 * @param {Number} offset  
	 * @param {Number} size  The size of each cube (pixel)
	 */
	HSVConeCubes = function(n, steps, radius, height, offset, size) {
		this.n = n;
		this.steps  = steps;
		this.radius = radius;
		this.height = height;
		this.offset = offset;
		this.size = size;
	};

	/**
	 * calculate cube position and colors on HSV Color Cone
	 */
	HSVConeCubes.prototype.createCubes = function() {
		var objects = [];
		for (var i = 0; i <= this.steps; i++) {
			var value = i / this.steps * 100.0;
			for (var j = 0; j <= i; j++) {
				var saturation = j / this.steps * 100.0;
				var numCubes = Math.max(j * this.n, 1);
				for (var z = 0; z < numCubes; z++) {
					var degree = 360.0 / numCubes * z;
					var color = ColorUtils.hsv2rgb(degree, saturation, value);
					var position = _calcPosition(degree, saturation, value, this.radius, this.height, this.offset);
					objects.push({
						color : color,
						position : position
					});
				}
			}
		}
		return objects;
	};


	/******************************************
	 * private functions
	 ******************************************/

	/**
	 * @param {Number} degree
	 * @param {Number} saturation
	 * @param {Number} value
	 * @param {Number} height
	 * @param {Number} offset
	 * @returns {position} position ({x : x value, y : y value, z : z value)}
	 */
	var _calcPosition = function(degree, saturation, value, maxRadius, height, offset) {
		var radian = degree * Math.PI / 180.0;
		var radius = maxRadius * saturation / 100.0;
		return {
			x : Math.cos(radian) * radius,
			y : height * (value / 100.0) - offset,
			z : Math.sin(radian) * radius
		};
	};

})();

if (typeof module !== "undefined" && module.exports){
	module.exports = HSVConeCubes;
}
