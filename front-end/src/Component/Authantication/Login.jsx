import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Login.css"
import axios from "axios"


const Login = () => {
  const navigate = useNavigate()
    const [valu ,setVal] =useState({
 
        email:"",
        password:''
    })

    const handlChange = (e)=>{
      setVal((prov)=>({...prov,[e.target.name]:e.target.value}))
    }

    const handSubmit = async (e)=>{
        e.preventDefault()
        try {
          const res = await axios.post('http://localhost:4000/login', valu);
          localStorage.setItem('token', res.data.token);
          alert('Login Successful');
          navigate("/view")
        } catch (error) {
          console.error(error);
        }
    }
  return (
    <div>
      <form action="" className='form' onSubmit={handSubmit} >
        
        <label htmlFor="email">Eamil</label>
        <input type="text" name='email' id="email" placeholder='Enter Your Email' onChange={handlChange} value={valu.email}  className='input_feilt' required />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" id='pasword'  className='input_feilt' name='password' onChange={handlChange} value={valu.password}  required />
       <button className='lgin' type='submit'>Login</button>
        <Link to={"/"}><button className='sigbtn'>SignUp</button></Link>
        
      </form>
    </div>
  )
}

export default Login
