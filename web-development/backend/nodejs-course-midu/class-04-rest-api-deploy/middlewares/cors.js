import cors from "cors";

const ACCEPTED_ORIGINS = [
  "http://127.0.0.1:5500",
  "http://localhost:1234",
  "https://web-development-zvwi.onrender.com",
  "https://rest-api-deploy-front.onrender.com",
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (!origin || acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error("Not allowed by CORS"));
    },
  });
