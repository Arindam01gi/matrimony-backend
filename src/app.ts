import express , { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { success } from 'zod/v4';


const app:Application = express();

//Middleware
app.use(cors({
    'origin': process.env.FRONTEND_URL || 'http://localhost:3000',
    'credentials' : true
}))


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


//Base route

app.get('/health',(req,res)=>{
    res.send("app is running successfully")
})


//Global error handler placeholder
app.use((err:any ,req:express.Request,res:express.Response, next:express.NextFunction)=>{
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success : false,
        message: err.message || 'Internal Server Error',
    })
})


export default app;