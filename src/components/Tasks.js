import React from 'react'
import Task from './Task'

const Tasks = ({tasks,onDelete,onToggle}) => {

  return (
    <>
        {tasks.map((task)=>(<Task onToggle={onToggle} onDelete={onDelete} key={task.id} task={task}></Task>))}
    </>
  )
}

export default Tasks