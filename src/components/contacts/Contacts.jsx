import React, { useState } from 'react'
import './contacts.css'
import { FiSend } from 'react-icons/fi'
import { toast } from 'react-toastify'
const Contact = () => {
  const [email, setEmail] = useState('')


  const handleMail = (e) => {
    e.preventDefault()
    if(email === ""){
      toast.error('please fill the field')
    }
    if (email.includes("@gmail.com")) {

toast.success('email sent successfully')
      localStorage.setItem('email', email)
      console.log("email", email)
      setEmail('');
    } else {
      toast.error('please fill right email')
      return
    }

  }
  return (
    <div className='contacts' id='contacts'>
      <div className='wrapper'>
        <div className='titles'>
          <h5>Want to get the latest updates?</h5>
          <h2>Send us your email and we will do the rest!</h2>
        </div>
        <div className='inputContainer'>
          <input type="email" value={email}
            onChange={(e) => setEmail(e.target.value)} placeholder='Type email...' />
           <FiSend onClick={handleMail} className='sendIcon' />
        </div>
      </div>
    </div>
  )
}

export default Contact