import React, { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  const addTask = () => {
    if (!input) return;
    if (editId) {
      setTasks(
        tasks.map((task) =>
          task.id === editId ? { ...task, text: input } : task
        )
      );
      setEditId(null);
    } else {
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    }
    setInput("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id) => {
    const editTask = tasks.find((task) => task.id === id);
    setInput(editTask.text);
    setEditId(id);
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={addTask}>
          <FontAwesomeIcon icon={editId ? faEdit : faPlus} />
        </button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <span onClick={() => toggleComplete(task.id)}>
              {task.text}
            </span>
            <div className="actions">
              <FontAwesomeIcon
                icon={faEdit}
                onClick={() => editTask(task.id)}
              />
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => deleteTask(task.id)}
              />
              <FontAwesomeIcon
                icon={faCheck}
                onClick={() => toggleComplete(task.id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;