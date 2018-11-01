class Turtle {
  constructor(x, y, angle) {
    angleMode(DEGREES);
  }

  goForward(len) {
    if (this.visible) {
      stroke(255);
      line(0, 0, 0, -len);
    }
    translate(0, -len);
  }

  turnRight(angle) {
    rotate(angle);
  }

  pushUp() {
    this.visible = false;
  }

  pushDown() {
    this.visible = true;
  }

  save() {
    push();
  }

  loadPreviousState() {
    pop();
  }

  reset() {
    background(51);
    translate(width / 2, height / 2);
    this.visible = true;
  }
}
