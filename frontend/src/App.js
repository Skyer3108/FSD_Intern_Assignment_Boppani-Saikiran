import {useState,useEffect} from 'react'

import {BrowserRouter as Router,Route,Routes,Navigate} from 'react-router-dom'

import Login from './Components/LoginPage'
import Signup from './Components/SignupPage'
import Task from './Components/Task'

function App() {

  const [user,setUser]=useState(null)

  const [loading,setLoading]=useState(true)


  useEffect(()=>{


    const storeUser=JSON.parse(localStorage.getItem('user'));

    console.log(storeUser)

    if(storeUser){
      setUser(storeUser)
    }

    setLoading(false)
  },[])


  const handelLogOut=()=>{

    setUser(null)

    localStorage.removeItem('user')
  }

  if(loading){
    return <div>
      Loading......
    </div>
  }

  return (
    <div className="App">

      

      <Router>
        <Routes>

        <Route path='/login' element={<Login setUser={setUser}/>}/>
        <Route path='/signup' element={<Signup setUser={setUser}/>}/>

        <Route path='/' element={user?<Task user={user} handelLogOut={handelLogOut}/>:<Navigate to='/login'/>}/>
       

         
        </Routes>
      </Router>
      
      
    </div>
  );
}

export default App;
