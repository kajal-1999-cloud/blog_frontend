import React, { useState } from 'react'
import  './blogDetails.css'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { request } from '../../utils/fetchApi'
import Footer from '../../components/footer/Footer'
import { format } from 'timeago.js'
import { AiFillEdit, AiFillLike, AiFillDelete, AiOutlineArrowLeft, AiOutlineLike } from 'react-icons/ai'

function BlogDetails() {
  const [blogDetails, setBlogDetails] = useState('')
  const [isLiked, setIsLiked] = useState(false)
  const { id } = useParams()
  const { user, token } = useSelector(state => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const options = { 'Authorization': `Bearer ${token}` }
        const data = await request(`/blog/find/${id}`, 'GET', options)
        setBlogDetails(data)
        setIsLiked(data.likes.includes(user._id))
        console.log("blogDetails", blogDetails)
      } catch (error) {
        console.error(error)
      }
    }
    fetchBlogDetails()
  }, [id])
  const handleLike = async () => {
    try {
      const options = { 'Authorization': `Bearer ${token}` }
      await request(`/blog/like/${id}`, 'PUT', options)
      setIsLiked(prev => !prev)
    } catch (error) {
      console.error(error)
    }
  }
  const handleDelete = async () => {
    try {
      const options = { 'Authorization': `Bearer ${token}` }
      await request(`/blog/delete/${id}`, 'DELETE', options)
      console.log("blogDetails", blogDetails)
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className='blogDetails'>
      <div className='container'>
       
        <div className='wrapper'>
        <Link to='/' className='goBack'>
         <AiOutlineArrowLeft className='arrow'/>  Go Back 
        </Link>
          <img src={`https://blog-backend-4y52.onrender.com/images/${blogDetails?.photo}`} />
          <div className='titleAndControls'>
            <h3 className='title'>{blogDetails?.title}</h3>
            {blogDetails?.userId?._id === user._id ?
              <div className='controls'>
                <Link to={`/updateBlog/${blogDetails?._id}`} className='edit'>
                  <AiFillEdit />
                </Link>
                <div className='delete'>
                  <AiFillDelete onClick={handleDelete} />
                </div>  
                </div>
              :
              <>
              {isLiked ?  <div className='like'>
                    <AiFillLike onClick={handleLike} />
                  </div> :
                   <div className='like'>
                   <AiOutlineLike onClick={handleLike} />
                 </div>
                  }
              </>
        }
              </div>
              <div className='likesAndViews'>
              <h3>    <span>{blogDetails?.views} views</span></h3>
             <h3> <span>{blogDetails?.likes?.length} likes</span></h3>
            </div>
              <div className='descAndLikesViews'>
              
            <p className='desc'>
              <span>Description: </span>
              {blogDetails?.desc}
            </p>
            
          </div>
          <div className='authorAndCreatedAt'>
            <span><span>Author:</span> {blogDetails?.userId?.username}</span>
            <span><span>Created At:</span> {format(blogDetails?.createdAt)}</span>
            </div>
          </div>
        </div>
        <Footer />
        </div>
        )
}
export default BlogDetails