import { useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast';
import { AppContext } from './appContextInstance'

axios.defaults.baseURL = (import.meta.env.VITE_BASE_URL || 'http://localhost:3000').trim();

export const AppProvider = ({children})=>{

    const navigate = useNavigate()

    const [token, setToken] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)
    const [blogs, setBlogs] = useState([]);
    const [input, setInput] = useState("");

    const fetchBlogs = async()=>{
        try {
            const {data} = await axios.get('/api/blog/all');
            if (data.success) {
                setBlogs(data.blogs)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        fetchBlogs();
        const token = localStorage.getItem('token')
        if(token){
            setToken(token);
            axios.defaults.headers.common['Authorization'] = `${token}`;
        }

        const storedCurrentUser = localStorage.getItem('currentUser')

        if (storedCurrentUser) {
            setCurrentUser(JSON.parse(storedCurrentUser))
        }
    },[])

    const value = {
        axios, 
        navigate, 
        token,
        setToken, 
        currentUser,
        setCurrentUser,
        blogs, 
        setBlogs, 
        fetchBlogs,
        input, 
        setInput
    }

    return (
        
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
