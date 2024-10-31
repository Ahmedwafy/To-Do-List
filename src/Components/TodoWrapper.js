import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import EditTodoForm from "./EditTodoForm";
import Todo from "./Todo";

function TodoWrapper() {
  const [todos, setTodos] = useState([]);

  // Add Todo ... todo = the value or data user submited
  // addTodo func will add this value to (todos array of objects) on submit
  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };

  // Delete Todo
  // If todo.id !== id, it keeps that todo in the new array.
  // If todo.id === id, it filters that todo out, effectively "deleting" it.
  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  // Toggle Complete Todo
  // Finds the todo with the matching id and toggles its completed status
  // creating a new object by copying all properties from the existing todo object
  // and then overwriting the completed property with its opposite value, which is [True]
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Edit Todo
  // creating a new object by copying all properties from the existing todo object
  // and then overwriting the isEditing property with its opposite value, which is [True]
  // Use Case :
  // When a user wants to start editing a todo item (e.g., clicking an edit button),
  // this function will be called to switch that item into editing mode.
  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  // Edit Task Todo
  // Use Case :
  // When a user submits the edited task in the EditTodoForm,
  // this function is called to update the todo’s text.
  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  // console.log("todos", todos)
  return (
    <div className="TodoWrapper">
      <h1>Web Development Tasks!</h1>
      <TodoForm addTodo={addTodo} />

      {/* Display Todos */}
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
}

export default TodoWrapper;
