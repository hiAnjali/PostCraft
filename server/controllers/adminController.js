import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import User from '../models/User.js';

const verifyPassword = (password, storedPassword) => {
    const [salt, originalHash] = storedPassword.split(':');

    if (!salt || !originalHash) {
        return false;
    }

    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(originalHash, 'hex'));
};

export const adminLogin = async(req, res)=>{
    try {
        const {email, password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign({email, role: 'admin'}, process.env.JWT_SECRET)
            return res.json({success: true, token})
        }

        const normalizedEmail = email?.trim().toLowerCase();
        const user = await User.findOne({ email: normalizedEmail, role: 'admin' });

        if(!user || !verifyPassword(password, user.password)){
            return res.json({success: false, message: "Invalid Credentials"})
        }

        const token = jwt.sign(
            { email: user.email, userId: user._id, role: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getAllBlogsAdmin = async(req, res)=>{
    try {
        const blogs = await Blog.find({}).sort({createdAt: -1});
        res.json({success: true, blogs})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getAllComments = async(req, res)=>{
    try {
        const comments = await Comment.find({}).populate("blog").sort({createdAt: -1})
        const normalizedComments = comments.map((comment) => ({
            ...comment.toObject(),
            isApproved: comment.isApproved === true || comment.isApproved === 'true'
        }))
        res.json({success: true, comments: normalizedComments})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getDashboard = async(req, res)=>{
    try {
        const recentBlogs = await Blog.find({}).sort({createdAt: -1}).limit(5);
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const drafts = await Blog.countDocuments({isPublished: false})

        const dashboardData = {
            blogs, comments, drafts, recentBlogs
        }
        res.json({success: true, dashboardData})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const deleteCommentById = async(req, res)=>{
    try {
        const {id} = req.body;
        await Comment.findByIdAndDelete(id);
        res.json({success: true, message: "Comment deleted successfully"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


export const approveCommentById = async(req, res)=>{
    try {
        const {id} = req.body;
        await Comment.findByIdAndUpdate(id, { isApproved: true});
        res.json({success: true, message: "Comment approved successfully"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}
