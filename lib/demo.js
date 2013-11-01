
//Create a c3mro(bases, className)

THREE.Demo = function() {

	var container, scene, camera, renderer, controls, stats;
	var keyboard = new THREEx.KeyboardState();
	var clock = new THREE.Clock();

	var setupRenderer = function() {

		if (Detector.webgl)
			renderer = new THREE.WebGLRenderer( {antialias:true} );
		else
			renderer = new THREE.CanvasRenderer();

		var width = window.innerWidth;
		var height = window.innerHeight;
		renderer.setSize( width, height );

		container = document.createElement('div');
		document.body.appendChild(container);
		container.appendChild( renderer.domElement );
	}

	var setupCamera = function() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		
		var fov = 45;
		var apsect = width / height;
		var near = 0.1;
		var far = 20000;

		camera = new THREE.PerspectiveCamera( fov, apsect, near, far );
		camera.position.set( 100, 100, 300 );
		camera.lookAt(scene.position);

		scene.add(camera);
	}

	var setupLight = function(hex, intensity, pos) {
		var light = new THREE.DirectionalLight( hex, intensity );
		light.position = pos;
		scene.add(light);
	}

	var setupAxis = function() {
		var axes = new THREE.AxisHelper( 300 );
		scene.add( axes );
	}

	var setupEvent = function() {
		THREEx.WindowResize(renderer, camera);
		THREEx.FullScreen.bindKey( {charCode : 'm'.charCodeAt(0)} );

		controls = new THREE.OrbitControls( camera, renderer.domElement );
	}

	var render = function() {
		renderer.render( scene, camera );
	}

	var update = function() {
		var delta = clock.getDelta();
		controls.update(delta);
	}

	this.init = function() {

		scene = new THREE.Scene();

		setupCamera();
		setupRenderer();
		setupLight(0xFFFFFF, 2.25, new THREE.Vector3(200, 400, 500));
		setupEvent();
		setupAxis();
	}

	this.addNode = function(node) {
		scene.add(node);
	}

	this.animate = function() {
		requestAnimationFrame( this.animate.bind(this) );
		render();
		update();
	}

	this.init();
};