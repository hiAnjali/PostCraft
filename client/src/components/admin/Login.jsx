import React, { useState } from 'react'
import { useAppContext } from '../../context/useAppContext'
import toast from 'react-hot-toast';

const Login = () => {

    const {axios, setToken, setCurrentUser} = useAppContext();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const {data} = await axios.post('/api/admin/login', {email, password})
            if(data.success){
                setToken(data.token)
                setCurrentUser(data.user || null)
                localStorage.setItem('token', data.token)
                if (data.user) {
                    localStorage.setItem('currentUser', JSON.stringify(data.user))
                } else {
                    localStorage.removeItem('currentUser')
                }
                axios.defaults.headers.common['Authorization'] = data.token;
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <div className='flex items-center justify-center h-screen'>
        <div className='w-full max-w-sm p-6 max-md:m-6 border border-violet-950 shadow-xl shadow-violet-400 rounded-lg bg-white'>
            <div className='flex flex-col items-center justify-center'>
                <div className='w-full py-6 text-center'>
                    <h1 className='text-3xl font-bold text-sky-950'> Login</h1>
                    <p className='font-light'>Secure doors ahead. Provide your credentials to enter.</p>
                </div>
                <form onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-600'>
                    <div className='flex flex-col'>
                        <label className='font-semibold'>Email</label>
                        <input onChange={e=> setEmail(e.target.value)} value={email}
                        type="email" required className='border-b-2 border-violet-800 p-2 outline-none mb-6' placeholder='your email id'/>
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-semibold'>Password</label>
                        <input onChange={e=> setPassword(e.target.value)} value={password}
                        type="password" required className='border-b-2 border-violet-800 p-2 outline-none mb-6' placeholder='enter your password'/>
                    </div>
                    <button type='submit' className='w-full py-2 font-semibold bg-sky-950 text-white rounded cursor-pointer hover:scale-105'>Submit</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login
