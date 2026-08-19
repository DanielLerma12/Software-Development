// ============================================
// DINO RUNNER - Juego del Dinosaurio de Google
// ============================================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("high-score");
const gameOverElement = document.getElementById("game-over");
const startScreen = document.getElementById("start-screen");

// ============================================
// CONFIGURACIÓN DEL JUEGO
// ============================================

const GRAVITY = 0.5;
const JUMP_FORCE = -13;
const GROUND_Y = 250;
const GAME_SPEED_INITIAL = 6;
const GAME_SPEED_INCREMENT = 0.001;

// ============================================
// ESTADO DEL JUEGO
// ============================================

let gameState = "start"; // 'start', 'playing', 'gameover'
let gameSpeed = GAME_SPEED_INITIAL;
let score = 0;
let highScore = 0;
let frameCount = 0;

// ============================================
// EXPLICACIÓN: Timer para controlar la distancia
// mínima entre obstáculos. En lugar de usar solo
// probabilidad random, contamos frames desde el
// último obstáculo y solo permitimos uno nuevo
// cuando ha pasado suficiente tiempo.
// ============================================
let framesSinceLastObstacle = 0;

// ============================================
// CLASE DEL DINOSAURIO
// Sprite pixelado estilo Chrome Dino
// ============================================

class Dino {
  constructor() {
    this.x = 50;
    this.y = GROUND_Y;
    this.width = 44;
    this.height = 48;
    this.velocityY = 0;
    this.isJumping = false;
    this.isDucking = false;
    this.animationFrame = 0;
    this.animationTimer = 0;
  }

  jump() {
    if (!this.isJumping) {
      this.velocityY = JUMP_FORCE;
      this.isJumping = true;
      this.isDucking = false;
    }
  }

  duck() {
    if (!this.isJumping) {
      this.isDucking = true;
    } else {
      this.isDucking = false;
    }
  }

  stopDucking() {
    this.isDucking = false;
  }

  update() {
    this.velocityY += GRAVITY;
    this.y += this.velocityY;

    if (this.y >= GROUND_Y) {
      this.y = GROUND_Y;
      this.velocityY = 0;
      this.isJumping = false;
    }

    this.animationTimer++;
    if (this.animationTimer > 8) {
      this.animationFrame = (this.animationFrame + 1) % 2;
      this.animationTimer = 0;
    }
  }

  // ============================================
  // EXPLICACIÓN: Dibujamos el dinosaurio pixel
  // a pixel usando un array de datos. Cada "1"
  // es un pixel oscuro, cada "0" es transparente.
  // Esto nos da un sprite fiel al dino de Chrome.
  // ============================================
  draw() {
    const px = 3; // tamaño de cada "pixel" del sprite

    if (this.isDucking) {
      // Dinosaurio agachado (más ancho, más bajo)
      const duckSprite = [
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
        [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      ];
      this.drawSprite(duckSprite, px, this.x, this.y - 30);
    } else {
      // Dinosaurio de pie
      const standSprite = [
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
        [0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
        [1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
      ];

      const runSpriteA = [
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
        [0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
        [1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
      ];

      const runSpriteB = [
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
        [0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
        [1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      ];

      const sprite = this.isJumping
        ? standSprite
        : this.animationFrame === 0
          ? runSpriteA
          : runSpriteB;
      this.drawSprite(sprite, px, this.x, this.y - 36);
    }
  }

  drawSprite(spriteData, pixelSize, startX, startY) {
    ctx.fillStyle = "#535353";
    for (let row = 0; row < spriteData.length; row++) {
      for (let col = 0; col < spriteData[row].length; col++) {
        if (spriteData[row][col] === 1) {
          ctx.fillRect(
            startX + col * pixelSize,
            startY + row * pixelSize,
            pixelSize,
            pixelSize,
          );
        }
      }
    }
  }

  getCollisionBox() {
    if (this.isDucking) {
      return {
        x: this.x + 3,
        y: this.y - 28,
        width: 39,
        height: 26,
      };
    }
    return {
      x: this.x + 6,
      y: this.y - 42,
      width: 30,
      height: 38,
    };
  }
}

// ============================================
// CLASE DE OBSTÁCULOS (CACTUS)
// ============================================

class Cactus {
  constructor() {
    this.x = canvas.width + 50;
    this.y = GROUND_Y;
    this.type = Math.floor(Math.random() * 3);
    // Anchuras y alturas según tipo para que las
    // colisiones sean justas
    if (this.type === 0) {
      this.width = 22;
      this.height = 48;
    } else if (this.type === 1) {
      this.width = 30;
      this.height = 40;
    } else {
      this.width = 18;
      this.height = 32;
    }
  }

  update() {
    this.x -= gameSpeed;
  }

  draw() {
    ctx.fillStyle = "#535353";

    if (this.type === 0) {
      // Cactus grande con brazos
      const sprite = [
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 0],
        [1, 0, 1, 1, 1, 0, 1, 0],
        [1, 0, 1, 1, 1, 0, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 0],
      ];
      this.drawCactusSprite(sprite, 3, this.x, this.y);
    } else if (this.type === 1) {
      // Cactus doble
      const sprite = [
        [1, 1, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 1, 1],
        [1, 1, 1, 0, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 0],
      ];
      this.drawCactusSprite(sprite, 3, this.x, this.y);
    } else {
      // Cactus pequeño
      const sprite = [
        [0, 0, 1, 1, 0, 0],
        [0, 1, 1, 1, 0, 0],
        [1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 0, 0],
        [1, 1, 1, 1, 1, 0],
      ];
      this.drawCactusSprite(sprite, 3, this.x, this.y);
    }
  }

  drawCactusSprite(spriteData, pixelSize, startX, startY) {
    ctx.fillStyle = "#535353";
    for (let row = 0; row < spriteData.length; row++) {
      for (let col = 0; col < spriteData[row].length; col++) {
        if (spriteData[row][col] === 1) {
          ctx.fillRect(
            startX + col * pixelSize,
            startY - (spriteData.length - row) * pixelSize,
            pixelSize,
            pixelSize,
          );
        }
      }
    }
  }

  getCollisionBox() {
    return {
      x: this.x + 3,
      y: this.y - this.height,
      width: this.width - 6,
      height: this.height - 4,
    };
  }
}

// ============================================
// CLASE DE PTERODACTILO (OBSTÁCULO VOLADOR)
// ============================================

class Pterodactyl {
  constructor() {
    this.x = canvas.width + 50;
    this.y = GROUND_Y - 55 - Math.random() * 30;
    this.width = 42;
    this.height = 28;
    this.wingUp = false;
    this.wingTimer = 0;
  }

  update() {
    this.x -= gameSpeed;

    this.wingTimer++;
    if (this.wingTimer > 12) {
      this.wingUp = !this.wingUp;
      this.wingTimer = 0;
    }
  }

  draw() {
    const px = 3;

    if (this.wingUp) {
      const wingUpSprite = [
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0],
      ];
      this.drawSprite(wingUpSprite, px, this.x, this.y);
    } else {
      const wingDownSprite = [
        [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      ];
      this.drawSprite(wingDownSprite, px, this.x, this.y);
    }
  }

  drawSprite(spriteData, pixelSize, startX, startY) {
    ctx.fillStyle = "#535353";
    for (let row = 0; row < spriteData.length; row++) {
      for (let col = 0; col < spriteData[row].length; col++) {
        if (spriteData[row][col] === 1) {
          ctx.fillRect(
            startX + col * pixelSize,
            startY + row * pixelSize,
            pixelSize,
            pixelSize,
          );
        }
      }
    }
  }

  getCollisionBox() {
    return {
      x: this.x + 6,
      y: this.y + 6,
      width: 36,
      height: this.height - 6,
    };
  }
}

// ============================================
// CLASE DE NUBE
// ============================================

class Cloud {
  constructor() {
    this.x = canvas.width + 50;
    this.y = 25 + Math.random() * 50;
  }

  update() {
    this.x -= gameSpeed * 0.3;
  }

  draw() {
    const px = 4;
    const sprite = [
      [0, 0, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    for (let row = 0; row < sprite.length; row++) {
      for (let col = 0; col < sprite[row].length; col++) {
        if (sprite[row][col] === 1) {
          ctx.fillRect(this.x + col * px, this.y + row * px, px, px);
        }
      }
    }
  }
}

// ============================================
// CLASE DEL SISTEMA DE PARTÍCULAS
// ============================================

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 5;
    this.vy = (Math.random() - 0.5) * 5;
    this.life = 1;
    this.decay = 0.02 + Math.random() * 0.03;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= this.decay;
  }

  draw() {
    ctx.fillStyle = `rgba(83, 83, 83, ${this.life})`;
    ctx.fillRect(this.x, this.y, 3, 3);
  }
}

// ============================================
// INSTANCIAS DEL JUEGO
// ============================================

let dino = new Dino();
let obstacles = [];
let clouds = [];
let particles = [];

for (let i = 0; i < 3; i++) {
  clouds.push(new Cloud());
}

// ============================================
// SISTEMA DE AUDIO (WEB AUDIO API)
// ============================================

// ============================================
// EXPLICACIÓN: Usamos un nodo de ganancia maestro
// (masterGain) como intermediario entre todos los
// sonidos y el altavoz. Para parar la música,
// basta con poner su ganancia a 0. Esto es mucho
// más fiable que intentar cancelar cada oscilador
// individualmente, porque los osciladores ya
// programados seguirían sonando de todas formas.
// ============================================

let audioContext = null;
let masterGain = null;
let musicPlaying = false;
let musicTimeoutId = null;
let gameOverSoundTimeoutId = null; // timeout del sonido de game over

function initAudio() {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  masterGain = audioContext.createGain();
  masterGain.connect(audioContext.destination);
}

function playNote(frequency, duration, startTime, type = "square") {
  if (!audioContext) return;

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(masterGain);

  oscillator.type = type;
  oscillator.frequency.value = frequency;

  gainNode.gain.setValueAtTime(0.08, startTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
}

function startMusic() {
  if (!audioContext || musicPlaying) return;

  // Cancelar cualquier timeout pendiente del game over
  if (gameOverSoundTimeoutId) {
    clearTimeout(gameOverSoundTimeoutId);
    gameOverSoundTimeoutId = null;
  }

  // Reactivar la ganancia por si estaba silenciada
  masterGain.gain.cancelScheduledValues(audioContext.currentTime);
  masterGain.gain.setValueAtTime(1, audioContext.currentTime);

  musicPlaying = true;

  const melody = [
    { note: 392, dur: 0.12 }, // G4
    { note: 440, dur: 0.12 }, // A4
    { note: 523, dur: 0.12 }, // C5
    { note: 440, dur: 0.12 }, // A4
    { note: 523, dur: 0.12 }, // C5
    { note: 587, dur: 0.24 }, // D5
    { note: 523, dur: 0.12 }, // C5
    { note: 440, dur: 0.12 }, // A4
    { note: 392, dur: 0.12 }, // G4
    { note: 440, dur: 0.12 }, // A4
    { note: 392, dur: 0.24 }, // G4
    { note: 0, dur: 0.12 }, // silencio
  ];

  function playMelodyLoop() {
    if (!musicPlaying) return;

    let time = audioContext.currentTime;
    const loopDuration = melody.reduce((sum, n) => sum + n.dur, 0);

    for (let repeat = 0; repeat < 3; repeat++) {
      melody.forEach(({ note, dur }) => {
        if (note > 0) {
          playNote(note, dur * 0.85, time);
        }
        time += dur;
      });
    }

    musicTimeoutId = setTimeout(playMelodyLoop, loopDuration * 3 * 1000);
  }

  playMelodyLoop();
}

function stopMusic() {
  musicPlaying = false;
  if (musicTimeoutId) {
    clearTimeout(musicTimeoutId);
    musicTimeoutId = null;
  }
  if (gameOverSoundTimeoutId) {
    clearTimeout(gameOverSoundTimeoutId);
    gameOverSoundTimeoutId = null;
  }
  // Silenciar TODO el audio inmediatamente
  if (masterGain) {
    masterGain.gain.cancelScheduledValues(audioContext.currentTime);
    masterGain.gain.setValueAtTime(0, audioContext.currentTime);
  }
}

function playJumpSound() {
  if (!audioContext) return;

  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.connect(gain);
  gain.connect(masterGain);
  osc.type = "sine";
  osc.frequency.setValueAtTime(250, audioContext.currentTime);
  osc.frequency.exponentialRampToValueAtTime(
    500,
    audioContext.currentTime + 0.1,
  );
  gain.gain.setValueAtTime(0.15, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
  osc.start();
  osc.stop(audioContext.currentTime + 0.1);
}

function playGameOverSound() {
  if (!audioContext) return;

  // Primero silenciar la música y reactivar
  // brevemente para el sonido de game over
  masterGain.gain.cancelScheduledValues(audioContext.currentTime);
  masterGain.gain.setValueAtTime(1, audioContext.currentTime);

  const notes = [400, 350, 300, 200];
  let time = audioContext.currentTime;

  notes.forEach((freq) => {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.connect(gain);
    gain.connect(masterGain);
    osc.type = "square";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.12, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.15);
    osc.start(time);
    osc.stop(time + 0.15);
    time += 0.18;
  });

  // Silenciar justo después del último tono
  gameOverSoundTimeoutId = setTimeout(() => {
    if (masterGain) {
      masterGain.gain.cancelScheduledValues(audioContext.currentTime);
      masterGain.gain.setValueAtTime(0, audioContext.currentTime);
    }
    gameOverSoundTimeoutId = null;
  }, 800);
}

// ============================================
// COLISIONES (AABB)
// ============================================

function checkCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

// ============================================
// SPAWN DE OBSTÁCULOS
// ============================================

// ============================================
// EXPLICACIÓN: En lugar de depender solo de
// Math.random() en cada frame (que puede encadenar
// spawns muy juntos), usamos un enfoque combinado:
//
// 1. Un CONTADOR DE FRAMES que se incrementa
//    cada frame y se resetea al spawnear.
// 2. Un MÍNIMO DE FRAMES obligatorio entre spawns
//    que aumenta con la velocidad del juego.
// 3. Una VELOCIDAD MÍNIMA aleatoria adicional
//    para que no sea predecible.
//
// Así nos aseguramos de que siempre haya una
// distancia mínima físicamente recorrible
// entre obstáculos.
// ============================================

function spawnObstacle() {
  framesSinceLastObstacle++;

  // Mínimo de frames entre obstáculos: a mayor
  // velocidad, menos frames necesarios porque
  // recorremos más distancia por frame, pero
  // siempre garantizamos al menos 70 frames (~1.2s)
  const minFramesBetween = Math.max(70, 120 - Math.floor(gameSpeed * 3));

  if (framesSinceLastObstacle < minFramesBetween) {
    return;
  }

  // Una vez superado el mínimo, tenemos un 2%
  // de probabilidad por frame de spawnear
  if (Math.random() > 0.02) {
    return;
  }

  // Spawnear
  framesSinceLastObstacle = 0;

  if (score > 150 && Math.random() < 0.3) {
    obstacles.push(new Pterodactyl());
  } else {
    obstacles.push(new Cactus());
  }
}

// ============================================
// FUNCIÓN DE FONDO: ATARDERCER
// ============================================

// ============================================
// EXPLICACIÓN: Dibujamos un gradiente vertical
// que simula un atardecer. Usamos createLinearGradient
// que mezcla colores desde arriba (cielo) hasta
// abajo (horizonte). El ciclo día/noche se basa
// en el score para que sea dinámico.
// ============================================

function drawSunsetBackground() {
  // Ciclo de tiempo: el score determina la fase
  // 0-400: día → 400-700: atardecer → 700-900: noche → 900+: amanecer
  const cycle = score % 1200;

  let topColor, midColor, bottomColor, sunY, sunAlpha;

  if (cycle < 400) {
    // Día: cielo azul claro
    topColor = "#87CEEB";
    midColor = "#B0E0E6";
    bottomColor = "#FFE4B5";
    sunY = 30;
    sunAlpha = 0.3;
  } else if (cycle < 700) {
    // Atardecer: naranjas y rosas
    const t = (cycle - 400) / 300; // 0 a 1
    topColor = lerpColor("#87CEEB", "#1a0a2e", t);
    midColor = lerpColor("#B0E0E6", "#c0392b", t);
    bottomColor = lerpColor("#FFE4B5", "#e67e22", t);
    sunY = 30 + t * 120;
    sunAlpha = 0.3 + t * 0.5;
  } else if (cycle < 900) {
    // Noche: oscuro
    const t = (cycle - 700) / 200;
    topColor = lerpColor("#1a0a2e", "#0d0d1a", t);
    midColor = lerpColor("#c0392b", "#1a1a3e", t);
    bottomColor = lerpColor("#e67e22", "#2c2c54", t);
    sunY = 250;
    sunAlpha = 0;
  } else {
    // Amanecer: vuelve al día
    const t = (cycle - 900) / 300;
    topColor = lerpColor("#0d0d1a", "#87CEEB", t);
    midColor = lerpColor("#1a1a3e", "#B0E0E6", t);
    bottomColor = lerpColor("#2c2c54", "#FFE4B5", t);
    sunY = 250 - t * 220;
    sunAlpha = t * 0.3;
  }

  // Degradado del cielo
  const gradient = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
  gradient.addColorStop(0, topColor);
  gradient.addColorStop(0.5, midColor);
  gradient.addColorStop(1, bottomColor);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, GROUND_Y + 2);

  // Sol / Luna — position x para que no se solape con el marcador
  const sunX = 730;
  if (sunAlpha > 0) {
    ctx.beginPath();
    ctx.arc(sunX, sunY, 25, 0, Math.PI * 2);

    if (cycle < 700) {
      ctx.fillStyle = `rgba(255, 200, 50, ${sunAlpha})`;
    } else {
      ctx.fillStyle = `rgba(200, 210, 255, ${sunAlpha})`;
    }
    ctx.fill();

    // Brillo del sol
    if (cycle < 700) {
      ctx.beginPath();
      ctx.arc(sunX, sunY, 35, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 200, 50, ${sunAlpha * 0.2})`;
      ctx.fill();
    }
  }

  // Estrellas de noche
  const isDark = cycle >= 700;
  if (isDark) {
    const starAlpha =
      cycle < 900
        ? Math.min(1, (cycle - 700) / 200)
        : Math.max(0, 1 - (cycle - 900) / 100);
    drawStars(starAlpha);
  }
}

let stars = [];
function initStars() {
  for (let i = 0; i < 30; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * 150 + 10,
      size: 1 + Math.random() * 2,
      twinkle: Math.random() * Math.PI * 2,
      speed: 0.02 + Math.random() * 0.03,
    });
  }
}
initStars();

function drawStars(alpha) {
  stars.forEach((star) => {
    star.twinkle += star.speed;
    const a = alpha * (0.3 + 0.7 * Math.abs(Math.sin(star.twinkle)));
    ctx.fillStyle = `rgba(255, 255, 230, ${a})`;
    ctx.fillRect(star.x, star.y, star.size, star.size);
  });
}

// ============================================
// UTILIDAD: interpolar entre dos colores hex
// ============================================

function lerpColor(a, b, t) {
  const ar = parseInt(a.slice(1, 3), 16);
  const ag = parseInt(a.slice(3, 5), 16);
  const ab = parseInt(a.slice(5, 7), 16);
  const br = parseInt(b.slice(1, 3), 16);
  const bg = parseInt(b.slice(3, 5), 16);
  const bb = parseInt(b.slice(5, 7), 16);
  const rr = Math.round(ar + (br - ar) * t);
  const rg = Math.round(ag + (bg - ag) * t);
  const rb = Math.round(ab + (bb - ab) * t);
  return `#${rr.toString(16).padStart(2, "0")}${rg.toString(16).padStart(2, "0")}${rb.toString(16).padStart(2, "0")}`;
}

// ============================================
// UPDATE
// ============================================

function formatScore(n) {
  return String(n).padStart(5, "0");
}

function update() {
  if (gameState !== "playing") return;

  frameCount++;
  gameSpeed = GAME_SPEED_INITIAL + frameCount * GAME_SPEED_INCREMENT;
  score = Math.floor(frameCount / 6);
  scoreElement.textContent = formatScore(score);

  dino.update();
  spawnObstacle();

  obstacles.forEach((obs) => obs.update());
  obstacles = obstacles.filter((obs) => obs.x > -80);

  clouds.forEach((cloud) => cloud.update());
  clouds = clouds.filter((cloud) => cloud.x > -100);
  if (Math.random() < 0.005) {
    clouds.push(new Cloud());
  }

  particles.forEach((p) => p.update());
  particles = particles.filter((p) => p.life > 0);

  // Colisiones
  const dinoBox = dino.getCollisionBox();
  for (let obs of obstacles) {
    if (checkCollision(dinoBox, obs.getCollisionBox())) {
      gameOver();
      break;
    }
  }
}

// ============================================
// DRAW
// ============================================

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Fondo atardecer
  drawSunsetBackground();

  // Nubes
  clouds.forEach((cloud) => cloud.draw());

  // Suelo
  const cycle = score % 1200;
  const isDark = cycle >= 700;
  ctx.fillStyle = isDark ? "rgba(255,255,255,0.7)" : "#535353";
  ctx.fillRect(0, GROUND_Y + 2, canvas.width, 2);

  // Líneas decorativas del suelo
  ctx.strokeStyle = isDark ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.3)";
  ctx.lineWidth = 1;
  for (let i = 0; i < canvas.width; i += 30) {
    ctx.beginPath();
    ctx.moveTo(i, GROUND_Y + 8);
    ctx.lineTo(i + 15, GROUND_Y + 8);
    ctx.stroke();
  }

  // Dinosaurio
  dino.draw();

  // Obstáculos
  obstacles.forEach((obs) => obs.draw());

  // Partículas
  particles.forEach((p) => p.draw());
}

function gameOver() {
  gameState = "gameover";
  gameOverElement.style.display = "block";
  playGameOverSound();
  stopMusic();

  for (let i = 0; i < 25; i++) {
    particles.push(new Particle(dino.x + 20, dino.y - 24));
  }

  if (score > highScore) {
    highScore = score;
    highScoreElement.textContent = `HI ${formatScore(highScore)}`;
  }
}

function resetGame() {
  dino = new Dino();
  obstacles = [];
  particles = [];
  score = 0;
  frameCount = 0;
  framesSinceLastObstacle = 0;
  gameSpeed = GAME_SPEED_INITIAL;
  gameState = "playing";
  gameOverElement.style.display = "none";
  startScreen.style.display = "none";
  scoreElement.textContent = "00000";
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// ============================================
// CONTROLES
// ============================================

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code === "ArrowUp") {
    e.preventDefault();

    if (gameState === "start") {
      initAudio();
      startMusic();
      resetGame();
    } else if (gameState === "playing") {
      dino.jump();
      playJumpSound();
    } else if (gameState === "gameover") {
      resetGame();
      startMusic();
    }
  }

  if (e.code === "ArrowDown" && gameState === "playing") {
    e.preventDefault();
    dino.duck();
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code === "ArrowDown") {
    dino.stopDucking();
  }
});

canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();

  if (gameState === "start") {
    initAudio();
    startMusic();
    resetGame();
  } else if (gameState === "playing") {
    dino.jump();
    playJumpSound();
  } else if (gameState === "gameover") {
    resetGame();
    startMusic();
  }
});

// ============================================
// INICIAR JUEGO
// ============================================

gameLoop();
