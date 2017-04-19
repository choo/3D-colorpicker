/**
 * @module ThreeRenderer
 */

var ThreeRenderer = {};

(function() {

	ThreeRenderer.render = function(domId, objects, cubeSize, onMeshClicked) {

		// prepare settings
		var width  = $(domId).parent().width();
		var height = 400;
		var aspect = width / height;
		var fov    = 60;   // field of view
		var near   = 1;    // near clip
		var far    = 1000; // far clip

		// make scene
		var scene = new THREE.Scene();

		// add WebGLRenderer
		var renderer = new THREE.WebGLRenderer();
		renderer.setSize(width, height);

		// add camera
		var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
		camera.position.set(100, 80, 120);  // x, y, z

		// add OrbitControls
		var controls = new THREE.OrbitControls(camera, renderer.domElement);


		// add axes
		var axis = new THREE.AxisHelper(1000);
		scene.add(axis);

		// set background color
		renderer.setClearColor(0xeeeeee, 1.0);

		// add ambient light
		var ambient = new THREE.AmbientLight(0xffffff);
		scene.add(ambient);

		// add point light
		var light = new THREE.PointLight( 0xffffff, 1, 100 );
		light.position.x = 0;
		//light.position.y = 100;
		light.position.y = 0;
		scene.add( light );

		$(domId).append(renderer.domElement);

		// create mesh and add objectes
		var meshes = [];
		for (var i = 0, len = objects.length; i < len; i++) {
			var geometry = new THREE.CubeGeometry(cubeSize, cubeSize, cubeSize);
			var material = new THREE.MeshPhongMaterial({
				color: objects[i].color,
				opacity: 0.5
			});
			var mesh = new THREE.Mesh(geometry, material);
			mesh.position.set(
				objects[i].position.x,
				objects[i].position.y,
				objects[i].position.z
			);
			mesh.callback = onMeshClicked;
			meshes.push(mesh);
			scene.add(mesh);
		}

		// rendering
		var rendererRender = function() {
			renderer.render(scene, camera);
		};
		rendererRender();
		controls.addEventListener('change', rendererRender);

		// attach event defined below
		renderer.domElement.addEventListener('click', onObjClicked, false);


		// define click event
		var raycaster = new THREE.Raycaster();
		var mouse = new THREE.Vector2();

		function onObjClicked(e) {
			e.preventDefault();

			var target  = e.target; // or renderer.domElement
			var offsets = $(target).offset();
			var position = {
				 x : e.pageX - offsets.left
				,y : e.pageY - offsets.top
			};
			mouse.x =  (position.x / target.width)  * 2 - 1;
			mouse.y = -(position.y / target.height) * 2 + 1;

			raycaster.setFromCamera( mouse, camera );
			var intersects = raycaster.intersectObjects(meshes); 
			if (intersects.length > 0) {
				intersects[0].object.callback();
			}
		}
	};

})();

if (typeof module !== "undefined" && module.exports){
	module.exports = ThreeRenderer;
}
