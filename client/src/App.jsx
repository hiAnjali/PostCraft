import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Signup from './pages/Signup'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddBlog from './pages/admin/AddBlog'
import ListBlog from './pages/admin/ListBlog'
import Comments from './pages/admin/Comments'
import Login from './components/admin/Login'
import 'quill/dist/quill.snow.css'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/useAppContext'

const App = () => {

  const {token} = useAppContext()
  const adminElement = token ? <Layout/> : <Login/>

  return (
    <div className='min-h-screen bg-gradient-to-r from-violet-300 to-violet-100'>
      <Toaster/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/blog/:id' element={<Blog/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/admin' element={adminElement}>
            <Route index element={<Dashboard/>}/>
            <Route path='addBlog' element={<AddBlog/>}/>
            <Route path='listBlog' element={<ListBlog/>}/>
            <Route path='comments' element={<Comments/>}/>
        </Route>
      </Routes>
    </div> 
  )
}

export default App
