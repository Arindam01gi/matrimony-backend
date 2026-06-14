import express , { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { success } from 'zod/v4';
import authRoutes from './modules/auth/auth.routes';
import profileRoutes from './modules/profile/profile.routes'
import { setupSwagger } from './config/swagger';


const app= express();

//Middleware
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())



//Base route

app.get('/health',(req,res)=>{
    res.send("app is running successfully")
})


app.use('/api/auth',authRoutes)
app.use("/api/v1/profile", profileRoutes);

setupSwagger(app)


//Global error handler placeholder
app.use((err:any ,req:express.Request,res:express.Response, next:express.NextFunction)=>{
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success : false,
        message: err.message || 'Internal Server Error',
    })
})


export default app;