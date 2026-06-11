import app from './app';
import dotenv from 'dotenv';

dotenv.config();


const PORT = process.env.PORT || 3000;


const startServer = () =>{
    try {
        app.listen(Number(PORT),"0.0.0.0",() => {
            console.log(`[INFO] App is actively listening on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Error starting server:', err);
        process.exit(1);
    }

}

startServer();

