import connectDB from "./db/db.js";
import dotenv from "dotenv";
import { app } from './app.js';
//require('dotenv').config()

dotenv.config({
    path : './.env'
})
connectDB()
.then(() => {
    app.listen(process.env.PORT || 7000,()=>{
        console.log(`The server is running at ${process.env.PORT}`);
    })
})
.catch((err)=>(console.error("MongoDb Connection Failed",err)))