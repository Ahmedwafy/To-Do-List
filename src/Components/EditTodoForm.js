import React, { useState } from "react";

function EditTodoForm({ editTodo, task }) {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(value, task.id);
  };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="Update Task..."
      />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
}

export default EditTodoForm;
