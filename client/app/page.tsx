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

  if(loading) return <p className="p-8">Loading...</p>;
  if (error) return <p className="p-8 text-red-500">Error: {error}</p>;

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Todos</h1>
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
