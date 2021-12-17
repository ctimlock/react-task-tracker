import { useState, useEffect } from 'react'
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

const App = () => {

  const [showAddTask, setShowAddTask] = useState (false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks from Server
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

    // Fetch Tasks from Server
    const fetchTask = async (id) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data = await res.json()
  
      return data
    }

  // Add Task
  const addTask = async (task) => {
    const response = await fetch(`http://localhost:5000/tasks/`, {
      method: 'POST', 
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await response.json()

    setTasks( [...tasks, data] )
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})

    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      'method': 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await response.json()

    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
    //console.log(id);
  }

  return (
    <div className="container">
          <Header onAdd = {() => setShowAddTask(!showAddTask)} showAdd = {showAddTask}/>
          {showAddTask && <AddTask onAdd = {addTask}/>}
          {tasks.length > 0 ? (
            <Tasks tasks = {tasks} onDelete = {deleteTask} onToggle = {toggleReminder}/>
          ) : (
            <p>No tasks left!</p>
          )}
    </div>
  );
}

export default App;