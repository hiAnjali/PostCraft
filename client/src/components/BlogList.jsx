import React, { useState } from 'react'
import { blogCategories } from '../assets/assets'
import BlogCard from './BlogCard';
import { useAppContext } from '../context/useAppContext';

const BlogList = () => {

    const [menu, setMenu] = useState("All");
    const {blogs, input} = useAppContext()

    const filteredDBlogs = () =>{
      if(input === ''){
        return blogs
      }
      return blogs.filter((blog)=> blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase()))
    }

    const visibleBlogs = filteredDBlogs().filter((blog) => {
      if (menu === "All") {
        return true
      }

      return blog.category === menu
    })

  return (
    <div>
      <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>
        {blogCategories.map((item)=> (
            <div key={item} className='relative'>
                <button onClick={()=>setMenu(item)}
                className={`cursor-pointer hover:scale-105 text-slate-600 relative z-10 px-4 py-1 font-semibold ${menu === item && 'text-white px-4 pt-0.5'}`}>
                    {item} 
                    {menu === item && (
                        <div className='absolute left-0 right-0 top-0 h-7 -z-10 bg-slate-500 rounded-full'></div>
                    )}
                    
                </button>
            </div>
        ))}
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 
      gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
        {visibleBlogs.map((blog)=> <BlogCard key={blog._id} blog={blog}/>)}
      </div>
    </div>
  )
}

export default BlogList
