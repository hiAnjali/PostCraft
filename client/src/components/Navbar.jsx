import React from 'react'
import logo from '../assets/logo.png';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {

    const {navigate, token} = useAppContext()

  return (
    <div className='flex justify-between items-center py-2 mx-3 sm:mx-20 xl:mx-32'>
      <div className='flex items-center gap-3 sm:gap-2'>
        <img onClick={()=> navigate('/')} src={logo} alt="" className='w-10 sm:w-20 hover:scale-105' />
        <p className='text-base sm:text-xl font-semibold text-twilightIndigo tracking-wide cursor-pointer text-amber-50'>
          PostCraft - Words That Work
        </p>
      </div>
      <button onClick={()=> navigate('/admin')} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-sky-950 text-amber-50 px-6 sm:px-10 py-2.5 font-semibold hover:scale-105 '>
        {token ? 'Dashboard' : 'Login'}
      </button>
    </div>
  )
}


export default Navbar
