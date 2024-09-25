import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import axios from 'axios'

const Signup = () => {
  const navigate = useNavigate()
    const [valu ,setVal] =useState({
        name:"",
        email:"",
        password:''
    })
   const handlChange = (e)=>{
    setVal((prov)=>({...prov,[e.target.name]:e.target.value}))
   }
    const handSubmit = async(e)=>{
        e.preventDefault()
        try {
          const res = await axios.post('http://localhost:4000/signup', valu);
          localStorage.setItem('token', res.data.token);
          alert('SuccessFully Signup');
          navigate("/login")
        } catch (error) {
          alert(error)
          console.error(error);
        }
    }
  return (
    <div>
      <form action="" className='sigform' onSubmit={handSubmit} >
        <label htmlFor="name">Name</label>
        <input type="text" name='name' placeholder='Enter the Name' onChange={handlChange} value={valu.name}  className='input_feilt' id="name" required />
        <br />
        <label htmlFor="email">Eamil</label>
        <input type="text" name='email' id="email" placeholder='Enter Your Email' onChange={handlChange} value={valu.email}  className='input_feilt' required />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" id='password'  className='input_feilt' required name='password'  onChange={handlChange} value={valu.password}  />
        <br />
        <button className='sngbtn' type='submit'>SignUp</button>
        <Link to={'/login'}><button className='Lgin'>Login</button></Link>
        
      </form>
    </div>
  )
}

export default Signup
