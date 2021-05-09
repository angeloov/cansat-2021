let yaw, roll, pitch;

let yawSlider, rollSlider, pitchSlider;

function setup() {
  createCanvas(400, 400, WEBGL);

  createP("yaw roll pitch");
  yawSlider = createSlider(0, 360, 100, 0.5);
  rollSlider = createSlider(0, 360, 100, 0.5);
  pitchSlider = createSlider(0, 360, 100, 0.5);

  yaw = 0;
  roll = 0;
  pitch = 0;
}

function draw() {
  background(230);
  angleMode(DEGREES);

  yaw = yawSlider.value();
  roll = rollSlider.value();
  pitch = pitchSlider.value();

  rotateY(yaw);
  rotateZ(-roll);
  rotateX(-pitch);

  lights();
  fill(color(255, 204, 0));
  noStroke();
  cylinder(20, 50);
}
