import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'




//For API Call initially
export const fetchTodos = createAsyncThunk('todolist', async (apiEndPoint, thunkApi) => {

    console.log("api call started");

    try {
        let response = await axios.get(apiEndPoint)
        let apiData = response.data
        return apiData;
    }
    catch (err) {
        return thunkApi.rejectWithValue(err.message)
    }

})



export const todoListSlice = createSlice({
    name: 'todos',
    initialState:[],
    reducers: {
        addTodo: (state, action) => {   
            state.push(action.payload)
           
        },
        deleteTodo:(state,action)=>{

            console.log("Delete todo callled for id " ,action.payload)
            const removeIndex = state.findIndex( todoTask => todoTask.id === action.payload );
            state.splice( removeIndex, 1 ); 
        }
    },
    extraReducers:{
      [fetchTodos.fulfilled]: (state, action) => {
        console.log(action )
            console.log("Extra reducer for api call")
            console.log("initial state is " ,state)
            console.log('payload at begining is ' ,action.payload)
            for(let taskObj of action.payload)
            state.push(taskObj)
    }
    }
})

//create action creator functions
export const { addTodo,deleteTodo } = todoListSlice.actions

//export reducer
export default todoListSlice.reducer