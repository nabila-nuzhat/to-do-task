// connecting with mongodb
import mongoose from "mongoose";

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("to do app's MongoDB connected successfully !!");
    }
    catch(error){
        console.error("MongoDB failed to connect",error.message ); 
        process.exit(1);
            // note: see claude for alternate option to autometically show "message" after error. dot notation
    }
};

export default connectDB;
