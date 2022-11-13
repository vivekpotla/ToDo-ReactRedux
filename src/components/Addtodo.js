import { useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReact } from '@fortawesome/free-brands-svg-icons'
import { addTodo } from '../slices/todoSlice'
import { useDispatch } from 'react-redux'
import axios from 'axios'

function Addtodo() {

    
    

    const { register, handleSubmit, formState: { errors } ,setValue } = useForm()
    const dispatch = useDispatch()

    //form submit
    const onFormSubmit = async(todoObj) => {
        setValue("todo", "")
        //posting to DB.json to get id
        await axios.post('http://localhost:4000/todolist', todoObj) 
        var response =await axios.get("http://localhost:4000/todolist")
        //setting id attribute and sending to store
        todoObj.id=response.data[response.data.length-1].id;
        let actionObj = addTodo(todoObj)
        dispatch(actionObj)
    }



    return (
        <div className="row row-11 row-sm-10 row-md-7 border-end border-5 p-3">
            <p className="display-6 text-center text-info heading">
                <FontAwesomeIcon icon={faReact} className='text-success' /> New Todo
            </p>
            <hr />
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <div className="mb-3">
                    <label htmlFor="todo">
                        Enter a task
                    </label>
                    <input type="text" id="todo" className="form-control" {...register("todo", { required: true })} />
                    {/* validation error msg for todo */}
                    {errors.todo?.type === 'required' && <p className='text-danger'>*Enter a valid TODO</p>}
                </div>
                <button className="btn btn-info w-50" type="submit">Add todo</button>
            </form>


        </div>
    )
}

export default Addtodo
