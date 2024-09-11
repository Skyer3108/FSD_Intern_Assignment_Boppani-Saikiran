import { useState } from "react";
import axios from "axios";
import './form.css'

import { useNavigate,Link } from "react-router-dom";



const Signup=({setUser})=>{

    const [data,setData]=useState({
        username:'',
        email:'',
        password:''
    })

    const navigate=useNavigate()

    const handleSingup=async()=>{

        try{

            if(data.username.trim()!==''&&data.email.trim()!==''&&data.password.trim()!==''){

                const response=await axios.post('http://localhost:5000/api/sign-up',data)

                const userData={id:response.data.id,token:response.data.token}
    
                localStorage.setItem('user',JSON.stringify(userData))
    
                setUser(userData)
                navigate('/')

            }else{
                alert('Plese Enter All The Details')
            }
           

        }
        catch(err){

            console.log(err)

        }

    }

    return(
        <div className="container">

<div className="main">

<h3>Sign up</h3>

<input type="text" placeholder="Enter your Name" value={data.username} onChange={(e)=>setData({...data,username:e.target.value})} required/>

<input type="email" placeholder="Enter your Email" value={data.email} onChange={(e)=>setData({...data,email:e.target.value})} required/>

<input type="password" placeholder="Enter your Password" value={data.password} onChange={(e)=>setData({...data,password:e.target.value})} required/>

<button onClick={handleSingup}>
    Singup
</button>


<p>
    Already have an account?<Link to='/login'>Login Here</Link>
</p>

</div>
            

        </div>
    )
}

export default Signup