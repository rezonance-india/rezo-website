import * as THREE from "three"
import { gsap, Quart } from "gsap";

window.addEventListener('load', init, false);
function init() {
	createWorld();
	createPrimitive();
	animation();
}

var Theme = {
	primary: 0xFFFFFF,
	secondary: 0x292733,
	danger: 0xFF0000,
	darker: 0x000000
};

//--------------------------------------------------------------------
var scene, camera, renderer, container;
var _width, _height;
var _primitive;
var shapeGroup = new THREE.Group();
var start = Date.now();
var mat;

function createWorld() {
	_width = window.innerWidth;
	_height = window.innerHeight;
	//---
	scene = new THREE.Scene();
	scene.background = new THREE.Color(Theme.secondary);
	//---
	camera = new THREE.PerspectiveCamera(35, _width / _height, 1, 1000);
	camera.position.set(0, 0, 16);
	//---
	renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
	renderer.setSize(_width, _height);
	renderer.shadowMap.enabled = true;
	//---
	document.body.appendChild(renderer.domElement);
	//---
	window.addEventListener('resize', onWindowResize, false);
}
function onWindowResize() {
	_width = window.innerWidth;
	_height = window.innerHeight;
	renderer.setSize(_width, _height);
	camera.aspect = _width / _height;
	camera.updateProjectionMatrix();
	console.log('- resize -');
}
//--------------------------------------------------------------------
var primitiveElement = function () {
	this.mesh = new THREE.Object3D();
	mat = new THREE.ShaderMaterial({
		side: THREE.DoubleSide,
		uniforms: {
			time: {
				type: "f",
				value: 0.1
			},
			pointscale: {
				type: "f",
				value: 0.2
			},
			decay: {
				type: "f",
				value: 0.3
			},
			size: {
				type: "f",
				value: 0.3
			},
			displace: {
				type: "f",
				value: 0.3
			},
			complex: {
				type: "f",
				value: 0.0
			},
			waves: {
				type: "f",
				value: 0.10
			},
			eqcolor: {
				type: "f",
				value: 0.0
			},
			rcolor: {
				type: "f",
				value: 0.0
			},
			gcolor: {
				type: "f",
				value: 0.0
			},
			bcolor: {
				type: "f",
				value: 0.0
			},
			fragment: {
				type: "i",
				value: true
			},
			redhell: {
				type: "i",
				value: true
			}
		},
		vertexShader: document.getElementById('vertexShader').textContent,
		fragmentShader: document.getElementById('fragmentShader').textContent
	});
	//---
	var wir_mat = new THREE.MeshBasicMaterial({ color: Theme.darker });
	var geo = new THREE.IcosahedronBufferGeometry(2, 24);
	var wir = new THREE.IcosahedronBufferGeometry(2.3, 4);
	this.shape = new THREE.Mesh(geo, mat);
	this.point = new THREE.Points(wir, mat);
	//---
	shapeGroup.add(this.point);
	shapeGroup.add(this.shape);

	scene.add(shapeGroup);
}
function createPrimitive() {
	_primitive = new primitiveElement();
}

var options = {
	perlin: {
		speed: 0.5,
		size: 1.3,
		perlins: 1.0,
		decay: 1.20,
		displace: 0.7,
		complex: 0.8,
		waves: 11.0,
		eqcolor: 8.0,
		rcolor: 0.0,
		gcolor: 1.4,
		bcolor: 2.5,
		fragment: true,
		points: true,
		redhell: true
	},
}

//--------------------------------------------------------------------
function animation() {
	var performance = Date.now() * 0.003;
	//---
	//_primitive.shape.visible = !options.perlin.points;
	_primitive.point.visible = options.perlin.points;
	//---
	mat.uniforms['time'].value = (options.perlin.speed / 1000) * (Date.now() - start);

	mat.uniforms['pointscale'].value = options.perlin.perlins;
	mat.uniforms['decay'].value = options.perlin.decay;
	mat.uniforms['size'].value = options.perlin.size;
	mat.uniforms['displace'].value = options.perlin.displace;
	mat.uniforms['complex'].value = options.perlin.complex;
	mat.uniforms['waves'].value = options.perlin.waves;
	mat.uniforms['fragment'].value = options.perlin.fragment;

	mat.uniforms['redhell'].value = options.perlin.redhell;
	mat.uniforms['eqcolor'].value = options.perlin.eqcolor;
	mat.uniforms['rcolor'].value = options.perlin.rcolor;
	mat.uniforms['gcolor'].value = options.perlin.gcolor;
	mat.uniforms['bcolor'].value = options.perlin.bcolor;
	//---
	requestAnimationFrame(animation);
	renderer.render(scene, camera);
}
