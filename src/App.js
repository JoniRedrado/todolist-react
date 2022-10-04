import './App.css';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleCheck, faPen, faTasks, faTrashCan
} from '@fortawesome/free-solid-svg-icons'


function App() {

  //Tasks (toDoList) State
  
  const [toDo, setToDo] = useState([
    {id:1, "title": "Task 1", status:false},
    {id:2, "title": "Task 2", status:false}
  ])

  //Temp State
  const [ newTask, setNewTask ] = useState('');
  const [ updateData, setUpdateData ] = useState('');

  //Add Task
  const addTask = () => {
    if(newTask) {
      let num = toDo.length +1;
      let newEntry = { id: num, title: newTask, status: false }
      setToDo([...toDo, newEntry])
      setNewTask('')
    }
  }

  //Delete Task
  const deleteTask = (id) => {
    let newTasks = toDo.filter( task => task.id !== id)
    setToDo(newTasks)
  }

  //Mark Task as Done
  const markDone = (id) => {
    let newTask = toDo.map( task => {
      if( task.id === id ) {
        return ({...task, status: !task.status})
      }
      return task
    } )
    setToDo(newTask)
  }

  //Cancel Update
  const cancelUpdate = () => {
    setUpdateData('')
  }

  //Change Task for Update
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    }
    setUpdateData(newEntry);
  }

  //Update Task
  const updateTask = () => {
    let filterRecords = [...toDo].filter( task => task.id !== updateData.id );
    let updatedObject = [...filterRecords, updateData]
    setToDo(updatedObject);
    setUpdateData('');
  }




  return (
    <div className="container App">

      <br /><br />
      <h2>To Do List App (ReactJS)</h2>
      <br /><br />

      
      {
        updateData && updateData ? (
          /* Update Task */
          <>
            <div className='row'>
        
              <div className='col'>

                <input 
                  className='form-control form-control-lg'
                  value={ updateData && updateData.title }
                  onChange={ (e) => changeTask(e) }
                />
              
              </div>
              
              <div className='col-auto'>
                <button 
                  className='btn btn-lg btn-success mr-20'
                  onClick={ updateTask }
                  >Update</button>
                <button 
                  className='btn btn-lg btn-warning'
                  onClick={ cancelUpdate }
                  >Cancel</button>
              </div>

            </div>
            <br />
          </>
        ) : (
          /* Add Task */
          <>
            <div className='row'>
        
              <div className='col'>
                <input 
                  value={newTask}
                  onChange={ (e) => setNewTask(e.target.value) }
                  className='form-control form-control-lg'/>
              </div>
              
              <div className='col-auto'>
                <button 
                  onClick={addTask}
                  className='btn btn-lg btn-success'
                >Add Task</button>
              </div>

            </div>
            <br />
          </>
        )
      }


      


      
      
      


      {/*Display ToDos*/}
      {toDo && toDo.length ? '' : 'No Tasks...'}

      {toDo && toDo

        .sort((a, b) => a.id > b.id ? 1 : -1)
        .map( (task, index) => {
          return(
            <React.Fragment key={task.id}>
              <div className='col taskBg'>
                
                <div className={task.status ? 'done' : ''}>
                  
                  <span className='taskNumber'>{index + 1}</span>
                  <span className='taskText'>{task.title}</span>

                </div>
                <div className='iconsWrap'>
                  
                  <span title="Completed / Not Completed"
                    onClick={ (e) => markDone(task.id)}>
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </span>
                  
                  {task.status ? null : (
                    <span title="Edit"
                      onClick={ () => setUpdateData({
                        id: task.id, 
                        title: task.title,
                        status: task.status ? true : false,
                      })}
                      >
                    <FontAwesomeIcon icon={faPen} />
                  </span>
                  )}
                  
                  
                  <span title="Delete"
                    onClick={() => deleteTask(task.id)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </span>
                </div>
              </div>   
                
              
            </React.Fragment>
          )
        } )}

    </div>
  );
}

export default App;
