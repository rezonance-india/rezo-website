import * as THREE from "three"
import { gsap,Quart } from "gsap";

window.addEventListener('load', init, false);
function init() {
	createWorld();
	createPrimitive();
	animation();
	var tl = gsap.timeline();
	let firstDelay = 4250
	let secondDelay = 9500
	let thirdDelay = 16500
	setTimeout(() => {
		options.perlin.redhell = false;
	}, firstDelay);
	setTimeout(() => {
		options.perlin.redhell = true;
	}, secondDelay);

	tl.to(options.perlin, {
		size: 1.2,
		waves: 0.6,
		complex: 1.0,
		displace: 0.3,
		eqcolor: 30.0,
		rcolor: 1.2,
		gcolor: 0.1,
		bcolor: 1.0,
		ease: Quart.easeInOut
	}, firstDelay/1000)
	tl.to(options.perlin, {
		speed: 0.5,
		size: 1.0,
		waves: 20.0,
		complex: 0.1,
		displace: 0.1,
		eqcolor: 4.0,
		rcolor: 1.5,
		gcolor: 0.7,
		bcolor: 1.5,
		ease: Quart.easeInOut
	}, secondDelay/1000);
	tl.to(options.perlin, {
		speed: 0.4,
		size: 1.0,
		waves: 3.0,
		complex: 0.65,
		displace: 0.5,
		eqcolor: 9.5,
		rcolor: 1.5,
		gcolor: 1.5,
		bcolor: 1.5,
		points: true,
		ease: Quart.easeInOut
	}, thirdDelay/1000);
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
		speed: 0.4,
		size: 1.25,
		perlins: 1.0,
		decay: 1.20,
		displace: 0.5,
		complex: 0.65,
		waves: 3.0,
		eqcolor: 9.0,
		rcolor: 0.4,
		gcolor: 0.1,
		bcolor: 0.5,
		fragment: true,
		points: false,
		redhell: false
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
