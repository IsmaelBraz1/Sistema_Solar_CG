import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,window.innerWidth/window.innerHeight,0.1,1000
);

const orbit = new OrbitControls(camera, renderer.domElement);


const axeHelper = new THREE.AxesHelper(5);
scene.add( axeHelper );

camera.position.set(0,20,0);

orbit.update();



const grid = new THREE.GridHelper(30);
scene.add(grid);





function criarast(raio, cor, posicaox, velocidade, orbita, object, vy){
    
const geoastro = new THREE.SphereGeometry(raio);
const matastro = new THREE.MeshStandardMaterial(
    cor
);
const astro = new THREE.Mesh(geoastro, matastro);
scene.add(astro);
astro.position.x = posicaox;
astro.position.y = 0;
astro.rotationSpeed = velocidade;
astro.orbitRadius = orbita;
astro.velocidade = vy;
astro.receiveShadow = true;
if(object != null){
    object.add(astro);
}

return astro;
}


function movimento(object){
    object.position.x = Math.cos(Date.now() * object.rotationSpeed) * object.orbitRadius * 1;
    object.position.z = Math.sin(Date.now() * object.rotationSpeed) * object.orbitRadius;
    object.rotation.y += object.velocidade;
    
}




function copia( object){
const objec = new THREE.Object3D();

scene.add(objec);

objec.position.x = object.position.x;
objec.position.y = object.position.y;
objec.position.z = object.position.z;
objec.rotationSpeed = object.rotationSpeed;
objec.orbitRadius = object.orbitRadius;
objec.velocidade = 0;
return objec;
}


const solGeometry = new THREE.SphereGeometry();
const solMaterial = new THREE.MeshBasicMaterial(
    {
        color: 0x0000FF
    }
);
const sol = new THREE.Mesh(solGeometry, solMaterial);
scene.add(sol);
const luz = new THREE.PointLight(0xFFFFFF, 300, 300);
sol.add(luz);
luz.castShadow = true;
const linhalu = new THREE.CameraHelper(luz.shadow.camera);
scene.add(linhalu);


const copsol = copia(sol);
const planeta1 = criarast(0.5, {color: 0xFF0000}, 5, 0.00003, 5, copsol, 0.3);
const coppla1 = copia(planeta1);
copsol.add(coppla1);
const lua1 = criarast(0.1, {color: 0xFF00FF}, 2, 0.002, 2, coppla1, 0.003);
const lua2 = criarast(0.2,{color: 0xDD00FF}, 3, 0.003, 3, coppla1, 0.003);
const lua3 = criarast(0.2, {color: 0xDD00FF}, 1, 0.0003, 1, coppla1, 0.003);
const planeta2 = criarast(0.5, {color: 0xFF0000}, 9, 0.003, 9, copsol, 0.3);


let astros = [planeta1, coppla1, lua1, lua2, lua3, planeta2];


function movimentototal(){
   
    for(var i = 0; i < astros.length; i++){
        movimento(astros[i]);
    }
}


function animate(){
movimentototal();


    renderer.render(
        scene, camera
    );

}

renderer.setAnimationLoop(animate);
