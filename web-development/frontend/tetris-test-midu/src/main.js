import "./style.css";
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  BLOCK_SIZE,
  EVENT_MOVEMENTS,
} from "./consts";

// ============================================================================
// Configuración del canvas
// ============================================================================

// Escalamos el contexto con BLOCK_SIZE para poder dibujar en unidades de
// "celda" en lugar de píxeles: un cuadrado de 1x1 ocupa un bloque completo.
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = BLOCK_SIZE * BOARD_WIDTH;
canvas.height = BLOCK_SIZE * BOARD_HEIGHT;
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

const $score = document.querySelector("span");
const $section = document.querySelector("section");

// Efectos de sonido
const audio = new window.Audio("../assets/tetris.mp3");
const audio2 = new window.Audio("../assets/cleared.mp3");

// ============================================================================
// Estado del juego
// ============================================================================
let score = 0;
let dropCounter = 0;
let lastTime = 0;

// Tiempo (en ms) que pasa entre cada caída automática de la pieza
const DROP_INTERVAL = 500;

// El tablero es una matriz de celdas donde 0 = vacía y cualquier otro valor
// es el color de la pieza que quedó fijada en esa celda.
const board = createBoard(BOARD_WIDTH, BOARD_HEIGHT);

// Pieza actualmente en movimiento.
// - position: coordenada de la celda superior izquierda de la pieza
// - shape: matriz donde 1 = celda ocupada y 0 = vacía
// - color: color con el que se dibuja
const piece = {
  position: { x: 5, y: 5 },
  shape: [
    [1, 1],
    [1, 1],
  ],
  color: "yellow",
};

// ============================================================================
// Piezas (tetrominós)
// ============================================================================
const PIECES = [
  {
    color: "yellow",
    shape: [
      [1, 1],
      [1, 1],
    ],
  },
  {
    color: "green",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
  },
  {
    color: "red",
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
  },
  {
    color: "purple",
    shape: [
      [1, 1, 1],
      [0, 1, 0],
    ],
  },
  {
    color: "orange",
    shape: [
      [1, 1, 1],
      [1, 0, 0],
    ],
  },
  {
    color: "cyan",
    shape: [[1, 1, 1, 1]],
  },
  {
    color: "blue",
    shape: [
      [1, 1, 1],
      [0, 0, 1],
    ],
  },
];

// ============================================================================
// Lógica del tablero
// ============================================================================

// Crea un tablero de width x height celdas, todas vacías (0)
function createBoard(width, height) {
  return Array(height)
    .fill()
    .map(() => Array(width).fill(0));
}

// Devuelve true si alguna celda ocupada de la pieza coincide con una celda
// ocupada del tablero. El acceso con `?.` (optional chaining) hace que
// salirse por los bordes del tablero también cuente como colisión, porque
// `undefined !== 0` siempre se cumple.
function checkCollision() {
  return piece.shape.some((row, y) => {
    return row.some((value, x) => {
      return (
        value !== 0 && board[y + piece.position.y]?.[x + piece.position.x] !== 0
      );
    });
  });
}

// ============================================================================
// Movimiento y rotación de la pieza
// ============================================================================

// Intenta mover la pieza (dx, dy) celdas; si colisiona, deshace el movimiento
function movePiece(dx, dy) {
  piece.position.x += dx;
  piece.position.y += dy;

  if (checkCollision()) {
    piece.position.x -= dx;
    piece.position.y -= dy;
  }
}

// Baja la pieza una fila; si no puede bajar, la fija al tablero y elimina
// las líneas completas
function moveDown() {
  piece.position.y++;

  if (checkCollision()) {
    piece.position.y--;
    solidifyPiece();
    removeRows();
  }
}

// Rota la pieza 90° en sentido horario: cada columna de la forma original
// se convierte en una fila nueva (leída de abajo hacia arriba). Si la
// rotación genera una colisión, se deshace.
function rotatePiece() {
  const rotated = [];

  for (let i = 0; i < piece.shape[0].length; i++) {
    const row = [];

    for (let j = piece.shape.length - 1; j >= 0; j--) {
      row.push(piece.shape[j][i]);
    }
    rotated.push(row);
  }

  const previousShape = piece.shape;
  piece.shape = rotated;

  if (checkCollision()) {
    piece.shape = previousShape;
  }
}

// ============================================================================
// Fijar piezas y generar nuevas
// ============================================================================

// Copia las celdas de la pieza al tablero y coloca una nueva pieza
function solidifyPiece() {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        board[y + piece.position.y][x + piece.position.x] = piece.color;
      }
    });
  });

  resetPiece();
}

// Coloca una pieza aleatoria nueva en la parte superior del tablero
function resetPiece() {
  piece.position.x = Math.floor(BOARD_WIDTH / 2 - 2);
  piece.position.y = 0;

  const next = randomPiece();
  piece.shape = next.shape;
  piece.color = next.color;

  // Si la nueva pieza colisiona al instante, el tablero está lleno:
  // se limpia el tablero y se reinicia la partida
  if (checkCollision()) {
    board.forEach((row) => row.fill(0));
  }
}

// Devuelve una pieza aleatoria de la lista PIECES
function randomPiece() {
  return PIECES[Math.floor(Math.random() * PIECES.length)];
}

// ============================================================================
// Líneas completas
// ============================================================================

// Elimina las filas que están completamente llenas. Las filas superiores
// bajan una posición (se inserta una fila vacía arriba) y se suman puntos.
function removeRows() {
  const rowsToRemove = [];

  board.forEach((row, y) => {
    if (row.every((cell) => cell !== 0)) {
      rowsToRemove.push(y);
    }
  });

  rowsToRemove.forEach((y) => {
    board.splice(y, 1);
    board.unshift(new Array(BOARD_WIDTH).fill(0));

    score += 10;

    // Baja el volumen de la música para que destaque el sonido de línea
    audio2.volume = 0.8;
    audio2.play();
    audio.volume = 0.2;

    setTimeout(() => {
      audio.volume = 0.5;
    }, 1400);
  });
}

// ============================================================================
// Dibujado
// ============================================================================

// El tablero guarda los colores directamente, así que basta con pintar cada
// celda con su propio valor: no hace falta un mapa de colores por switch.
function draw() {
  // Fondo negro
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Celdas de las piezas ya fijadas en el tablero
  board.forEach((row, y) => {
    row.forEach((color, x) => {
      if (color !== 0) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
      }
    });
  });

  // Pieza en movimiento, desplazada según su posición en el tablero
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        ctx.fillStyle = piece.color;
        ctx.fillRect(piece.position.x + x, piece.position.y + y, 1, 1);
      }
    });
  });

  $score.innerText = score;
}

// ============================================================================
// Bucle principal
// ============================================================================

// Se ejecuta en cada frame con requestAnimationFrame. Se usa deltaTime para
// que la velocidad de caída sea constante aunque los FPS del monitor varíen:
// la pieza baja una fila cada DROP_INTERVAL milisegundos de tiempo real.
function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;
  dropCounter += deltaTime;

  if (dropCounter > DROP_INTERVAL) {
    dropCounter = 0;
    moveDown();
  }

  draw();
  window.requestAnimationFrame(update);
}

// ============================================================================
// Controles del teclado
// ============================================================================
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case EVENT_MOVEMENTS.LEFT:
      movePiece(-1, 0);
      break;

    case EVENT_MOVEMENTS.RIGHT:
      movePiece(1, 0);
      break;

    case EVENT_MOVEMENTS.DOWN:
      moveDown();
      break;

    case EVENT_MOVEMENTS.UP:
      rotatePiece();
      break;
  }
});

// ============================================================================
// Inicio de la partida
// ============================================================================

// El juego arranca al hacer clic en la pantalla de inicio
$section.addEventListener("click", () => {
  update();
  $section.remove();
  audio.volume = 0.5;
  audio.play();
});
