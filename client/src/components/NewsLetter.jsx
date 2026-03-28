import React from 'react'
import toast from 'react-hot-toast'

const NewsLetter = () => {
  const onSubmit = (e) => {
    e.preventDefault()
    toast.success('Thanks for subscribing. New posts will land in your inbox soon.')
    e.currentTarget.reset()
  }

  return (
    <div className='flex flex-col items-center justify-center text-center space-y-2 my-32'>
      <h1 className='md:text-4xl text-2xl font-semibold'>Read. Write. Resonate.</h1>
      <p className='md:text-lg text-indigo-700 font-semibold pb-8'>We send out insights that sharpen your messaging - no spam, just signal.</p>
      <form onSubmit={onSubmit} className='flex items-center justify-between max-w-2xl w-full md:h-13 h-12'>
        <input type="email" placeholder='Enter your email' required className='border border-gray-900 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-900 font-semibold'/>
        <button type='submit' className='md:px-12 px-8 h-full font-semibold text-white bg-sky-950 hover:scale-105 transition-all cursor-pointer rounded-md rounded-l-none'>Subscribe</button>
      </form>
    </div>
  )
}

export default NewsLetter
