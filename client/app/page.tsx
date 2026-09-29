"use client";

import { useEffect, useState } from "react";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;

};

const API = "http://localhost:4000";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");


  useEffect(() => {
    async function load() {
      try{
        const res = await fetch(`${API}/todos`);
        if(!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as Todo[];
        setTodos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message: " Unknown error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const title= newTitle.trim();
    if(!title) return;

    try{
      const res = await fetch(`${API}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ title}),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const created = (await res.json()) as Todo;
      setTodos((prev) => [...prev, created]);
      setNewTitle("");

    }catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  }

  if(loading) return <p className="p-8">Loading...</p>;
  if (error) return <p className="p-8 text-red-500">Error: {error}</p>;

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Todos</h1>
      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
  <input
    type="text"
    value={newTitle}
    onChange={(e) => setNewTitle(e.target.value)}
    placeholder="What needs to be done?"
    className="flex-1 border rounded px-3 py-2 bg-transparent"
  />
  <button
    type="submit"
    className="border rounded px-4 py-2 hover:bg-gray-800"
  >
    Add
  </button>
</form>
      {todos.length === 0 ? (
        <p className="text-gray-500">No todos yet.</p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="border rounded p-3 flex items-center gap-3"
            >
              <span className={todo.completed ? "line-through text-gray-400" : ""}>
                {todo.title}
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
