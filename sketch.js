let doodler;
let platforms = [];
let platformCount = 6;
let gravity = 0.2;
let doodlerLeftImg, doodlerRightImg, platformImg, bgImg;

function preload() {
  // 加載圖像
  doodlerLeftImg = loadImage('doodler-left.png');
  doodlerRightImg = loadImage('doodler-right.png');
  platformImg = loadImage('platform.png');
  bgImg = loadImage('bg.png');
}

function setup() {
  createCanvas(400, 600);
  doodler = new Doodler();
  for (let i = 0; i < platformCount; i++) {
    platforms.push(new Platform(random(width), i * (height / platformCount)));
  }
}

function draw() {
  background(bgImg); // 使用自定義背景圖像
  doodler.update();
  doodler.show();

  for (let platform of platforms) {
    platform.update();
    platform.show();
  }
}

class Doodler {
  constructor() {
    this.x = width / 2;
    this.y = height - 100;
    this.width = 50;
    this.height = 50;
    this.velocity = 0;
    this.direction = 'left'; // 記錄角色的方向
  }

  show() {
    if (this.direction === 'left') {
      image(doodlerLeftImg, this.x, this.y, this.width, this.height);
    } else {
      image(doodlerRightImg, this.x, this.y, this.width, this.height);
    }
  }

  update() {
    this.velocity += gravity;
    this.y += this.velocity;

    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5;
      this.direction = 'left'; // 更新方向
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5;
      this.direction = 'right'; // 更新方向
    }

    for (let platform of platforms) {
      if (
        this.y + this.height >= platform.y &&
        this.y + this.height <= platform.y + platform.height &&
        this.x + this.width >= platform.x &&
        this.x <= platform.x + platform.width
      ) {
        this.velocity = -10;
      }
    }

    if (this.y > height) {
      this.y = height - this.height;
      this.velocity = 0;
    }
  }
}

class Platform {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 10;
  }

  show() {
    image(platformImg, this.x, this.y, this.width, this.height);
  }

  update() {
    this.y += 1;
    if (this.y > height) {
      this.y = 0;
      this.x = random(width);
    }
  }
}
