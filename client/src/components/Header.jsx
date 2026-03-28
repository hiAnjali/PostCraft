import React from 'react';
import { useAppContext } from '../context/useAppContext';

const Header = () => {

  const {setInput, input} = useAppContext()

  const onSubmitHandler = async(e)=>{
    e.preventDefault();
    setInput(input.trim())
  }

  const onClear = ()=>{
    setInput('')
  }

  return (
    <div className='py-20 sm:py-24 bg-gradient-to-r from-violet-300 to-violet-100 px-4'>
      <div className='text-center'>

        {/* <form onSubmit={onSubmitHandler}
        className='flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden'>
            <input ref={inputRef}
            className='w-full pl-4 outline-none' type="text" placeholder='What are we digging for today?' required/>
            <button className='bg-sky-950 text-amber-50 px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer' type='submit'>Search</button>
        </form>  */}

        <h1 className='text-xl sm:text-4xl font-bold leading-snug text-indigo-700'>
          Insights That Speak Louder Than Noise!
        </h1>
        <p className='mt-3 sm:mt-5 max-w-xl mx-auto text-sm sm:text-base text-gray-700 font-medium'>
          PostCraft is your digital copy companion — a refined space where messaging meets meaning.
          From bold headers to smooth CTA buttons, every word is designed to resonate.
        </p>
        <form onSubmit={onSubmitHandler}
        className='flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden'>
            <input value={input} onChange={(e)=> setInput(e.target.value)}
            className='w-full pl-4 outline-none' type="text" placeholder='What are we digging for today?' required/>
            <button className='bg-sky-950 text-amber-50 px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer' type='submit'>Search</button>
        </form> 

      </div>
      <div className='text-center'>
        {input && <button onClick={onClear}
        className='border font-light text-xs py-1 px-3 cursor-pointer rounded-sm shadow-custom-sm'>clear search</button>}
      </div>
    </div>
  );
};

export default Header;


