Bird = function () {

	var scope = this;

	THREE.Geometry.call( this );

	v3(   5,   0,   0 );
	v3( - 5, - 2,   1 );
	v3( - 5,   0,   0 );
	v3( - 5, - 2, - 1 );

	v3(   0,   2, - 6 );
	v3(   0,   2,   6 );
	v3(   2,   0,   0 );
	v3( - 3,   0,   0 );

	f3( 0, 2, 1 );
	// f3( 0, 3, 2 );

	f3( 4, 7, 6 );
	f3( 5, 6, 7 );

	this.computeCentroids();
	this.computeFaceNormals();

	function v3( x, y, z ) {

		scope.vertices.push( new THREE.Vector3( x, y, z ) );

	}

	function f3( a, b, c ) {

		scope.faces.push( new THREE.Face3( a, b, c ) );

	}

}

Bird.prototype = Object.create( THREE.Geometry.prototype );