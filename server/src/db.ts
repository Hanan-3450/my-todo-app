import fs from "fs/promises";
import path from "path";


export interface Todo {
    id: string;
    title: string;
    completed:boolean;
    createdAt: string;
}

const FILE = path.join(__dirname, "..", "data", "todos.json");

export async function readTodos(): Promise<Todo[]> {
    const raw = await  fs.readFile(FILE, "utf-8");
    return JSON.parse(raw) as Todo[];
}


export async function writeTodos(todos: Todo[]): Promise<void> {
    const pretty= JSON.stringify(todos, null, 2);
    await fs.writeFile(FILE, pretty);
}

