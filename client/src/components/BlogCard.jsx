import React from 'react'
import { useNavigate } from 'react-router-dom';

const BlogCard = ({blog}) => {

    const {title, description, category, image, _id } = blog;
    const navigate = useNavigate();

  return (
    <div onClick={()=> navigate(`/blog/${_id}`)} className='w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-violet-800 duration-300 cursor-pointer bg-violet-50'>
      <img src={image} alt="" className='aspect-video'/>
      <span className='ml-5 mt4 px-3 py-1 inline-block bg-sky-950 rounded-full text-white text-xs font-semibold'>{category}</span>
      <div className='p-5'>
        <h5 className='mb-2 font-semibold text-indigo-800 '>{title}</h5>
        <p className='mb-3 text-xs text-slate-950' dangerouslySetInnerHTML={{"__html":  description.slice(0,80)}}></p>
      </div>
    </div>
  )
}

export default BlogCard
