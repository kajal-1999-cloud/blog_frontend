import React, { useEffect, useState } from 'react'
import './featured.css'
import { MdOutlinePreview } from 'react-icons/md'
import { AiFillLike } from 'react-icons/ai'
import { request } from '../../utils/fetchApi'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'

const FeaturedBlogs = () => {
  const [featured, setfeatured] = useState()


  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = { 'Content-Type': 'Application/json' }
        const data = await request('/blog/featured', 'GET', options)
        setfeatured(data)

      } catch (error) {
        console.log(error)
      }
      console.log('featured', featured)
      //  console.log('cate', featured.category)

    }
    fetchData()
  }, [])

  return (
    <div className="featured" id='featured'>
        <div className="wrapper">
          <h3>FEATURED BLOGS<hr /></h3>
          {featured &&
          <div className="blogs">
            {featured && featured.slice(0, 1).map((blogElement, index) => {
              return (
                <div className="left">
                  <div className="mainBlog">
                    <div className='blogImage'>
                      <Link to={`/blogDetails/${blogElement?._id}`} className='link'>
                        <img src={`https://blog-backend-4y52.onrender.com/images/${blogElement?.photo}`} />
                      </Link>

                    </div>
                    <div className="mainBlogData">
                      <div className='textData'>
                        <div className='categoryData'>
                          <span className='category'>{blogElement?.category}</span>
                          <div className='data'>
                            <MdOutlinePreview /> {blogElement?.veiws} views
                          </div>
                          <div className='data'>
                            <AiFillLike />  {blogElement?.likes?.length} likes
                          </div>
                        </div>
                        <h2> {blogElement?.title}</h2>
                        <p className='blogDesc'>{blogElement?.desc}</p>
                        <div className='authorTime'>
                          <span><span>Author:</span> {blogElement?.userId.username}</span>
                          <span><span>Created:</span>  {format(blogElement?.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

           
                <div className="right">
                {featured && featured.slice(1).map((blogElement, index) => {
              return (
                  <div className="secondaryBlog">
                    <Link to={`/blogDetails/${blogElement?._id}`} className='link'>
                      <img src={`https://blog-backend-4y52.onrender.com/images/${blogElement?.photo}`} />
                    </Link>  <div className="secondaryBlogData">
                      <div className='textData'>
                        <div className='categoryData'>
                          <span className='category'>{blogElement?.category}</span>
                          <div className='data'>
                            <MdOutlinePreview /> {blogElement?.veiws} views
                          </div>
                          <div className='data'>
                            <AiFillLike />  {blogElement?.likes?.length} likes
                          </div>
                        </div>
                        <h4> {blogElement?.title}</h4>
                        <p className='desc'>{blogElement?.desc}</p>
                        <div className='authorTime'>
                          <span><span>Author:</span> {blogElement?.userId.username}</span>
                          <span><span>Created:</span>  {format(blogElement?.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
               
              );
            })}

</div>
          </div>
      }
        </div>
    </div>
  )
}

export default FeaturedBlogs