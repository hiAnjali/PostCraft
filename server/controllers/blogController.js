import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import imagekit from '../config/imagekit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import main from '../config/gemini.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '..', 'uploads');

const ensureUploadsDir = () => {
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }
};

const saveImageLocally = (req, imageFile) => {
    ensureUploadsDir();

    const extension = path.extname(imageFile.originalname) || '.jpg';
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}${extension}`;
    const filePath = path.join(uploadsDir, fileName);

    fs.writeFileSync(filePath, imageFile.buffer);

    return `${req.protocol}://${req.get('host')}/uploads/${fileName}`;
};

const uploadBlogImage = async (req, imageFile) => {
    if (!imagekit) {
        return saveImageLocally(req, imageFile);
    }

    const response = await imagekit.upload({
        file: imageFile.buffer,
        fileName: imageFile.originalname,
        folder: "/blogs"
    });

    return imagekit.url({
        path: response.filePath,
        transformation: [
            {quality: 'auto'},
            {format: 'webp'},
            {width: '1280'}
        ]
    });
};

const removeLocalImage = (imageUrl) => {
    if (!imageUrl?.includes('/uploads/')) return;

    const fileName = imageUrl.split('/uploads/')[1];
    const filePath = path.join(uploadsDir, fileName);

    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};

const createFallbackContent = (prompt) => {
    const topic = prompt?.trim() || 'Untitled Topic';

    return `<h1>${topic}</h1>
<p>${topic} matters because clear communication helps readers understand why it is relevant today.</p>
<h2>Why it matters</h2>
<p>Start by explaining the core idea in simple terms, then connect it to a practical challenge your audience already recognizes.</p>
<h2>Key takeaways</h2>
<ul>
  <li>Define the topic clearly.</li>
  <li>Show one or two real-world examples.</li>
  <li>End with a specific action readers can take next.</li>
</ul>
<h2>Conclusion</h2>
<p>Keep the final paragraph focused on one useful takeaway so readers leave with clarity and momentum.</p>`;
};

export const addBlog = async(req, res)=>{
    try {
        const {title, subTitle, description, category, isPublished} = JSON.parse(req.body.blog);
        const imageFile = req.file;

        //check if all field are present
        if(!title || !description || !category || !imageFile){
            return res.json({success: false, message: "Missing required fields"})
        }

        const image = await uploadBlogImage(req, imageFile);

        await Blog.create({
            title,
            subTitle,
            description,
            category,
            image,
            isPublished: Boolean(isPublished)
        })

        res.json({success: true, message: "blog added successfully"})
        
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getAllBlogs = async(req, res)=>{
    try {
        const blogs = await Blog.find({isPublished: true}).sort({createdAt: -1})
        res.json({success: true, blogs})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getBlogById = async(req, res) =>{
    try {
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId)
        if(!blog){
            return res.json({success: false, message: "blog not found"})
        }
        res.json({success: true, blog})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


export const deleteBlogById = async(req, res) =>{
    try {
        const {id} = req.body;
        const deletedBlog = await Blog.findByIdAndDelete(id)

        //delete all comments associated with the blog
        await Comment.deleteMany({blog: id});
        removeLocalImage(deletedBlog?.image);


        res.json({success: true, message: "blog deleted successfully"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


export const togglePublish = async(req, res) =>{
    try {
        const {id} = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({success: true, message: "blog status updated successfully"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const addComment = async(req, res) =>{
    try {
        const {blog, name, content} = req.body;
        if(!blog || !name?.trim() || !content?.trim()){
            return res.json({success: false, message: "All comment fields are required"})
        }
        await Comment.create({blog, name, content});
        res.json({success: true, message: "comment added for review"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getBlogComments = async(req, res) =>{
    try {
        const {blogId} = req.body;
        const comments = await Comment.find({
            blog: blogId,
            isApproved: { $in: [true, 'true'] }
        }).sort({createdAt: -1});
        res.json({success: true, comments})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


export const generateContent = async(req, res) =>{
    try {
        const {prompt} = req.body;
        if(!prompt?.trim()){
            return res.json({success: false, message: "Prompt is required"})
        }

        let content;

        try {
            content = await main(prompt + ' Generate a blog post with a title, short intro, and clear paragraph content for this topic in simple text format.')
        } catch (error) {
            content = createFallbackContent(prompt);
        }

        res.json({success: true, content})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}
