/**
 * @desc
 * ColorUtils module
 * @module ColorUtils
 */

var ColorUtils = {};

(function() {

	ColorUtils = {

		rgb2str : function(r, g, b) {
			return "#" + 
					_toHexStr(r) + 
					_toHexStr(g) + 
					_toHexStr(b);
		}

		,hsl2str : function(h, s, l) {
			return "hsl(" + 
					Math.round(360.0 * h) + ", " + 
					Math.round(100.0 * s) + "%, " + 
					Math.round(100.0 * l) + "%)";
		}

		/**
		 * @param {Number} h degree of Hue in HSV color model (0 - 359)
		 * @param {Number} s percentage of Saturation in HSV color model (0 - 100)
		 * @param {Number} v percentage of Value in HSV color model (0 - 100)
		 * @return {String} RGB HEX Value
		 */
		,hsv2rgb : function(h, s, v) {
			var r, g, b;
			var max = v;
			var min = v - s;
			if (h < 0 || h >= 360) {
				r = 0;
				g = 0;
				b = 0;
			} else if (h < 60) {
				r = max;
				g = min + (max - min) * h / 60;
				b = min;
			} else if (h < 120) {
				r = min + (max - min) * (120 - h) / 60;
				g = max;
				b = min;
			} else if (h < 180) {
				r = min;
				g = max;
				b = min + (max - min) * (h - 120) / 60;
			} else if (h < 240) {
				r = min;
				g = min + (max - min) * (240 - h) / 60;
				b = max;
			} else if (h < 300) {
				r = min + (max - min) * (h - 240) / 60;
				g = min;
				b = max;
			} else if (h < 360) {
				r = max;
				g = min;
				b = min + (max - min) * (360 - h) / 60;
			}
			r = _to8bitsInteger(r);
			g = _to8bitsInteger(g);
			b = _to8bitsInteger(b);
			return this.rgb2str(r, g, b);
		}
	};


	/******************************************
	 * private functions
	 ******************************************/
	var _toHexStr = function(n) {
		if (n < 16) {
			return "0" + n.toString(16);
		}
		return n.toString(16);
	};

	/**
	 * convert percentage value to 8bit digit (0-1.0 -> 0-255) 
	 * @param {Number} val
	 * @param {Number} n 
	 * @return rounded value
	 */
	var _to8bitsInteger = function(val) {
		return Math.floor(255 * val / 100.0);
	};

})();

if (typeof module !== "undefined" && module.exports){
	module.exports = ColorUtils;
}

