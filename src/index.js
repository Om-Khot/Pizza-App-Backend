import express from 'express';
import { PORT } from './Config/serverConfig.js';
import connectDB  from './Config/dbConfig.js';
import UserRouter from './Routes/Users/USerRouter.js';
import AuthRouter from './Routes/Auth/AuthRouter.js';
import cookieParser from 'cookie-parser';

// create express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// any api with /users will be handled by UserRouter
app.use('/users',UserRouter);

// login route
app.use('/auth',AuthRouter);


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});

