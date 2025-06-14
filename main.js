// main.js - Doom-style FPS for Web

let scene, camera, renderer, controls; let walls = []; let raycaster; let textureLoader = new THREE.TextureLoader();

function init() { scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); camera.position.set(1, 1.6, 1);

renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("game") }); renderer.setSize(window.innerWidth, window.innerHeight); renderer.setPixelRatio(window.devicePixelRatio);

// Add lighting const light = new THREE.HemisphereLight(0xffffff, 0x444444); light.position.set(0, 20, 0); scene.add(light);

// Floor with texture const floorTex = textureLoader.load('https://threejs.org/examples/textures/grasslight-big.jpg'); floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping; floorTex.repeat.set(25, 25); const floor = new THREE.Mesh( new THREE.PlaneGeometry(100, 100), new THREE.MeshStandardMaterial({ map: floorTex }) ); floor.rotation.x = -Math.PI / 2; scene.add(floor);

// Doom-style maze walls const wallTex = textureLoader.load('https://threejs.org/examples/textures/brick_diffuse.jpg'); const wallMaterial = new THREE.MeshStandardMaterial({ map: wallTex }); const wallGeo = new THREE.BoxGeometry(1, 2, 1); const wallLayout = [ [2, 1, -1], [3, 1, -1], [4, 1, -1], [4, 1, 0], [4, 1, 1], [2, 1, 1], [3, 1, 1], [2, 1, 0], [0, 1, 0], [1, 1, 0], [1, 1, 1], [0, 1, 2], [1, 1, 2], [2, 1, 2], [3, 1, 2], [4, 1, 2] ];

for (let pos of wallLayout) { const wall = new THREE.Mesh(wallGeo, wallMaterial.clone()); wall.position.set(...pos); scene.add(wall); walls.push(wall); }

// Gun overlay (2D sprite) const gunTex = textureLoader.load('https://i.imgur.com/2XnmnSg.png'); const gunMaterial = new THREE.SpriteMaterial({ map: gunTex, transparent: true }); const gun = new THREE.Sprite(gunMaterial); gun.scale.set(1, 0.5, 1); gun.position.set(0, -0.5, -1); camera.add(gun); scene.add(camera);

raycaster = new THREE.Raycaster(); window.addEventListener("touchstart", shoot); window.addEventListener("resize", onWindowResize); animate(); }

function shoot() { raycaster.setFromCamera({ x: 0, y: 0 }, camera); const hits = raycaster.intersectObjects(walls); if (hits.length > 0) { hits[0].object.material.color.set(0x00ff00); } }

function onWindowResize() { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); }

function animate() { requestAnimationFrame(animate); camera.translateZ(-joystick.dy * 0.05); camera.translateX(joystick.dx * 0.05); renderer.render(scene, camera); }

init();

