import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Create from './pages/create/Create';
import BlogDetails from './pages/blogDetails/BlogDetails';
import UpdateBlog from './pages/update/Update';
import { useSelector } from 'react-redux';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const {user} = useSelector((state) => state.auth)
  return (
    <div>
       <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />  } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/register' element={ <Register />} />
        <Route path='/create' element={user ?  <Create /> : <Navigate to={'/login'} /> } />
        <Route path='/blogDetails/:id' element={user ? <BlogDetails /> : <Navigate to={'/login'} /> } />
        <Route path='/updateBlog/:id' element={user?  <UpdateBlog /> : <Navigate to={'/login'} /> } />
      </Routes>
    </div>
  );
}

export default App;