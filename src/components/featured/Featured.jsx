import React, { useEffect, useState } from 'react'
import './featured.css'
import { MdOutlinePreview } from 'react-icons/md'
import { AiFillLike } from 'react-icons/ai'
import { request } from '../../utils/fetchApi'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/loader'
import { format } from 'timeago.js'
import defaultPic1 from '../../assets/defaultPic1.jpg'
import defaultPic3 from '../../assets/defaultPic3.jpg'
import defaultPic2 from '../../assets/defaultPic2.jpg'
import { useSelector } from 'react-redux'
import { message } from 'antd';
const FeaturedBlogs = () => {
  const {user} = useSelector((state) => state.auth)
  const [featured, setfeatured] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({ duration: 3000 });
    }
  }, []);
 const handleBlogDetails = (id) => {
  if(!user){
    message.warning("please login to view details" )
    navigate("/login")
  }else{
    navigate(`/blogDetails/${id}`)
  }
 }
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = { 'Content-Type': 'Application/json' }
        const data = await request('/blog/featured', 'GET', options)
        setTimeout(()=>{
          setfeatured(data)               
          },2700)
        console.log("featured", data)
      } catch (error) {
        console.log(error)
      }
      console.log('featured', featured)
    }
    fetchData()
  }, [])

  return (
    <div className="featured" id='featured'>
      <div className="wrapper">
        <h3>FEATURED BLOGS</h3>
        {featured ?

        (<div className="blogs"> 
         {featured && featured.slice(0, 1).map((blogElement, index) => {
        return ( 
              <div className="left">
                  <div className="mainBlog" data-aos="zoom-in">
                    <div className='blogImage'>
                     <div onClick={()=>handleBlogDetails(blogElement?._id)}>
                         <Link to='' className='link'>
                        <img src={`https://blog-backend-4y52.onrender.com/images/${blogElement?.photo}`} />
                      </Link>
                      </div>
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
            <div  onClick={()=>handleBlogDetails(blogElement?._id)}> 

              <Link to="" className='link'>

              <div key={index} className="secondaryBlog" data-aos="fade-up">
                   
                  <img src={`https://blog-backend-4y52.onrender.com/images/${blogElement?.photo}`} alt='img...'/>
                 
                     <div className="secondaryBlogData">
                      <div className='textData'>
                      <span className='category'>{blogElement?.category}</span>


                       <h4> {blogElement?.title}</h4>
                        <p className='desc'>{blogElement?.desc}</p>
                        <div className='veiwLikes'>
                          <div className='data'>
                            <MdOutlinePreview /> {blogElement?.veiws} views
                          </div>
                          <div className='data'>
                            <AiFillLike />  {blogElement?.likes?.length} likes
                          </div>
                          </div>
                        <div className='authorTime'>
                          <span><span>Author:</span> {blogElement?.userId.username}</span>
                          <span><span>Created:</span>  {format(blogElement?.createdAt)}</span>
                        </div>
                      </div>
                </div>
             </div>
              </Link> 
              </div>
                );
              })}

            </div>
          </div>)
         :
        //  default pics  if data is not showing ...
       ( <div className="blogs">
          <div className="left">
            <div className="mainBlog" data-aos="zoom-in">
              <div className='blogImage'>
                <Link to='' className='link'>
                  <img src={defaultPic1} />
                </Link>
              </div>
              <div className="mainBlogData">
                <div className='textData'>
                  <div className='categoryData'>
                    <span className='category'>category</span>
                    <div className='data'>
                      <MdOutlinePreview /> 100 views
                    </div>
                    <div className='data'>
                      <AiFillLike />  200 likes
                    </div>
                    <Loader className="loading" />
                  </div>
                  <h2> Title</h2>
                  <p className='blogDesc'>description</p>
                  <div className='authorTime'>
                    <span><span>Author:</span> name</span>
                    <span><span>Created:</span> 24/04/24</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="right">

            <Link to='' className='link'>

              <div className="secondaryBlog" data-aos="fade-down">

                <img src={defaultPic2} alt='img...' />
                       
                <div className="secondaryBlogData">
                  <div className='textData'>
                    <span className='category'>category</span>


                    <h4> Title</h4>
                    <p className='desc'>description</p>
                    <div className='veiwLikes'>
                      <div className='data'>
                        <MdOutlinePreview /> 100 views
                      </div>
                      <div className='data'>
                        <AiFillLike />  25 likes
                      </div>
                    </div>
                    <div className='authorTime'>
                      <span><span>Author:</span>author</span>
                      <span><span>Created:</span>  24/4/24</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <Link to='' className='link'>

              <div className="secondaryBlog" data-aos="fade-up">

                <img src={defaultPic3} alt='img...' />
                    
                <div className="secondaryBlogData">
                  <div className='textData'>
                    <span className='category'>category </span>

                    <h4> Title</h4>
                    <p className='desc'>description</p>

                    <div className='veiwLikes'>
                      <div className='data'>
                        <MdOutlinePreview /> 100 views
                      </div>
                      <div className='data'>
                        <AiFillLike />  25 likes
                      </div>
                    </div>
                    <div className='authorTime'>
                      <span><span>Author:</span>author</span>
                      <span><span>Created:</span>  24/4/24</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>)
         }
      </div>
    </div>
  )
}
export default FeaturedBlogs