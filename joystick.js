let joystick = {
  dx: 0,
  dy: 0,
  active: false
};

const joystickContainer = document.getElementById("joystick-container");
const joystickKnob = document.getElementById("joystick");

joystickContainer.addEventListener("touchstart", (e) => {
  joystick.active = true;
}, { passive: false });

joystickContainer.addEventListener("touchmove", (e) => {
  const rect = joystickContainer.getBoundingClientRect();
  const touch = e.touches[0];
  let x = touch.clientX - rect.left - 60;
  let y = touch.clientY - rect.top - 60;
  joystick.dx = Math.max(-1, Math.min(1, x / 60));
  joystick.dy = Math.max(-1, Math.min(1, y / 60));
  joystickKnob.style.transform = `translate(${joystick.dx * 30}px, ${joystick.dy * 30}px)`;
}, { passive: false });

joystickContainer.addEventListener("touchend", () => {
  joystick.dx = 0;
  joystick.dy = 0;
  joystickKnob.style.transform = `translate(0, 0)`;
});