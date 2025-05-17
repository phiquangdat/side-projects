import express from "express";
import dotenv from "dotenv";
import todoRoutes from "./routes/todo.js";
import cors from "cors";

dotenv.config();

// Running express server
const app = express();
const port = process.env.PORT || 8000;

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// route middlewares
app.use("/api", todoRoutes);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at http://localhost:${port}`);
});
