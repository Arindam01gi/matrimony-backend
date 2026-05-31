require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(morgan('dev'))



app.listen(PORT, () =>{
    console.log(`server is running on PORT : ${PORT}`)
})
