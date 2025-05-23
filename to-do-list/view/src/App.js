import React, { useState, useEffect } from 'react';
import './App.css';
import { getTodos, createTodo, removeTodo } from './util';

const App = () => {
  const [todo, setTodo] = useState({
    description: '',
  });
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState('');
  const fetchTodos = async () => {
    try {
      const res = await getTodos();
      if (res.error) {
        setError(res.error);
      } else {
        setTodoList(res.data || []);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch todos');
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await removeTodo(id);
      if (res.error) {
        setError(res.error);
      } else {
        fetchTodos();
      }
    } catch (err) {
      setError(err.message || 'Failed to delete todo');
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const data = new FormData(e.currentTarget);
    try {
      data.set('description', todo.description);
      data.set('created_at', `${new Date().toISOString()}`);
      const newTodo = await createTodo(data);
      if (newTodo.error) {
        setError(newTodo.error);
      } else {
        setTodo({ description: '' });
        fetchTodos();
      }
    } catch (err) {
      setError(err.message || 'Failed to create todo');
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <div className='App'>
      <h1>To-Do List</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type='text'
          value={todo.description}
          onChange={(event) => {
            setTodo({ ...todo, description: event.target.value });
          }}
        />
        <button type='submit'>Add Todo</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ol>
        {todoList?.map((todoItem) => (
          <li
            key={todoItem.todo_id}
            onClick={() => {
              handleDelete(todoItem.todo_id);
            }}
          >
            {todoItem.description}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default App;
