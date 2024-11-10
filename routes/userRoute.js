import express from 'express';
import {register, login, adminLogin} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/adminlogin', adminLogin);

export default userRouter;