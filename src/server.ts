import app from './app';
import dotenv from 'dotenv';

dotenv.config();


const PORT = process.env.PORT || 3000;


const startServer = () =>{
    try {
            app.listen(() =>{
            console.log(`app running on PORT : ${PORT} successfully`)
        })
    }catch(err){
        console.error('Error starting server:', err);
        process.exit(1);
    }

}

startServer();

