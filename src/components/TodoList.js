import React, { useState, useEffect } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch('http://localhost:5000/todos');
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (!newTodo) return;
    const res = await fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newTodo })
    });
    const newItem = await res.json();
    setTodos([...todos, newItem]);
    setNewTodo('');
  };

  const deleteTodo = async (id) => {
    const res = await fetch(`http://localhost:5000/todos/${id}`, {
      method: 'DELETE'
    });
    if (res.status === 204) {
      setTodos(todos.filter(t => t.id !== id));
    }
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = async (id) => {
    const res = await fetch(`http://localhost:5000/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: editText })
    });
    if (res.ok) {
      const updated = await res.json();
      setTodos(todos.map(t => (t.id === id ? updated : t)));
      setEditingId(null);
      setEditText('');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Todo List</h2>
      <div className="mb-3 d-flex">
        <input
          type="text"
          placeholder="New todo"
          className="form-control me-2"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addTodo}>Add</button>
      </div>
      <ul className="list-group">
        {todos.map(t => (
          <li key={t.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editingId === t.id ? (
              <>
                <input
                  className="form-control me-2"
                  name="editItem"
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                />
                <button className="btn btn-success btn-sm ms-2" onClick={() => saveEdit(t.id)}>Save</button>
              </>
            ) : (
              <>
                <span>{t.text}</span>
                <div>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => startEdit(t.id, t.text)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteTodo(t.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
