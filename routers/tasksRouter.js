import express from "express";
import { getTasks, createTask, getById, removeTask } from "./controllers/tasksController.js";

const router = express.Router();

router.get("/", getTasks);

router.post("/", createTask);

router.get("/:id", getById);

router.delete("/:id", removeTask);

export default router;
