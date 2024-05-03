import React from 'react'
import './categories.css'
import { useEffect } from 'react'
import { useState } from 'react'
import { request } from '../../utils/fetchApi'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import { MdOutlinePreview } from 'react-icons/md'
import { AiFillLike } from 'react-icons/ai'
import { FiArrowRight } from 'react-icons/fi'

const Categories = () => {
  const [blogs, setBlogs] = useState([])
  const [filteredBlogs, setFilteredBlogs] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
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
    const fetchBlogs = async () => {
      try {
        const data = await request('/blog/AllBlog', 'GET')
        setBlogs(data)
        setFilteredBlogs(data)

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


  return (
    <div className="category" id="categories">
      <div className="container">
        <h3>SELECT A CATEGORY </h3> <hr/>
        <div className="categoriesBlog">
          <div className="categories">
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
          {filteredBlogs?.length > 0 ?
            <div className="blogs">
              {filteredBlogs?.map((blog) => (
                <div key={blog._id} className= "blog">
                 <div className='flex'>
                 <div className='blogImage'>
                 <Link to={`/blogDetails/${blog?._id}`} className='link'>
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
            <hr/>
                </div>
            
          ))}
            </div>
            : <h3 className="noBlogsMessage">No blogs</h3>}
        </div>

      </div>
    </div>
  )
}

export default Categories