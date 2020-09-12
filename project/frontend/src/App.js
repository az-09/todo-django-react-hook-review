import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './TodoForm'
import TodoList from './TodoList'

function App() {
  const [todos, setTodos] = useState([])

  const initialActiveItemState = {
    id: null, title: '',
    completed: false,
  }

  const [activeItem, setActiveItem] = useState(initialActiveItemState)

  const [editing, setEditing] = useState(false)

  const getCookie= name => {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }

  const BASE_URL = 'http://127.0.0.1:8000/api'

  const HEADERS = {'Content-type': 'application/json',
                  'X-CSRFToken':  getCookie('csrftoken'),}

  const fetchTasks = () => {
    fetch(BASE_URL + '/task-list/')
    .then(response => response.json())
    .then(data => setTodos(data))
  }

  useEffect(() =>{
    fetchTasks()
  }, [])

  const handleSubmit = event => {
    event.preventDefault()

    var url = BASE_URL + '/task-create/'

    if (editing) {
      url = `${BASE_URL}/task-update/${activeItem.id}/`
      setEditing(false)
    }

    fetch(url, {
      method:'POST',
      headers: HEADERS,
      body: JSON.stringify(activeItem)
    }).then(() => {
      fetchTasks()
      setActiveItem(initialActiveItemState)
    }).catch(error => {
      console.log('ERROR:', error)
    })
  }

  const startEdit = task => {
    setActiveItem(task)
    setEditing(true)
  }

  const deleteItem = task => {
    var url = `${BASE_URL}/task-delete/${task.id}/`

    fetch(url, {
      method: 'DELETE',
      headers: HEADERS,
    }).then(() => {
      fetchTasks()
    })
  }

  const strikeUnstrike = task => {
    var url = `${BASE_URL}/task-update/${task.id}/`

    task.completed = !task.completed

    fetch(url, {
      method:'POST',
      headers:HEADERS,
      body: JSON.stringify({'title': task.title, 'completed': task.completed})
    }).then(() =>{
      fetchTasks()
    })
    console.log('TASK:', task.completed)
  }

  return (
    <div className="container">
        <div id="task-container">
          <div id="form-wrapper">
            <TodoForm handleSubmit={handleSubmit} activeItem={activeItem} setActiveItem={setActiveItem} />
          </div>
          <div id="list-wrapper">
            <TodoList todos={todos} strikeUnstrike={strikeUnstrike} startEdit={startEdit} deleteItem={deleteItem} />
          </div>
        </div>
    </div>
  );
}

export default App;
