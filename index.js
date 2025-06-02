import express from 'express';
import { connectDB } from './utils/db.js';

import userroter from './routes/userroutes.js';
import cors from 'cors'


const app = express();
app.use(express.json())
app.use(cors())




app.use('/uploads', express.static('uploads'));

connectDB().then(()=>{
    app.listen(5000, () => {
        console.log('server runningggg ');
    });
    
})

app.use("/user",userroter)
app.use('/uploads', express.static('uploads'));

