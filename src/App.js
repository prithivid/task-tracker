import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'
import { useState, useEffect } from 'react'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  const url = 'http://localhost:5200/tasks'
  useEffect(() => {
    const getTasks = async () => {
      setTasks(await fetchTasks())
    }
    getTasks()
  }, [])

  // Fetch Tasks from backend
  const fetchTasks = async () => {
    const res = await fetch(url)
    const data = await res.json()
    return data
  }
  // Fetch a task
  const fetchTask = async (id) => {
    const res = await fetch(`${url}/${id}`)
    const data = await res.json()
    return data
  }
  // Add Task
  const addTask = async (task) => {
    const res = await fetch(`${url}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()
    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // setTasks([...tasks, { ...task, id: id }])
  }
  // Delete tasks
  const deleteTask = async (id) => {
    await fetch(`${url}/${id}`, { method: 'DELETE' })
    setTasks(tasks.filter((task) => task.id !== id))
  }
  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    const res = await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(updTask),
    })
    const data = await res.json()
    setTasks(tasks.map((task) => (task.id === id ? data : task)))
  }

  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => {
            setShowAddTask(!showAddTask)
          }}
          showAddTask={showAddTask}
        />
        {showAddTask && <AddTask onAdd={addTask} />}
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                'No Tasks to Show'
              )}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  )
}

export default App
