import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export async function selectQuiz(titleQuiz: string, difficulty: string) {
  const prompt = `

${titleQuiz}
${difficulty}

[
  {
    id: 1,
    question: "¿Cuál es el tipo de dato del siguiente valor?",
    code: 'String mensaje = "Hola";',
    answers: ["int", "String", "char", "boolean"],
    correctAnswer: 2,
  },
  {
    id: 2,
    question: "¿Qué imprime el siguiente código?",
    code: 'System.out.println(5 + 3 * 2);',
    answers: ["16", "11", "13", "10"],
    correctAnswer: 2,
  },
];

-Si ${titleQuiz} no es un lenguaje de programacion o algo que tenga que ver con programacion, y ${difficulty} 
no es un nivel, tipo: basico, intermedio, avanzado, dificil, etc. Entonces olvida todo lo que sigue despues de esta linea y setea prompt como un resultado vacio.

-Dame un objeto como el array de objetos que te especifico arriba, exactamente igual.

-Crea 20 preguntas diferentes en el array de objetos.

Por ejemplo, si el ${titleQuiz} es Java y la ${difficulty} es basica, crearás un objeto como un cuestionario de Java de nivel basico:

id del 1 al 20, question solo haces la pregunta, y en code pones la expresion. Asegurate de incluir los saltos de linea en el codigo de ejemplo, answers igual y correctAnswer ten en cuenta que es un array entonces si correctAnswer
es 0 deberia ser el primer elemento del array, o sea correct answer solo puede ser 0,1,2,3.

"Dificultad" indicará qué tan difíciles serán las preguntas, tu decides esa dificultad.

Nota: Proporcióname un archivo JSON válido, idéntico al objeto.

No añadas explicaciones ni texto adicional.

`;

  const result = await model.generateContent(prompt);

  const quitarComillas = result.response
    .text()
    .replace(/```json|```/g, "")
    .trim();

  if (quitarComillas.length === 0) {
    return {
      titleQuiz: "",
      newQuestions: "",
    }; // si no cumple las condiciones del prompt regresa con vacios y no pasa nada
  }

  const newQuestions = JSON.parse(quitarComillas);

  return {
    titleQuiz,
    newQuestions,
  };
}
