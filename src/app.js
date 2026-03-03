import cors from "cors";
import express from "express";
import morgan from "morgan";
import router from "./routes/index.js";
import notFound from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../swagger.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.status(200).json({ message: "API boutiques_TECH_221", swagger: "/api-docs" });
});

app.use("/api", router);
app.use(notFound);
app.use(errorHandler);

export default app;
