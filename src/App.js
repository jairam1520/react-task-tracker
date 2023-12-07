import './App.css';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import Header from './components/Header';
import Tasks from './components/Tasks';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import About from './components/About';


function App() {
  const [showAddTask,setShowAddTask] = useState(false)
  const [tasks,setTasks]=useState([]) 

  useEffect(()=>{
    
    const getTasks = async () =>{
      const taskFromServer = await fetchTasks()
      setTasks(taskFromServer)
    }

    getTasks()
  },[])
  

  const fetchTasks = async () =>{
    const res = await fetch("http://localhost:5000/tasks")
    const data = await res.json();
    return data
  }
  const addTask = async (task)=>{
    // const id = Math.floor(Math.random()*10000)+1

    // const newTask = {id, ...task}
    // setTasks([...tasks,newTask])

    const res = await fetch(`http://localhost:5000/tasks/`,
    {
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(task)
    })

    const data = await res.json();
    setTasks([...tasks,data])


  }
  const deleteTask = async (id)=>{
    await fetch(`http://localhost:5000/tasks/${id}`,
    {
      method:'DELETE'
    }
    )
    setTasks(tasks.filter((task)=>(task.id!== id)))
  }

  const fetchTask = async (id) =>{
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json();
    return data
  }
  const toggleRemainder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const upTask = {...taskToToggle,reminder:!taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`,
    {
      method:'PUT',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(upTask)
    })
    const data = await res.json()

    setTasks(
      tasks.map((task)=> 
      task.id===id? {...task, reminder:
        data.reminder}:task
      )
    )
  }
 
  return (
    <BrowserRouter>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
        
        <Routes>
          <Route path='/' exact element={
            <>
              {showAddTask && <AddTask onAdd={addTask}/>}
              {tasks.length > 0 ? (
                <Tasks 
                  tasks = {tasks} 
                  onDelete={deleteTask} 
                  onToggle={toggleRemainder}
                  />
                  ) : 'No Tasks To Show'}
            </>
          } />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  
    
  );
}

export default App;
