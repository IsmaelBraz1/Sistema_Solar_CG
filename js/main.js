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
import moonTexture from '/img/moon.jpg';
import plutoTexture from '/img/pluto.jpg';
import { color } from 'three/tsl';

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    3000
);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableDamping = true; 
orbit.dampingFactor = 0.05;

camera.position.set(-290, 190, 190);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
]);

const textureLoader = new THREE.TextureLoader();


const sunGeo = new THREE.SphereGeometry(60, 50, 50);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

const sunLight = new THREE.PointLight(0xffffff, 1, 500);
sunLight.position.set(0, 0, 0); // Posição do Sol no centro do sistema solar
scene.add(sunLight);




function createPlanete(size, texture, position,rotacao, translacao, anel) {
    //definição das propiedades basicas
    const geo = new THREE.SphereGeometry(size, 50, 50);
    const mat = new THREE.MeshBasicMaterial({
        map: textureLoader.load(texture)
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotacao = rotacao;
    mesh.translacao = translacao;
    mesh.position.x = position;

    //adiciona ao um objeto3D, que da a liberdade de translacao ao redor do centro
    const solarObj = new THREE.Object3D();
    solarObj.add(mesh);

    if (anel) {
        const anelGeo = new THREE.RingGeometry(
            anel.innerRadius,
            anel.outerRadius,
            32);
        const anelMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load(anel.texture),
            side: THREE.DoubleSide
        });
        const anelMesh = new THREE.Mesh(anelGeo, anelMat);
        solarObj.add(anelMesh);
        anelMesh.position.x = position;
        anelMesh.rotation.x = -0.5 * Math.PI;
    }
   
    scene.add(solarObj);

    //rentona o objeto em si, e o objeto3D onde ele esta inserido
    return { mesh, obj: solarObj }
}


//cria as luas
function criarLua(size,texture,position,rotacao, translacao, planeta, positionY) {
    const LuaPlanet = new THREE.Object3D();
    LuaPlanet.position.x = planeta.mesh.position.x;
   
    const luaGeo = new THREE.SphereGeometry(size, 30, 30)
    const luaMat = new THREE.MeshBasicMaterial({ map: textureLoader.load(texture) })
    const mesh = new THREE.Mesh(luaGeo, luaMat);
    mesh.position.x = position;
    mesh.rotacao = rotacao;
    mesh.translacao = translacao;
    if(positionY){
        mesh.position.y = positionY;
    }
   
    LuaPlanet.add(mesh)
    planeta.obj.add(LuaPlanet)
 
    return { mesh, obj: LuaPlanet}
}


const mercury = createPlanete(4, mercuryTexture, 100, 0.01, 0.02);
const venus = createPlanete(9.6, venusTexture, 160, 0.008, 0.004);
const earth = createPlanete(10, earthTexture, 220, 0.006, 0.007, false, {
    size: 2,
    position: 20
});
const mars = createPlanete(5.2, marsTexture, 360, 0.009, 0.01);
const jupiter = createPlanete(24, jupiterTexture, 420, 0.003, 0.003);
const saturn = createPlanete(26.8, saturnTexture, 540, 0.004, 0.004, {
    innerRadius: 24.8,
    outerRadius: 49.6,
    texture: saturnRingTexture
});
const uranus = createPlanete(23.2, uranusTexture, 630, 0.005, 0.007, {
    innerRadius: 26.9,
    outerRadius: 36,
    texture: uranusRingTexture
});
const neptune = createPlanete(21.6, neptuneTexture, 780, 0.004, 0.004);


const lua = criarLua(2.5, moonTexture,15, 0.03, 0.03,earth);
const io = criarLua(2.2, moonTexture, 30, 0.03, 0.05,jupiter, 3);
const europa = criarLua(2.1,moonTexture, 35, 0.03, 0.03,jupiter, -10);
const titan = criarLua(3,moonTexture, 55, 0.02, 0.02,saturn, 5);

const astros = [mercury, venus, mars, earth, jupiter, saturn, uranus, neptune,lua, io, europa,titan];

function movimento(object) {
    object.mesh.rotateY(object.mesh.rotacao)
    object.obj.rotateY(object.mesh.translacao);
}
function movimentototal() {
    for (var i = 0; i < astros.length; i++) {
        movimento(astros[i]);
    }
}
function animate() {
    
    sun.rotateY(0.004);
    
    movimentototal();
   
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});