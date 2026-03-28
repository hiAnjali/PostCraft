import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAppContext } from '../context/useAppContext'
import toast from 'react-hot-toast'

const Signup = () => {
  const { axios, setToken, setCurrentUser, navigate } = useAppContext()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match')
    }

    try {
      setIsSubmitting(true)
      const { data } = await axios.post('/api/user/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })

      if (!data.success) {
        return toast.error(data.message)
      }

      setToken(data.token)
      setCurrentUser(data.user)
      axios.defaults.headers.common['Authorization'] = data.token
      localStorage.setItem('token', data.token)
      localStorage.setItem('currentUser', JSON.stringify(data.user))
      toast.success(data.message)
      navigate('/admin')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar/>
      <div className='flex-1 flex items-center justify-center px-4 py-14'>
        <div className='w-full max-w-5xl grid lg:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl bg-white'>
          <div className='bg-sky-950 text-white p-8 sm:p-12 flex flex-col justify-center'>
            <p className='text-sm uppercase tracking-[0.3em] text-amber-200'>Join PostCraft</p>
            <h1 className='text-4xl sm:text-5xl font-bold mt-4 leading-tight'>Create your admin account.</h1>
            <p className='mt-5 text-slate-200 text-sm sm:text-base'>
              Every new signup in this project gets full dashboard access, including adding, publishing, and deleting posts.
            </p>
            <div className='mt-8 space-y-3 text-sm text-slate-200'>
              <p>Use your email to create a secure admin account.</p>
              <p>After signup, you will be redirected straight to the admin dashboard.</p>
              <p>You can later log in again through the same admin login screen.</p>
            </div>
          </div>

          <div className='p-8 sm:p-12'>
            <div className='max-w-md mx-auto'>
              <h2 className='text-3xl font-bold text-sky-950'>Admin Sign Up</h2>
              <p className='mt-2 text-gray-600'>Create a new PostCraft admin account.</p>

              <form onSubmit={onSubmitHandler} className='mt-8 space-y-5'>
                <div>
                  <label className='block text-sm font-semibold text-sky-950 mb-2'>Full Name</label>
                  <input
                    name='name'
                    value={formData.name}
                    onChange={onChangeHandler}
                    type='text'
                    placeholder='Enter your full name'
                    required
                    className='w-full rounded-xl border border-violet-200 px-4 py-3 outline-none focus:border-sky-950'
                  />
                </div>

                <div>
                  <label className='block text-sm font-semibold text-sky-950 mb-2'>Email</label>
                  <input
                    name='email'
                    value={formData.email}
                    onChange={onChangeHandler}
                    type='email'
                    placeholder='Enter your email'
                    required
                    className='w-full rounded-xl border border-violet-200 px-4 py-3 outline-none focus:border-sky-950'
                  />
                </div>

                <div>
                  <label className='block text-sm font-semibold text-sky-950 mb-2'>Password</label>
                  <input
                    name='password'
                    value={formData.password}
                    onChange={onChangeHandler}
                    type='password'
                    placeholder='At least 6 characters'
                    required
                    minLength={6}
                    className='w-full rounded-xl border border-violet-200 px-4 py-3 outline-none focus:border-sky-950'
                  />
                </div>

                <div>
                  <label className='block text-sm font-semibold text-sky-950 mb-2'>Confirm Password</label>
                  <input
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={onChangeHandler}
                    type='password'
                    placeholder='Re-enter your password'
                    required
                    minLength={6}
                    className='w-full rounded-xl border border-violet-200 px-4 py-3 outline-none focus:border-sky-950'
                  />
                </div>

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full rounded-xl bg-sky-950 text-white py-3 font-semibold cursor-pointer hover:scale-[1.01] transition-all disabled:opacity-70'
                >
                  {isSubmitting ? 'Creating account...' : 'Create Account'}
                </button>
              </form>

              <p className='mt-6 text-sm text-gray-600'>
                Already have an admin account?{' '}
                <button onClick={() => navigate('/admin')} className='text-sky-950 font-semibold cursor-pointer'>
                  Go to admin login
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Signup
