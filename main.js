// main.js - Doom-style FPS Clone Starter

let scene, camera, renderer, raycaster;
let walls = [], joystick = { dx: 0, dy: 0 };

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(1, 1.6, 1);

  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("game") });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  const light = new THREE.HemisphereLight(0xffffff, 0x222222);
  scene.add(light);

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshStandardMaterial({ color: 0x444444 })
  );
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  const wallGeo = new THREE.BoxGeometry(1, 2, 1);
  const wallMat = new THREE.MeshStandardMaterial({ color: 0x770000 });
  const layout = [
    [2, 1, -1], [3, 1, -1], [4, 1, -1], [4, 1, 0],
    [4, 1, 1], [3, 1, 1], [2, 1, 1], [2, 1, 0]
  ];
  layout.forEach(([x, y, z]) => {
    const w = new THREE.Mesh(wallGeo, wallMat.clone());
    w.position.set(x, y, z);
    scene.add(w);
    walls.push(w);
  });

  raycaster = new THREE.Raycaster();
  window.addEventListener("touchstart", shoot);
  window.addEventListener("resize", resize);
  resize();
  animate();
}

function shoot() {
  raycaster.setFromCamera({ x: 0, y: 0 }, camera);
  const hit = raycaster.intersectObjects(walls);
  if (hit[0]) hit[0].object.material.color.set(0x00ff00);
}

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  camera.translateZ(-joystick.dy * 0.05);
  camera.translateX(joystick.dx * 0.05);
  renderer.render(scene, camera);
}

init();
