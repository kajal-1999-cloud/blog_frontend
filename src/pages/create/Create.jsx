import React,{ useState } from 'react'
import  './create.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { toast, ToastContainer } from 'react-toastify';
  import { request } from '../../utils/fetchApi'

const Create = () => {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [img, setImg] = useState("")
  const [category, setCategory] = useState("select")
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const categories = [
    'Nature',
    'Music',
    'Travel',
    'Programming',
    'Games',
    'Fashion',
    'Spritual',
    'health'
  ]
   
  const onChangeFile = (e) => {
    setImg(e.target.files[0])
    console.log('image upload', e.target.files[0])
  }

  const handleCreateBlog = async(e) => {
       e.preventDefault()
    const formData = new FormData()
    try{
       
      let fileName = null;
      if(img){
        fileName = crypto.randomUUID() + img.name
        formData.append("filename", fileName)
        formData.append('image', img)

        await fetch(`http://localhost:5000/upload`, {
          method: 'POST',
          body: formData
        })

      }else{
        toast.error('set the image to create blog')
        console.log("please fill all fields")
        return
      }


      const options = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }

      const body = {
        title, desc, category, photo: fileName
      }

      const data = await request('/blog', "POST", options, body)
      console.log("blog created",data)
      navigate(`/blogDetails/${data._id}`)
      toast.success("blog created")
    }catch(error){
      console.error(error)
    }
  }
  return (
    <div className='createBlog'>
      <div className='container'>
        <div className='wrapper'>
          <h2 className='title'>Create Blog</h2>
          <form onSubmit={handleCreateBlog} encType="multipart/form-data">
            <div className='inputWrapper'>
              <label>Title: </label>
              <input
                type="text"
                placeholder='Title...'
                className='input'
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className='inputWrapper'>
              <label>Description: </label>
              <input
                type="text"
                placeholder='Description...'
                className='input'
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className='inputWrapperSelect'>
              <label>Category: </label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value='select' disabled>select</option>
                {categories.map((category) => (
                  <option key={crypto.randomUUID()} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className='inputWrapperImg'>
              <label htmlFor='image' className='labelFileInput'>
                Image: <span>Upload here</span>
              </label>
              <input
                id="image"
                type="file"
                className='input'
                onChange={onChangeFile}
                style={{ display: 'none' }}
              />
              {img && <p className='imageName'>{img.name} <AiOutlineCloseCircle className='closeIcon'  /></p>}
            </div>
            <div className='buttonWrapper'>
              <button className='submitBtn' type="submit">
                Submit form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Create