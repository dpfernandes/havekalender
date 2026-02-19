import express from "express";
import cors    from "cors";
import path from "path";
import { cropsRouter } from "./routes/crops";

const app  = express();
const PORT = Number(process.env.PORT ?? 3001);

app.use(cors({ origin: process.env.FRONTEND_URL ?? "http://localhost:5173" }));
app.use(express.json());

app.use("/api/crops", cropsRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "havekalender-api", timestamp: new Date().toISOString() });
});

const frontendDistPath = path.join(__dirname, "../../frontend/dist");
app.use(express.static(frontendDistPath));

app.get("*", (_req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

const server = app.listen(PORT, () => {
  console.log(`🌱 HaveKalender API running on http://localhost:${PORT}`);
});

server.on("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use. Stop the other process or set a different PORT.`);
    process.exit(1);
  }
  throw err;
});

export default app;
