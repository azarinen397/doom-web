const joystickContainer = document.getElementById('joystick-container');
const joystickElement = document.getElementById('joystick');

let dragging = false;
let originX, originY;

joystick = { dx: 0, dy: 0 };

joystickContainer.addEventListener('touchstart', (e) => {
  dragging = true;
  const touch = e.touches[0];
  originX = touch.clientX;
  originY = touch.clientY;
});

joystickContainer.addEventListener('touchmove', (e) => {
  if (!dragging) return;
  const touch = e.touches[0];
  const dx = touch.clientX - originX;
  const dy = touch.clientY - originY;
  const max = 40;

  const clampedX = Math.max(-max, Math.min(max, dx));
  const clampedY = Math.max(-max, Math.min(max, dy));

  joystick.dx = clampedX / max;
  joystick.dy = clampedY / max;

  joystickElement.style.transform = `translate(${clampedX}px, ${clampedY}px)`;
});

joystickContainer.addEventListener('touchend', () => {
  dragging = false;
  joystick.dx = 0;
  joystick.dy = 0;
  joystickElement.style.transform = `translate(0px, 0px)`;
});
