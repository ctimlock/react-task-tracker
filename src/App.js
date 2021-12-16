import { useState } from 'react'
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

const App = () => {

  const [showAddTask, setShowAddTask] = useState (false)
  const [tasks, setTasks] = useState([
    {
        id: 1,
        text: 'Shoe shine',
        day: 'Dec 16th at 1:00pm',
        reminder: true,
    },
    {
        id: 2,
        text: 'Guitar work',
        day: 'Dec 17th at 1:30pm',
        reminder: false,
    },
    {
        id: 3,
        text: 'Dentist',
        day: 'Dec 20th at 11:00am',
        reminder: true,
    }
  ])

  // Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 100000) + 1
    const newTask = {id, ...task}
    setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))
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