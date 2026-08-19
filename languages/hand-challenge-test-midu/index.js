const MIN_CELL = 0;
const MAX_CELL = 255;

const clamp = (value) => {
  if (value > MAX_CELL) return MIN_CELL;
  if (value < MIN_CELL) return MAX_CELL;
  return value;
};

export function translate(string) {
  const memory = [0];

  let pointer = 0;
  let index = 0;
  let output = "";

  const arrayOfInstructions = Array.from(string);

  const actions = {
    "👉": () => {
      pointer++;

      if (memory[pointer] === undefined) {
        memory[pointer] = 0;
      }
    },

    "👈": () => {
      if (pointer > 0) {
        pointer--;
      }
    },

    "👆": () => {
      memory[pointer] = clamp(memory[pointer] + 1);
    },

    "👇": () => {
      memory[pointer] = clamp(memory[pointer] - 1);
    },

    "🤜": () => {
      if (memory[pointer] === 0) {
        index = arrayOfInstructions.indexOf("🤛", index);
      }
    },

    "🤛": () => {
      if (memory[pointer] !== 0) {
        index = arrayOfInstructions.lastIndexOf("🤜", index);
      }
    },

    "👊": () => {
      output += String.fromCharCode(memory[pointer]);
    },
  };

  while (index < arrayOfInstructions.length) {
    const action = arrayOfInstructions[index];

    if (actions[action]) {
      actions[action]();
    }

    index++;
  }

  return output;
}

console.log(
  translate(
    "👇🤜👇👇👇👇👇👇👇👉👆👈🤛👉👇👊👇🤜👇👉👆👆👆👆👆👈🤛👉👆👆👊👆👆👆👆👆👆👆👊👊👆👆👆👊",
  ),
);
