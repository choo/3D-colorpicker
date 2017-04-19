/**
 * @module RGBColorCubes
 */

var RGBColorCubes;

(function() {

	/**
	 * @class
	 * @construtor
	 * @param {Number} n  The number of cubes on a edge
	 * @param {Number} size  The size of each cube (pixel)
	 * @param {Number} interval  The interval length 
	 */
	RGBColorCubes = function(n, size, interval) {
		this.n = n;
		this.size = size;
		this.interval = interval;
		this.totalLength = size * n + interval * (n - 1);
		this.colorInterval = 256 / n;
	};


	/**
	 * calculate cube position and colors on HSV Color Cone
	 */
	RGBColorCubes.prototype.createCubes = function() {
		var objects = [];
		for (var i = 0; i < this.n; i++) {
			for (var j = 0; j < this.n; j++) {
				for (var k = 0; k < this.n; k++) {
					var color = _calcColor(i, j, k, this.colorInterval);
					var position = _calcPosition(
							i, j, k, this.size, this.interval,this.totalLength);
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
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} z
	 * @returns {String} color  rgb color code
	 */
	var _calcColor = function(x, y, z, colorInterval) {
		var color = ColorUtils.rgb2str(
			x * colorInterval,
			y * colorInterval,
			z * colorInterval
		);
		return color;
	};

	/**
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} z
	 * @returns {position} position ({x : x value, y : y value, z : z value)}
	 */
	var _calcPosition = function(x, y, z, size, interval, totalLength) {
		return {
			x : size * (x + 1) + interval * x - (totalLength / 2),
			y : size * (y + 1) + interval * y - (totalLength / 2),
			z : size * (z + 1) + interval * z - (totalLength / 2)
		};
	};

})();

if (typeof module !== "undefined" && module.exports){
	module.exports = RGBColorCubes;
}
