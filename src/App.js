import React, { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      // whole id+todo
      const editedTodo = todos.find((t) => t.id === editId);
      const updatedTodos = todos.map((t) =>
        t.id === editedTodo.id
          ? (t = { id: t.id, todo })
          : (t = { id: t.id, todo: t.todo })
      );
      setTodos(updatedTodos);
      setEditId(0);
      setTodo("");
      return;
    }
    if (todo !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo("");
    }
  };

  const handleDelete = (id) => {
    const newList = todos.filter((to) => to.id !== id);
    setTodos(newList);
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((x) => x.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };

  return (
    <div className="App">
      <div className="container">
        <TodoForm
          handleSubmit={handleSubmit}
          todo={todo}
          setTodo={setTodo}
          editId={editId}
        />

        <TodoList
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          todos={todos}
        />
      </div>
    </div>
  );
};

export default App;
