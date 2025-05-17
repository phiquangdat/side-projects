import express from "express";
import { createTodo, read, removeTodo } from "../../controller/index.js";

const router = express.Router();

router.post("/todo/create", createTodo);
router.get("/todos", read);
router.delete("/todo/:id", removeTodo);

export default router;
