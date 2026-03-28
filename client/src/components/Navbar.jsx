import React from 'react'
import logo from '../assets/logo.png';
import { useAppContext } from '../context/useAppContext';

const Navbar = () => {

    const {navigate, token, currentUser, setToken, setCurrentUser} = useAppContext()
    const adminLabel = token ? 'Dashboard' : 'Login'

    const logoutAdmin = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('currentUser')
      setToken(null)
      setCurrentUser(null)
      navigate('/')
    }

    const dashboardLabel = currentUser?.name ? `${currentUser.name.split(' ')[0]}'s Dashboard` : 'Dashboard'

  return (
    <div className='flex justify-between items-center py-2 mx-3 sm:mx-20 xl:mx-32'>
      <div className='flex items-center gap-3 sm:gap-2'>
        <img onClick={()=> navigate('/')} src={logo} alt="" className='w-10 sm:w-20 hover:scale-105' />
        <p className='text-base sm:text-xl font-semibold tracking-wide cursor-pointer text-amber-50'>
          PostCraft - Words That Work
        </p>
      </div>
      <div className='flex items-center gap-3'>
        {token ? (
          <>
            <button onClick={()=> navigate('/admin')} className='rounded-full text-sm cursor-pointer bg-white text-sky-950 px-5 sm:px-7 py-2.5 font-semibold hover:scale-105'>
              {dashboardLabel}
            </button>
            <button onClick={logoutAdmin} className='rounded-full text-sm cursor-pointer bg-white text-sky-950 px-5 py-2.5 font-semibold hover:scale-105'>
              Logout
            </button>
          </>
        ) : (
          <button onClick={()=> navigate('/signup')} className='rounded-full text-sm cursor-pointer bg-white text-sky-950 px-5 sm:px-7 py-2.5 font-semibold hover:scale-105'>
            Sign Up
          </button>
        )}
        {!token && (
          <button onClick={()=> navigate('/admin')} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-sky-950 text-amber-50 px-6 sm:px-10 py-2.5 font-semibold hover:scale-105 '>
            {adminLabel}
          </button>
        )}
      </div>
    </div>
  )
}


export default Navbar
