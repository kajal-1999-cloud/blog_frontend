import React from 'react'
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import womanImg from '../../assets/AI4.jpg'
import { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice'
import { message } from 'antd'

const Navbar = () => {
  const [showModal, setShowModal] = useState(false)
  const [menuBar, setMenuBar] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = async () => {
    setShowModal(false);
    dispatch(logout())
    console.log("user Logged out")
    navigate('/login')
  }

  const handleLogin = () => {
    navigate('/login')
  }


  const handleBlogDetails = () => {
    if(!user){
      message.warning("please login to view details" )
    }else{
      navigate(`/create`)
    }
   }
 
  return (
    <div className='navbar'>
      <div className='wrapper'>
        <div className='left' data-aos="fade-left">
          <Link to='/'><span>B</span>loggerSpace</Link>
        </div>
        <ul className='center laptopVeiw'>
          <li className='listItem'><a href='#featured'>HOME</a></li>
          <li className='listItem'><a href='#categories' >CATEGORIES</a></li>
          <li className='listItem'><a href='#contacts'>CONTACTS</a></li>
          <div className='underline'></div>
          <li className='listItem'> <Link to='/create' className='create'>CREATE</Link></li>
        </ul>
        <div className='right'>
          <img src={womanImg} className='img' />
          <IoIosArrowDown className="laptopVeiw" onClick={() => setShowModal(prev => !prev)} />
          {showModal &&
            <div className='modal laptopVeiw'>
              {user ? (<>
                <p style={{ cursor: 'pointer', marginTop:"14px" }} onClick={handleLogout}>LOGOUT</p>
                <div className='underline'></div>
                </>
              ) :
                (<>
                  {/* <p style={{ cursor: 'pointer' }} onClick={handleLogout}>PROFILE</p> */}

                  <p style={{ cursor: 'pointer', marginTop:"14px" }} onClick={handleLogin}>login</p>
                <div className='underline'></div>
                 </>
                 
                
                )
              }
            </div>
          }
          <IoIosArrowDown className="mobileVeiw" onClick={() => setMenuBar(prev => !prev)} />
          {menuBar &&
            <div className='modal mobileVeiw'>
              <ul className='center mobileVeiw'>
                <li className='listItem'><a href='#featured'>HOME</a></li>
                <div className='underline'></div>
                <li className='listItem'><a href='#categories' >CATEGORIES</a></li>
                <div className='underline'></div>
                <li className='listItem'><a href='#contacts'>CONTACTS</a></li>
                <div className='underline'></div>
                <li className='listItem' onClick={handleBlogDetails}> <Link to='/create' className='create'>CREATE</Link></li>
                <div className='underline'></div>
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