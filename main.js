// main.js - Doom-style FPS for Web

let scene, camera, renderer; let walls = []; let raycaster;

function init() { scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); camera.position.set(1, 1.6, 1);

renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("game") }); renderer.setSize(window.innerWidth, window.innerHeight); renderer.setPixelRatio(window.devicePixelRatio);

// Floor const floor = new THREE.Mesh( new THREE.PlaneGeometry(100, 100), new THREE.MeshBasicMaterial({ color: 0x222222 }) ); floor.rotation.x = -Math.PI / 2; scene.add(floor);

// Doom-style walls (simple boxy layout) const wallMaterial = new THREE.MeshBasicMaterial({ color: 0x880000 }); const wallGeo = new THREE.BoxGeometry(1, 2, 0.2); const wallPositions = [ [2, 1, -1], [3, 1, -1], [4, 1, -1], [4, 1, 0], [4, 1, 1], [2, 1, 1], [3, 1, 1], [2, 1, 0] ];

for (let pos of wallPositions) { const wall = new THREE.Mesh(wallGeo, wallMaterial.clone()); wall.position.set(...pos); scene.add(wall); walls.push(wall); }

raycaster = new THREE.Raycaster(); window.addEventListener("touchstart", shoot); window.addEventListener("resize", onWindowResize); animate(); }

function shoot() { raycaster.setFromCamera({ x: 0, y: 0 }, camera); const hits = raycaster.intersectObjects(walls); if (hits.length > 0) { hits[0].object.material.color.set(0x00ff00); } }

function onWindowResize() { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); }

function animate() { requestAnimationFrame(animate); camera.translateZ(-joystick.dy * 0.05); camera.translateX(joystick.dx * 0.05); renderer.render(scene, camera); }

init();

