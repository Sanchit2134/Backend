import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import connectCloudinary from './utils/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoutes.js';


//App config
const app = express();
dotenv.config();

const port = process.env.PORT || 4001;
connectDB();
connectCloudinary();
 
//Middleware
app.use(express.json());
app.use(cors());  

//api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)

app.get("/", (req, res) => {
    res.send('API working')
});

//server listen
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})