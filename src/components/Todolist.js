import React, { useState,useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faTasks } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import imageOne from '../images/1.svg'
import axios from 'axios'
import { deleteTodo,fetchTodos } from '../slices/todoSlice'

function Todolist() {
   
    
    const [deletedTask ,setDeletedTask]= useState('')


    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTodos('http://localhost:4000/todolist'))
    }, [])
    

    //Deleting a task
    const deleteTaskById = async (id,todo) => {
        let response = await axios.delete(`http://localhost:4000/todolist/${id}`)
       
        console.log("Response after deletion : " ,response )
        let actionObj = deleteTodo(id)
        dispatch(actionObj)
        if(response.status===200)
        {
            
        setDeletedTask(todo);
        setTimeout(()=> {
           setDeletedTask('')
        }, 1000);
        

       }
    }


    //from redux store
   let todolist = useSelector(state => state.todo)
   
    return (
        
        <div className='border-end border-5  p-3'>
          
                <p className="display-6 text-center heading" style={{ color: '#0096c7' }}>
                    <FontAwesomeIcon icon={faTasks} className='text-danger' size='xs' />  List of Todos
                </p>
                <hr />



                <img src={imageOne} className='w-25 mx-auto mb-5 ' alt="" />

                {/* if no todos existed, it shd render "no tasks" */}
                {todolist.length === 0 && <p className='display-6 text-danger'>No tasks found</p>}
                {
                todolist.map((todoTask) => 
                <div className='d-flex  justify-content-between mb-1' key={todoTask.id}>
                    <h3 className='text-warning' key={todoTask.id}> {todoTask.todo}</h3>
                    <button type="button" className="btn btn-danger m-1" onClick={() => deleteTaskById(todoTask.id,todoTask.todo)}>X</button>
                </div>)
                }

                {

                 deletedTask &&   
                <p class="alert alert-primary p-1 mt-5" role="alert">
                    {deletedTask} is successfully deleted.
                </p>
               

                } 
           

        
        </div>
    )
}

export default Todolist
