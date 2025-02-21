"use client";
import React, { useEffect, useState } from "react";
import useTodoStore from "@/store/todoStore";

const Todo = () => {
  const { todos, fetchTodos, addTodo, deleteTodo, updateTodo, loading } = useTodoStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    title.trim() && description.trim();
    await addTodo(title, description);
    setTitle("");
    setDescription("");
  };

  const deleteTodoHandler = async (id) => {
    await deleteTodo(id);
  };

  const updateTodoHandler = async (id, completed) => {
    await updateTodo(id, completed);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8"> Todo List</h1>

      <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Add a New Task</h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
          >
            Add Task
          </button>
        </div>
      </form>

      {/* Loading Indicator */}
      {loading ? (
        <p className="text-center text-gray-600 mt-4 animate-pulse">Loading tasks...</p>
      ) : (
        <ul className="space-y-4">
          {todos.length === 0 ? (
            <p className="text-center text-gray-500">No tasks added yet.</p>
          ) : (
            todos.map((todo) => (
              <li
                key={todo.id}
                className="bg-gray-50 p-5 rounded-xl shadow-md flex justify-between items-center transition hover:shadow-lg"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{todo.title}</h3>
                  <p className="text-gray-600 text-sm">{todo.description}</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => deleteTodoHandler(todo.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => updateTodoHandler(todo.id, todo.completed)}
                    className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                      todo.completed
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-yellow-500 hover:bg-yellow-600 text-white"
                    }`}
                  >
                    {todo.completed ? "Not Completed" : "Completed"}
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default Todo;
