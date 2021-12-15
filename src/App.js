import { useState } from 'react'
import Header from "./components/Header";
import Tasks from "./components/Tasks";

const App = () => {
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

  return (
    <div className="container">
          <Header />
          <Tasks tasks={tasks}/>
    </div>
  );
}

export default App;