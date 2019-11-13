import React, { useState } from 'react';
import '../../index.css';

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}
      className='todo'>
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>
          ✔️
        </button>
        <button onClick={() => removeTodo(index)}>
          ❌
        </button>
      </div>
    </div >
  )
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  };

  return (
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <button>➕</button>
        <input
          type='text'
          className='input'
          value={value}
          placeholder='Add Todo...'
          onChange={e => setValue(e.target.value)}
        />
      </form>
    </div>
  )
}

function App() {
  const [todos, setTodos] = useState([
    {
      text: 'Create a to do list',
      isCompleted: false
    },
    {
      text: 'Add styles to do list',
      isCompleted: false
    },
    {
      text: 'Add service workers',
      isCompleted: false
    },
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  }

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
    <div className='app'>
      <h1>To Do</h1>
      <div className='todo-list'>
        {todos.map((todo, index) => {
          return < Todo key={index} index={index} todo={todo} completeTodo={completeTodo} removeTodo={removeTodo} />
        })}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  )

}

export default App;