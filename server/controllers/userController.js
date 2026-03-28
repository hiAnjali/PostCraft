import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const hashPassword = (password) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');

    return `${salt}:${hash}`;
};

export const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name?.trim() || !email?.trim() || !password?.trim()) {
            return res.json({ success: false, message: "All fields are required" });
        }

        if (password.trim().length < 6) {
            return res.json({ success: false, message: "Password must be at least 6 characters long" });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const existingUser = await User.findOne({ email: normalizedEmail });

        if (existingUser) {
            return res.json({ success: false, message: "An account already exists with this email" });
        }

        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashPassword(password.trim()),
            role: 'admin'
        });

        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            message: "Account created successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.json({ success: false, message: "An account already exists with this email" });
        }

        res.json({ success: false, message: error.message });
    }
};
