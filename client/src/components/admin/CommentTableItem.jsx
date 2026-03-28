import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/useAppContext';
import toast from 'react-hot-toast';

const CommentTableItem = ({comment, fetchComments}) => {

    const {blog, createdAt, _id} = comment;
    const BlogDate = new Date(createdAt);

    const {axios} = useAppContext()

    const approveComment = async()=>{
      try {
        const {data} = await axios.post('/api/admin/approve-comment', {id: _id})
        if(data.success){
          toast.success(data.message)
          fetchComments()
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    const deleteComment = async()=>{
      try {

        const confirm = window.confirm('Are you sure you want to delete this comment?');
        if(!confirm) return;

        const {data} = await axios.post('/api/admin/delete-comment', {id: _id})
        if(data.success){
          toast.success(data.message)
          fetchComments()
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    const actionContent = !comment.isApproved
      ? <img onClick={approveComment} src={assets.tick_icon} className='w-5 hover:scale-105 transition-all cursor-pointer'/>
      : <p className='text-xs border border-green-900 text-green-600 rounded-full px-3 py-1'>Approved</p>

  return (
    <tr className='border-y border-violet-100'>
        <td className='px-6 py-4'>
            <b className='font-medium text-violet-800'>Blog</b> : {blog?.title || 'Deleted blog'}
            <br />
            <br />
            <b className='font-medium text-violet-800'>Name</b> : {comment.name}
            <br />
            <b className='font-medium text-violet-800'>Comment</b> : {comment.content}
        </td>
        <td className='px-6 py-4 max-sm:hidden'>{BlogDate.toLocaleDateString()}</td>
        <td className='px-6 py-4 max-sm:hidden'>
            <div className='inline-flex items-center gap-4'>{actionContent}
            <img onClick={deleteComment}
            src={assets.bin_icon} alt="" className='w-5 hover:scale-105 transition-all cursor-pointer'/>
            </div>
        </td>
    </tr>
  )
}

export default CommentTableItem
