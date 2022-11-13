import Addotodo from './components/Addtodo'
import Todolist from './components/Todolist'



function App() {



  return (
    <div className="container text-center mt-5">

    
      
      <div className="row">
        <div className="col-sm-5">
          <Addotodo />
        </div>
        <div className="col-sm-7">
          <Todolist />
        </div>
      </div>
     

    </div>
  );
}

export default App;
