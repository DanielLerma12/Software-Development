import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export function useAISummary(jobId) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateSummary = async () => {
    setLoading(true);
    setError(null);
    setSummary("");

    console.log("prueba");

    try {
      const response = await fetch(`${API_URL}/ai/summary/${jobId}`);
      if (!response.ok) {
        throw new Error("Error fetching summary");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      const start = performance.now();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // cada chunk es un fragmento de texto
        const chunkText = decoder.decode(value, { stream: true });

        console.log(
          `Chunk recibido en ${Math.round(performance.now() - start)}ms:`,
          chunkText,
        );

        setSummary((prev) => prev + chunkText);
      }
    } catch {
      setError("Error al generar el resumen");
    } finally {
      setLoading(false);
    }
  };

  return {
    summary,
    loading,
    error,
    generateSummary,
  };
}
