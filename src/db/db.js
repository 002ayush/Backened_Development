import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const  connection_Instance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log("Mongodb Succefully Connected at the host",connection_Instance.connection.host);
        
        
    } catch (err) {
        console.error("MongoDb connection  error",err)
        //throw err
        process.exit(1)
    }
}

export default connectDB;