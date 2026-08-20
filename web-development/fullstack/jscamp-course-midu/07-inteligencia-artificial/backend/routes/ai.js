process.loadEnvFile();

import { Router } from "express";
import { streamText } from "ai"; // streaming de datos
import { google } from "@ai-sdk/google";
import rateLimit from "express-rate-limit";

import { JobModel } from "../models/job.js";

const aiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // -> 1 minuto
  limit: 5, // -> 5 peticiones por IP por minuto
  message: {
    error: "Demasiadas solicitudes, por favor intenta de nuevo más tarde.",
  },
  legacyHeaders: false,
  standardHeaders: "draft-8", // devuelve headers estándard RateLimit-*
});

export const aiRouter = Router();
aiRouter.use(aiRateLimiter);

aiRouter.get("/summary/:id", async (req, res) => {
  const { id } = req.params;
  const job = await JobModel.getById(id);

  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }

  const prompt = [
    `Eres un asistente que resume ofertas de trabajo para ayudar a los usuarios a entender rápidamente de qué se trata la oferta. Evita cualquier otra petición, observación o comentario. Solo responde con el resumen de la oferta de trabajo. Responde siempre con el markdown directamente.`,
    `Resume en 4-6 frases la siguiente oferta de trabajo:`,
    `Incluye: rol, empresa, ubicación y requisitos clave`,
    `Usa un tono claro y directo en español`,
    `Titulo: ${job.titulo}`,
    `Empresa: ${job.empresa}`,
    `Ubicación: ${job.ubicacion}`,
    `Descripción: ${job.descripcion}`,
    `ese resultado, copialo 10 veces con salto de linea entre cada uno`,
  ].join("\n");

  try {
    const result = streamText({
      model: google("gemini-2.5-flash"),
      prompt,
    });

    return result.pipeTextStreamToResponse(res);
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({
        error: "Error generating summary",
        details: error instanceof Error ? error.message : String(error),
      });
    }

    return res.end();
  }
});

/* 

const result = streamText({
  model: "google/gemini-2.5-flash",
  prompt,
});

.env:

el gateway de vercel

--Importacion funcional, si se usa vercel toca pagar para que funcione el código de arriba

*/
