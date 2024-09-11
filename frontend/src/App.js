import {useState,useEffect} from 'react'

import {BrowserRouter as Router,Route,Routes,Navigate} from 'react-router-dom'
import axios from 'axios'
import Login from './Components/LoginPage'
import Signup from './Components/SignupPage'
import Task from './Components/Task'

function App() {

  const [user,setUser]=useState(null)


  useEffect(()=>{

    const storeUser=JSON.parse(localStorage.getItem('user'));

    if(storeUser){
      setUser(storeUser)
    }
  },[])



  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path='/login' element={<Login setUser={setUser}/>}/>
          <Route path='/signup' element={<Signup setUser={setUser}/>}/>

          <Route path='/' element={user?<Task user={user}/>:<Navigate to='/login'/>}/>
        </Routes>
      </Router>
      
      
    </div>
  );
}

export default App;
