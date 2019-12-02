import React, { useState } from 'react';
import './index.css'

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}
      className='todo'>
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>
          <span role='img' aria-label='completed'>✔️</span>
        </button>
        <button onClick={() => removeTodo(index)}>
          <span role='img' aria-label='delete'>❌</span>
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
        <button><span role='img' aria-label='add'>➕</span></button>
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

  // Detects if device is on iOS 
  const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  }

  console.log(window.navigator.userAgent);

  // Detects if device is in standalone mode
  const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

  // Checks if should display install popup notification:



  return (
    <div className='app'>
      <h1>To Do</h1>
      <div className='todo-list'>
        {todos.map((todo, index) => {
          return < Todo key={index} index={index} todo={todo} completeTodo={completeTodo} removeTodo={removeTodo} />
        })}
        <TodoForm addTodo={addTodo} />
        {
          isIos() && !isInStandaloneMode()
            ? <div className="main-div">
              <p>For a better experience, open this page in Safari, press the Action menu at the bottom center and press 'Add to Home Screen'. Enjoy!</p>
            </div>
            : null
        }
      </div>
    </div>
  )
}



export default App;