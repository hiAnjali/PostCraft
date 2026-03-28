import jwt from "jsonwebtoken";

const auth = (req, res, next) =>{
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

    try {
        if(!token){
            return res.json({success: false, message: "Authorization token missing"})
        }
        req.user = jwt.verify(token, process.env.JWT_SECRET)
        next();
    } catch (error) {
        res.json({success: false, message: "Invalid token"})
    }
}

export default auth;
