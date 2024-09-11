import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import axios from 'axios'
import './form.css'

const Login = ({ setUser }) => {

    const [data, setData] = useState({
        email: '',
        password: ''
    })


    const navigate = useNavigate()

    const handleLogin = async () => {
        try {

            if(data.email.trim()!==''&&data.password.trim()!==''){
                const response = await axios.post('http://localhost:5000/api/login', data)

                const userData = { id: response.data.id, token: response.data.token }
    
                console.log(userData)
                localStorage.setItem('user', JSON.stringify(userData))
    
                setUser(userData);
                navigate('/')
            }else{
                alert('Please Enter all the Details')
            }
            
        } catch (err) {

            console.log(err)
        }
    }

    return (
        <div className="container">

            <div className="main">
                <h3>Login</h3>

                <input type="email" placeholder="Enter Your Email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} required />

                <input type="password" placeholder="Enter Your Password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} required />

                <button onClick={handleLogin}>LogIn</button>

                <p>If Don't have an account? <Link to='/signup'>Sign up Here</Link></p>

            </div>

        </div>
    )
}

export default Login

