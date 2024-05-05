import React from 'react'
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import womanImg from '../../assets/AI4.jpg'
import { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice'

const Navbar = () => {
  const [showModal, setShowModal] = useState(false)
  const [menuBar, setMenuBar] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    setShowModal(false);
    dispatch(logout())
    console.log("user Logged out")
    navigate('/login')
  }

  return (
    <div className='navbar'>
      <div className='wrapper'>
        <div className='left'>
          <Link to='/'><span>B</span>loggerSpace</Link>
        </div>
        <ul className='center laptopVeiw'>
          <li className='listItem'><a href='#featured'>HOME</a></li>
          <li className='listItem'><a href='#categories' >CATEGORIES</a></li>
          <li className='listItem'><a href='#contacts'>CONTACTS</a></li>
          <li className='listItem'> <Link to='/create' className='create'>CREATE</Link></li>
        </ul>
        <div className='right'>
          <img src={womanImg} className='img' />
          <IoIosArrowDown className="laptopVeiw" onClick={() => setShowModal(prev => !prev)} />
          {showModal &&
            <div className='modal laptopVeiw'>
              <p style={{ cursor: 'pointer' }} onClick={handleLogout}>LOGOUT</p>
            </div>
          }
          <IoIosArrowDown className="mobileVeiw" onClick={() => setMenuBar(prev => !prev)} />
          {menuBar &&
            <div className='modal mobileVeiw'>
              <ul className='center mobileVeiw'>
                <li className='listItem'><a href='#featured'>HOME</a></li>
                <li className='listItem'><a href='#categories' >CATEGORIES</a></li>
                <li className='listItem'><a href='#contacts'>CONTACTS</a></li>
                <li className='listItem'> <Link to='/create' className='create'>CREATE</Link></li>
                <li className='listItem' onClick={handleLogout}> LOGOUT</li>
              </ul>
            </div>
          }

        </div>
      </div>
    </div>
  )
}

export default Navbar