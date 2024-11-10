import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//Route for user Register
export const register = async (req, res) => {
    console.log('req: ', req.body);
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                sucess: false
            });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "User already exists",
                sucess: false
            });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password: hashPassword
        });
        return res.status(201).json({
            message: "User created successfully",
            sucess: true
        });
    }
    catch (error) {
        console.log(error)
        res.json({success: false, message: 'Something went wrong!'})

    }
};



//Route for user login 
export const login = async (req, res) => {  
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                sucess: false
            });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials",
                sucess: false
            });
        }
        //create new user
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid credentials",
                sucess: false
            });
        }
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });
        console.log('token: ', token);
        return res.cookie('token', token, { 
            httpOnly: true, 
            sameSite: 'strict', 
            maxAge: 1 * 24 * 60 * 60 * 1000 
        }).json({     //for more security purpose
            message: `Welcome back ${user.name}`,
            success: true,
            user
        })

    }
    catch (error) {
        console.log(error)
        res.json({success: false, message: 'Something went wrong!'})
    }
};

//Route for Admin Login

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.SECRET_KEY);
            res.json({success: true, token});
        }
        else{
            res.json({success: false, message: "Invalid credentials"});
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: 'Something went wrong!'})
    }
}