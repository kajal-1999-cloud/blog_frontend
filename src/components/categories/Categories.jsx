import React from 'react'
import './categories.css'
import { useEffect } from 'react'
import { useState } from 'react'
import { request } from '../../utils/fetchApi'
import { format } from 'timeago.js'
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlinePreview } from 'react-icons/md'
import { AiFillLike } from 'react-icons/ai'
import { FiArrowRight } from 'react-icons/fi'
import { CiMenuFries } from "react-icons/ci";
import Loader from '../../components/loader/loader'
import { useSelector } from 'react-redux'
import { message } from 'antd'


const Categories = () => {
  const [blogs, setBlogs] = useState([])
  const [filteredBlogs, setFilteredBlogs] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [menuBar, setMenuBar] = useState(false)

  const {user} = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const categories = [
    'all',
    'nature',
    'music',
    'travel',
    'design',
    'programming',
    'health',
    'fashion'
  ]

  useEffect(() => {
    // Initialize AOS
    if (window.AOS) {
      window.AOS.init({ duration: 1000 });
    }
  }, []);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await request('/blog/AllBlog', 'GET')
        setBlogs(data)
        setFilteredBlogs(data)
        console.log("blogs length",Boolean(blogs))
      } catch (error) {
        console.error(error)
      }
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    if(activeCategory === 'all'){
      setFilteredBlogs(blogs)
    } else {
      setFilteredBlogs((prev) => {
        const filteredBlogs = blogs.filter((blog) => blog.category.toLowerCase() === activeCategory.toLowerCase())
        return filteredBlogs
      })
    }
  }, [activeCategory])

const toggleMenu = () => {
  setMenuBar(prev => !prev)
}
  
const handleBlogDetails = (id) => {
  if(!user){
    message.warning("please login to view details" )
    navigate("/login")
  }else{
    navigate(`/blogDetails/${id}`)
  }
 }
 
  return (
    <div className="category" id="categories">
      <div className="container">
        <h3>CATEGORIES </h3> 
        <div className="categoriesBlog">
          <div className="categories laptopVeiw">
            {categories.map((category) => (
              <span
                key={crypto.randomUUID()}
                className={`categoryItem ${activeCategory === category && 'active'}`}
                onClick={() => setActiveCategory(prev => category)}
              >
                {category}
              </span>
            ))}
          </div>
         <div className="selectCategory ">
         <span className="select mobileVeiw"> SELECT CATEGORY  </span>
          <CiMenuFries className="mobileVeiw" onClick={toggleMenu}/>
         </div>

         {menuBar && 
          (<div className="categories mobileVeiw">
            {categories.map((category) => (
              <span
                key={crypto.randomUUID()}
                className={`mobileVeiw categorylist ${activeCategory === category && 'active'}`}
                onClick={() => setActiveCategory(prev => category)}
              >
                {category.toUpperCase()}
              </span>
            ))}
          </div>
          )
          
          }

         {blogs.length !== 0 ? 
          ( filteredBlogs && filteredBlogs?.length > 0 ?
            (<div className="blogs">
              {filteredBlogs?.map((blog) => (                
                <div key={blog._id} className= "blog" data-aos="fade-up" >
                 <div className='flex' onClick={()=>handleBlogDetails(blog?._id)}>
                 <div className='blogImage' >

                 <Link to="" className='link'>
                    <img src={`https://blog-backend-4y52.onrender.com/images/${blog?.photo}`} />
                  </Link>
                  <div className="categorydata">
                      <span className="category">{blog?.category}</span>
                      <div className="data">
                        <MdOutlinePreview /> {blog.views} views
                      </div>
                      <div className="data">
                        <AiFillLike /> {blog?.likes?.length} likes
                      </div>
                    </div>
                  </div>
                 
                  <div className="blogData">
                    <h4>{blog?.title}</h4>
                   
                    <p className="blogDesc">
                      {blog?.desc}
                    </p>
                    
                    <Link to={`/blogDetails/${blog._id}`} className="readMore">
                      Read More <FiArrowRight />
                    </Link>
                    <div className="authorAndCreatedAt">
                      <p><span>Author:</span> {blog?.userId?.username}</p>
                      <p><span>Created:</span> {format(blog?.createdAt)}</p>
                    </div>
                  </div>
                 </div>
  
                </div>          
          ))}
            </div>)
            : (<h3 className="noBlogsMessage">No blogs </h3>)) : (<Loader/>)
}
            
        </div>

      </div>
    </div>
  )
}

export default Categories