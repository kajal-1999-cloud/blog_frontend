import React from 'react'
import './footer.css'

const Footer = () => {
  return (
    <footer>
      <div className='footer'>
        <hr/>
        <div className='col'>

          <h2>About the App</h2>
        <hr/>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Possimus quo voluptatum, ullam quam perspiciatis deleniti obcaecati architecto,
            sed minus culpa autem suscipit rem vero voluptas alias animi. Iure, eaque dicta!
          </p>
        </div>

        <div className='col'>

          <h2>Contacts</h2>
        <hr/>
          <span>Phone: +91 1234567890</span>
         <a href='https://www.linkedin.com/in/kajal-gupta1401/'>LinkedIn</a>
          <a href='https://github.com/kajal-1999-cloud'>GitHub</a>
        </div>
        <div className='col'>
      
          <h2>Location</h2>
        <hr/>
          <span>Continent: Asia</span>
          <span>Country: India</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer