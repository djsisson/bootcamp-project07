import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mountRoutes from "./routes/index.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mountRoutes(app);

app.listen(process.env.PORT, () => {
  console.log(`─=≡Σ((( つ◕ل͜◕)つ Server started on PORT: ${process.env.PORT} `);
});
