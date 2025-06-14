let scene, camera, renderer;
let raycaster;

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 1.6, 5);

  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("game") });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Add a simple floor
  let floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshBasicMaterial({ color: 0x333333 })
  );
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  // Add a red wall
  let wall = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 0.5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
  );
  wall.position.set(0, 1, -5);
  scene.add(wall);

  raycaster = new THREE.Raycaster();

  // Shoot on tap
  window.addEventListener("touchstart", shoot);

  // Resize handler
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  animate();
}

function shoot() {
  raycaster.setFromCamera({ x: 0, y: 0 }, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0) {
    intersects[0].object.material.color.set(0x00ff00); // turn green on hit
  }
}

function animate() {
  requestAnimationFrame(animate);

  camera.translateZ(-joystick.dy * 0.1);
  camera.translateX(joystick.dx * 0.1);

  renderer.render(scene, camera);
}

init();