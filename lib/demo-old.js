
//Create a c3mro(bases, className)

THREE.Demo = function() {

	var container, camera, scene, renderer, stats;
	var cameraControls;
	var clock = new THREE.Clock();

	function addToDOM() {
		container = document.getElementById('container');
		var canvas = container.getElementsByTagName('canvas');
		if (canvas.length>0) {
			container.removeChild(canvas[0]);
		}
		container.appendChild( renderer.domElement );
	}


	this.setupCamera = function(width, height) {
		camera = new THREE.PerspectiveCamera( 45, width / height, 1, 8000 );
		camera.position.set( 200, 550, 1300 );
	}

	this.setupLight = function(hex, intensity, pos) {
		var light = new THREE.DirectionalLight( hex, intensity );
		light.position = pos;
		scene.add(light);
	}

	this.setupRenderer = function(width, height, color) {
		renderer = new THREE.WebGLRenderer( {antialias: true} );
		renderer.setSize( width, height );
		renderer.setClearColor( color, 0);

		renderer.gammaInput = true;
		renderer.gammaOutput = true;

		renderer.sortObjects = true;
		renderer.context.depthFunc(renderer.context.LEQUAL);

		addToDOM();
	}


	this.addSphere = function() {
		var sphere = new THREE.Mesh(
			new THREE.SphereGeometry(210, 32, 16),
			new THREE.MeshPhongMaterial( {color: 0x004000, specular: 0x606060} )
			);

		sphere.position.set(0, 210, 0);
		scene.add( sphere );
	}

	this.addNode = function(node) {
		scene.add(node);
	}

	this.init = function() {

		var canvasWidth = window.innerWidth;
		var canvasHeight = window.innerHeight;

		scene = new THREE.Scene();
		scene.fog = new THREE.Fog(0xFFFFFF, 1000, 4000);

		this.setupCamera(canvasWidth, canvasHeight);
		this.setupLight(0xFFFFFF, 2.25, new THREE.Vector3(200, 400, 500));
		this.setupLight(0xFFFFFF, 1.5, new THREE.Vector3(-400, -200, 200));

		this.setupRenderer(canvasWidth, canvasHeight, scene.fog.color);

		//Controls
		cameraControls = new THREE.OrbitAndPanControls( camera, renderer.domElement );
		cameraControls.target.set( 0, 50, 0 );

	}


	this.render = function() {
		var delta = clock.getDelta();
		cameraControls.update( delta );
		renderer.render( scene, camera );
	}

	this.animate = function() {
		this.render();
	}

};