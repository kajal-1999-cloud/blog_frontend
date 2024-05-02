import React from 'react'
import  './register.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { request } from '../../utils/fetchApi'
import { register } from '../../redux/authSlice'
import {useDispatch} from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRegister = async (e) => {
     e.preventDefault()
     if(username === '' || email === '' || password === '') {
      toast.error('all fields are mandetory')
      console.log("all fields required")
return 
     }
     try {
      const options = {'Content-Type': 'application/json'}
      const data = await request('/auth/register', 'POST', options, {username, email, password})
      console.log("regs pg",data)
      
      if(data.success){
        dispatch(register(data))
        navigate("/")
        toast.success('resgister successfully')
      }
      else{
        toast.error(data.message ? data.message : "failed to register" )
        console.log("error",data.error)
      }
      
    } catch (error) {
      toast.error('error, please try again later')
       console.log(error)
    }
  }

  return (
    <div className='register'>
      <div className='wrapper'>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Username..." onChange={(e) => setUsername(e.target.value)}/>
          <input type="email" placeholder="Email..." onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="Password..." onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit">Register</button>
          <p>Already have an account? <Link to='/login'>Login</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Register