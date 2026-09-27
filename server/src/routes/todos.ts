import { Router, Request, Response } from "express";
import crypto from "crypto";
import { readTodos, writeTodos, Todo } from "../db";
import { error } from "console";

const router = Router();

// List all todos
router.get("/", async (req: Request, res: Response) => {
    try{
        const todos = await readTodos();
        const { status } = req.query;

        let result = todos;
        if (status === "active") result = todos.filter((t) => !t.completed);
        if (status === "completed") result = todos.filter((t) => t.completed);

        res.json(result);
    } catch (err) {
        console.error("GET /todos failed:", err);
        res.status(500).json({error: "Failed to read todos"});
    }
});


// Create a todo
router.post("/", async (req: Request, res:Response) => {
    try {
        const {title } = req.body as { title?: unknown};

        if(typeof title !== "string" || title.trim() === "") {
            res.status(400).json({error: "Title is required"});
            return;
        }

        const todos = await readTodos();

        const newTodo: Todo = {
            id: crypto.randomUUID(),
            title: title.trim(),
            completed: false,
            createdAt: new Date().toISOString(),
        };

        todos.push(newTodo);
        await writeTodos(todos);

        res.status(201).json(newTodo);

        } catch (err) {
            console.error("POST /todos failed:", err);
            res.status(500).json({error: "Failed to create todo"});
        }
});

// Update title 
router.patch("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {title, completed } = req.body as {
            title?: unknown;
            completed?: unknown;
        };

        const todos = await readTodos();
        const index = todos.findIndex((t) => t.id === id);

        if (index === -1 ) {
            res.status(404).json({ error: "Todo not found"});
            return;
        }

        if (typeof title === "string" && title.trim() !== "") {
            todos[index].title = title.trim();
        }

        if (typeof completed === "boolean") {
            todos[index].completed = completed;
        }

        await writeTodos(todos);
        res.json(todos[index]);
    } catch (err) {
        console.error("PATCH /todos/:id failed:", err);
        res.status(500).json({error: "Failed to update todo"});
    }
});

// Remove a todo by id 
router.delete("/:id", async (req: Request, res: Response) => {
    try{
        const { id } = req.params;

        const todos = await readTodos();
        const index = todos.findIndex((t) => t.id == id);

        if (index === -1) {
            res.status(404).json({ error: "Todo not found"});
            return;
        }

        const [deleted] = todos.splice(index, 1);
        await writeTodos(todos);

        res.json(deleted);
    } catch (err) {
        console.error("DELETE /todos/:id failed:", err);
        res.status(500).json({error: "Failed to delete todo"});
    }
});

export default router;