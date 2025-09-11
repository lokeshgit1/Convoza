import mongoose from 'mongoose'
import {ENV} from "./env.js"

export const connetDB = async () => {
    try {
        const conn = await mongoose.connect(ENV.MONGODB_URI)
        console.log(`Database connected: ${conn.connection.host}`)
    }catch(error)
    {
        console.log("mongodb not connected:" ,error);
        process.exit(1);
    }
}