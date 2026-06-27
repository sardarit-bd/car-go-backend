import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { xss } from "express-xss-sanitizer";
import path from "path"; 
import errorHandler from "./shared/errors/errorHandler";
import vehicleRoutes from "./modules/vehicle/vehicle.routes";
import packageRoutes from "./modules/packages/package.routes";    
const app: Application = express();

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }),
);

app.use(xss());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.0.105:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json({ limit: "10kb" }));
app.use(helmet());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.get("/", (req: Request, res: Response) => {
  res.send("right endpoint");
});

app.use("/api/vehicle", vehicleRoutes);
app.use("/packages", packageRoutes);
app.use(errorHandler);

export default app;
