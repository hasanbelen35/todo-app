import { create } from "zustand";
import { getAPI, postAPI, deleteAPI, updateAPI } from "@/lib/api";

const useTodoStore = create((set) => ({
  todos: [],
  loading: false,

  // Fetch todos from API
  fetchTodos: async () => {
    set({ loading: true });
    try {
      const data = await getAPI("/api/getTodos");
      set({ todos: data.data, loading: false });
    } catch (error) {
      console.error("Error fetching todos:", error);
      set({ loading: false });
    }
  },

  // Add a new todo
  addTodo: async (title,description) => {
    try {
      const addedTodo = await postAPI("/api/postNewTodo", { title,description });
      set((state) => ({ todos: [...state.todos, addedTodo.data] }));
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  },

  // Delete a todo
  deleteTodo: async (id) => {
    try {
      await deleteAPI("/api/deleteTodo", id);
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  },

  // Update a todo (Completed/Not Completed)
  updateTodo: async (id, completed) => {
    try {
      await updateAPI("/api/updateTodo", id, { completed: !completed });
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        ),
      }));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  },
}));

export default useTodoStore;
