$(function($) {

	// configuration
	var cubeSize = 3;

	var cubeConfig = {
		n : 8,       // number of cubes on each side
		interval : 6 // interval value between cubes
	};

	var coneConfig = {
		radius : 50,
		height : 90,
		steps : 8,
		n : 6   // number unit of point in circle
	};
	coneConfig.offset = coneConfig.height / 3 * 2;

	var domID = {
		canvas : {
			rgb : "#rgb_container",
			hsv : "#hsv_container",
			hls : "#hls_container"
		},

		canvas_wrapper : "#canvas_wrapper",
		preview : "#color_preview_rgb",
		display : {
			rgb : "#rgb_color",
			hsl : "#hsl_color"
		}
	};


	// event handling
	$(".color_model_btn").on("click", function() {
		$(this).parent().children().removeClass('active');
		$(this).addClass("active");

		var model = $(this).find("input").val();
		$(domID.canvas_wrapper).children().hide();
		$(domID.canvas[model]).show();
	});

	var onMeshClicked = function() {
		var color = this.material.color;
		var rgb = color.getHexString();
		var hsl = color.getHSL();
		var hslStr = ColorUtils.hsl2str(hsl.h, hsl.s, hsl.l);
		$(domID.preview).css("background-color", "#" + rgb);
		$(domID.display.rgb).text("#" + rgb);
		$(domID.display.hsl).text(hslStr);
	};

	// main process
	var rgbCubes = new RGBColorCubes(cubeConfig.n, cubeSize, cubeConfig.interval);
	ThreeRenderer.render(
			domID.canvas.rgb, rgbCubes.createCubes(), cubeSize, onMeshClicked);

	// to render rgb cube fast, rendering cone will be executed after 1s
	window.setTimeout(function() {
		var hsvCubes = new HSVConeCubes(
			coneConfig.n,
			coneConfig.steps,
			coneConfig.radius,
			coneConfig.height,
			coneConfig.offset,
			cubeSize
		);
		ThreeRenderer.render(
				domID.canvas.hsv, hsvCubes.createCubes(), cubeSize, onMeshClicked);
	}, 1000);

});
