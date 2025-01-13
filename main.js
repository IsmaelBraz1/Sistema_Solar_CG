import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import starsTexture from '/img/stars.jpg';
import sunTexture from '/img/sun.jpg';
import mercuryTexture from '/img/mercury.jpg';
import venusTexture from '/img/venus.jpg';
import earthTexture from '/img/earth.jpg';
import marsTexture from '/img/mars.jpg';
import jupiterTexture from '/img/jupiter.jpg';
import saturnTexture from '/img/saturn.jpg';
import saturnRingTexture from '/img/saturn ring.png';
import uranusTexture from '/img/uranus.jpg';
import uranusRingTexture from '/img/uranus ring.png';
import neptuneTexture from '/img/neptune.jpg';
import plutoTexture from '/img/pluto.jpg';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
scene.background = new THREE.Color(0xffffff);
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );

document.body.appendChild( renderer.domElement );

camera.position.set(-90, 140, 140);

//controle por mouse
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
]);

const gridHelper = new THREE.GridHelper(300);
scene.add(gridHelper);

const solGeometry = new THREE.SphereGeometry(10,70,70);
const solMaterial = new THREE.MeshBasicMaterial({color: 0xffff00});
const sol = new THREE.Mesh(solGeometry, solMaterial);
scene.add(sol);

const criarPlaneta = (x, size) =>{
	const planetaGeometry = new THREE.SphereGeometry(size, 70, 70);
	const planetaMaterial = new THREE.MeshBasicMaterial({
		color: 0xff0000
	});
	const planeta = new THREE.Mesh(planetaGeometry, planetaMaterial)
	planeta.position.x = x;
	scene.add(planeta)
	return planeta;
}

criarPlaneta(30, 5)



let angle = 0; 
const radius = 70;
const planetas = [plt3, plt4];

function animate() {
	
	renderer.render( scene, camera );

}
renderer.setAnimationLoop( animate );