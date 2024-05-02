import React from 'react'
import Categories from '../../components/categories/Categories'
import Featured from '../../components/featured/Featured'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import Newsletter from '../../components/contacts/Contacts'
import  './home.css'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Featured />
      <Categories />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Home