import React from 'react'
import logo from '../../assets/logo.png'
import { Outlet} from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar';
import { useAppContext } from '../../context/AppContext';

const Layout = () => {

    const {axios, setToken, navigate} = useAppContext()

    const logout = () =>{
      localStorage.removeItem('token');
      axios.defaults.headers.common['Authorization'] = null;
      setToken(null)
      navigate('/')
    }

  return (
    <>
       <div className='flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-white'>
           <img src={logo} alt="" className='w-8 sm:w-15 cursor-pointer hover:scale-105' onClick={()=>navigate('/')}/>
           <button onClick={logout}
           className='text-sm px-8 py-2 bg-sky-950 text-white rounded-full hover:scale-105 cursor-pointer font-semibold'>Logout</button>
       </div>
       <div className='flex h-[calc(100vh-70px)]'>
           <Sidebar/>
           <Outlet/>
       </div>
    </>
  )
}

export default Layout
